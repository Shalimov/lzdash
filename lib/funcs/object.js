import { eof, isNotEof, isObject, wrapSimpleSource } from '../helpers'
import { inferArray } from '../inference'

const LOCAL_EOF = () => { }

const entriesGenerator = function (obj, localEof = true) {
  if (!isObject(obj)) {
    return () => obj
  }

  const EOF = localEof ? LOCAL_EOF : eof

  const keys = Object.keys(obj)
  let keyIndex = 0

  return () => {
    if (keys.length > keyIndex) {
      const key = keys[keyIndex++]
      return [key, obj[key]]
    }

    return EOF
  }
}

const createSequence = transform => {
  const handler = (arg) => {
    let seq = isObject(arg) ?
      entriesGenerator(arg, false) :
      entriesGenerator(arg())

    const iterator = () => {
      let item = null

      do {
        item = seq()

        if (item === LOCAL_EOF) {
          seq = entriesGenerator(arg())
        }
      } while (item === LOCAL_EOF)

      return isNotEof(item) ? transform(...item) : item
    }

    return inferArray(wrapSimpleSource(iterator, false))
  }

  handler.__kve__ = true

  return Object.freeze(handler)
}

export const keys = createSequence(key => key)
export const values = createSequence((_key, value) => value)
export const entries = createSequence((key, value) => [key, value])

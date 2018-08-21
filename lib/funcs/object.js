import { isNotEof, isObject } from '../helpers'
import { inferArray } from '../inference'

const LOCAL_EOF = () => { }

const entriesGenerator = function (obj) {
  if (!isObject(obj)) {
    return () => obj
  }

  const keys = Object.keys(obj)
  let keyIndex = 0

  return () => {
    if (keys.length > keyIndex) {
      const key = keys[keyIndex++]
      return [key, obj[key]]
    }

    return LOCAL_EOF
  }
}

const createSequence = transform => (arg) => {
  let seq = entriesGenerator(arg())

  return inferArray(() => {
    let item = null

    do {
      item = seq()

      if (item === LOCAL_EOF) {
        seq = entriesGenerator(arg())
      }
    } while (item === LOCAL_EOF)

    return isNotEof(item) ? transform(...item) : item
  })
}

export const keys = createSequence(key => key)
export const values = createSequence((_key, value) => value)
export const entries = createSequence((key, value) => [key, value])
export { isObject }

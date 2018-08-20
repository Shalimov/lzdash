import { eof, isNotEof, isObject } from '../helpers'
import { inferArray } from '../inference'

const entriesGenerator = function (obj) {
  if (!isObject(obj)) {
    return () => eof
  }

  const keys = Object.keys(obj)
  let keyIndex = 0

  return () => {
    if (keys.length > keyIndex) {
      const key = keys[keyIndex++]
      return [key, obj[key]]
    }

    return eof
  }
}

const createSequence = transform => (arg) => {
  const seq = entriesGenerator(arg())

  return inferArray(() => {
    const item = seq()
    return isNotEof(item) ? transform(...item) : item
  })
}

export const keys = createSequence(key => key)
export const values = createSequence((_key, value) => value)
export const entries = createSequence((key, value) => [key, value])
export { isObject }

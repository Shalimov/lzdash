import { eof, isNotEof } from '../helpers'
import { inferArray } from '../inference'

const isObject = value => Object.prototype.toString.call(value) === '[object Object]'

const entriesGenerator = function* (obj) {
  if (!isObject(obj)) {
    return eof
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      yield [key, obj[key]]
    }
  }

  return eof
}

const createSequence = transform => arg => {
  const seq = entriesGenerator(arg())

  return inferArray(() => {
    const { value } = seq.next()
    return isNotEof(value) ? transform(value) : value
  })
}

export const keys = createSequence(([v]) => v)
export const values = createSequence(([, v]) => v)
export const entries = createSequence(v => v)
export { isObject }

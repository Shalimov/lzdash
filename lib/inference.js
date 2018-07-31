import { isNotEof, isEof } from './utils'

const INFERENCE = {
  ARRAY: (lz) => {
    const result = []

    let value
    let state
  
    do {
      [value, state] = lz()
      
      if (isEof(state)) {
        break
      }
  
      result.push(value)
    } while (isNotEof(state))
  
    return result
  },
  OBJECT: (lz) => {
    const shape = {}

    let value = null
    let state

    do {
      [value, state] = lz()

      if (isEof(state)) break

      Object.assign(shape, value)
    } while (isNotEof(state))

    return shape
  },
  ANY: () => {
    throw new Error('Any inference is not supported')
  },
}

const infer = type => fn => {
  fn.__infer__ = type
  return Object.freeze(fn)
}

const inferArray = infer(INFERENCE.ARRAY)
const inferObject = infer(INFERENCE.OBJECT)
const inferAny = infer(INFERENCE.ANY)

export {
  inferArray,
  inferObject,
  inferAny
}
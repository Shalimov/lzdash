import { isEof } from '../helpers'
import { inferAny } from '../inference'

// TODO: think how to improve it
export const reduce = (reducer, firstValue) => arg => {
  let firstValUndefined = firstValue === undefined
  let flushNeeded = !firstValUndefined
  let result = firstValue

  return inferAny(() => {
    result = firstValUndefined ? arg() : result
    
    const value = arg()
    const eof = isEof(value)

    if (eof) {
      const flushValue = flushNeeded ? result : value
      flushNeeded = false
      return flushValue
    }
    
    flushNeeded = firstValUndefined = false
    result = reducer(result, value)

    return result
  })
}

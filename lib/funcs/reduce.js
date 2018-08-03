import { isEof } from '../helpers'
import { inferAny } from '../inference'

export const reduce = (reducer, firstValue) => arg => {
  let firstValUndefined = firstValue === undefined
  let result = firstValue

  return inferAny(() => {
    result = firstValUndefined ? arg() : result
    firstValUndefined = false

    const value = arg()

    if (isEof(value)) return value
    
    result = reducer(result, value)

    return result
  })
}

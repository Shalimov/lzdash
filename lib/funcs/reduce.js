import { isEof } from '../helpers'
import { inferAny } from '../inference'

export const reduce = (reducer, firstValue) => arg => {
  let result = firstValue

  return inferAny(() => {
    const value = arg()

    if (isEof(value)) return value

    result = reducer(result, value)

    return result
  })
}
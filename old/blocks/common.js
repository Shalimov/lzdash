import { isNotEof } from './helpers'
import { inferArray } from './inference'

export const map = transform => arg => inferArray(() => {
  const value = arg()
  return isNotEof(value) ? transform(value) : value
})

export const filter = predicate => arg => inferArray(() => {
  let value = null

  do {
    value = arg()

    if (predicate(value) === true && isNotEof(value)) {
      return value
    }
  } while (isNotEof(value))

  return value
})
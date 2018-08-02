import { isNotEof } from '../helpers'
import { inferArray } from '../inference'

export const filter = predicate => arg => inferArray(() => {
  let value = null

  do {
    value = arg()

    if (isNotEof(value) && predicate(value) === true) {
      return value
    }
  } while (isNotEof(value))

  return value
})

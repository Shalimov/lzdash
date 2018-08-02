import { isNotEof } from '../helpers'
import { inferArray } from '../inference'

const createFilter = condition => predicate => arg => inferArray(() => {
  let value = null

  do {
    value = arg()

    if (isNotEof(value) && predicate(value) === condition) {
      return value
    }
  } while (isNotEof(value))

  return value
})

export const filter = createFilter(true)
export const reject = createFilter(false)

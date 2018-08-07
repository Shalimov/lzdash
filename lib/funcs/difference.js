import { inferArray } from '../inference'
import { isEof } from '../helpers'

const id = v => v

export const difference = collection => {
  const set = new Set(collection)
  return arg => inferArray(() => {
    let value

    do {
      value = arg()
    } while (set.has(value))

    return value
  })
}

export const differenceBy = (collection, iteratee = id) => {
  const initSetValues = collection && collection.map(iteratee)
  const set = new Set(initSetValues)

  return arg => inferArray(() => {
    let value

    do {
      value = arg()
      if (isEof(value)) break
    } while (set.has(iteratee(value)))

    return value
  })
}

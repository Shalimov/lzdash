import { inferArray } from '../inference'
import { isEof } from '../helpers'

const id = v => v

export const intersection = (collection) => {
  const set = new Set(collection)

  return arg => inferArray(() => {
    let value

    do {
      value = arg()
    } while (!(isEof(value) || set.has(value)))

    return value
  })
}

export const intersectionBy = (collection, iteratee = id) => {
  const initSetValues = collection && collection.map(iteratee)
  const set = new Set(initSetValues)

  return arg => inferArray(() => {
    let value

    do {
      value = arg()
    } while (!(isEof(value) || set.has(iteratee(value))))

    return value
  })
}

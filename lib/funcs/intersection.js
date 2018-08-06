import { inferArray } from '../inference'
import { isEof } from '../helpers'

const id = v => v

export const intersection = collection => arg => {
  const set = new Set(collection)

  return inferArray(() => {
    let value

    do {
      value = arg()
    } while (!(isEof(value) || set.has(value)))

    return value
  })
}

export const intersectionBy = (collection, iteratee = id) => arg => {
  const initSetValues = collection && collection.map(iteratee)
  const set = new Set(initSetValues)

  return inferArray(() => {
    let value

    do {
      value = arg()
    } while (!(isEof(value) || set.has(iteratee(value))))

    return value
  })
}

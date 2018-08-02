import { isNotEof, eof } from '../helpers'
import { inferObject } from '../inference'

const from = (collection) => {
  let index = 0

  const values = Array.isArray(collection) ?
    collection :
    Object.entries(collection)

  return () => {
    if (index < values.length) {
      return values[index++]
    }

    return eof
  }
}

const fromPairs = arg => inferObject(() => {
  const pair = arg()
  return isNotEof(pair) ? { [pair[0]]: pair[1] } : pair
})

export {
  from,
  fromPairs,
}
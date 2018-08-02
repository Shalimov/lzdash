import { isNotEof } from '../helpers'
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

const fromPairs = inferObject(arg => inferObject(() => {
  const pair = arg()
  return isNotEof(pair) ? { [arg[0]]: arg[1] } : pair
}))

export {
  from,
  fromPairs,
}
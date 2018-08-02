import { inferArray } from '../inference'
import { next, arg, eof } from '../utils'

const filter = pr => inferArray(value => (pr(value) === true ? next(value) : arg()))
const map = tr => inferArray(value => next(tr(value)))

const from = (collection) => {
  let index = 0

  const values = Array.isArray(collection) ?
    collection :
    Object.entries(collection)

  return () => {
    if (index < values.length) {
      return next(values[index++])
    }

    return eof()
  }
}

export {
  from,
  filter,
  map,
}
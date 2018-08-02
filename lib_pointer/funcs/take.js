import { inferArray } from '../inference'
import { next, eof } from '../utils'

const take = n => inferArray((value, state) => {
  const index = state.has(take.name) ? state.get(take.name) : 0

  if (index < n) {
    state.set(take.name, index + 1)
    return next(value)
  }

  return eof()
})

const takeWhile = predicate => inferArray(value => predicate(value) === true ? next(value) : eof())

export {
  take,
  takeWhile
}
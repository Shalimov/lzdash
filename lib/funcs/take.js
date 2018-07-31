import { inferArray } from '../inference'
import { next, eof } from '../utils'

const take = n => {
  let internalCounter = 0
  return inferArray((value) => {
    if (internalCounter < n) {
      internalCounter++
      return next(value)
    }

    internalCounter = 0
    return eof()
  })
}

const takeWhile = predicate => inferArray(value => predicate(value) === true ? next(value) : eof())

export {
  take,
  takeWhile
}
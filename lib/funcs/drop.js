import { inferArray } from '../inference'
import { next, arg } from '../utils'

const drop = n => inferArray((value, state) => {
  const index = state.has(drop.name) ? state.get(drop.name) : 0
  console.log(drop.name, index)

  if (index < n) {
    state.set(drop.name, index + 1)
    return arg()
  }

  return next(value)
})

const dropWhile = predicate => inferArray((value, state) => {
  const aborted = state.get(dropWhile.name)
  const dropIt = predicate(value) === true

  if (dropIt && !aborted) {
    return arg() 
  } else if (!(dropIt || aborted)) {
    state.set(dropWhile.name, true)  
  }

  return next(value)
})

export {
  drop,
  dropWhile
}
import { eof } from './helpers'
import { inferArray } from './inference'

export const take = count => arg => {
  let itemsTaken = 0

  return inferArray(() => {
    const value = arg()
    itemsTaken += 1
    return itemsTaken <= count ? value : eof
  })
}

export const takeWhile = predicate => arg => inferArray(() => {
  const value = arg()
  return predicate(value) === true ? value : eof
})
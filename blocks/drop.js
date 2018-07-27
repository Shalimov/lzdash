import { isNotEof } from '../helpers';
import { inferArray } from '../inference'

export const drop = count => arg => inferArray(() => {
  for (let i = 0; i < count; i += 1) { arg() }
  const value = arg()
  return value
})

export const dropWhile = predicate => arg => inferArray(() => {
  let value = null
  
  do { 
    value = arg()
    const continueDropping = predicate(value)
    if (continueDropping && isNotEof(value)) {
      continue
    } else if (continueDropping) {
      break
    }
   } while(isNotEof(value))

  return value
})
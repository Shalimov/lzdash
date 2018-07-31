import { isEof } from './helpers'
import { inferObject } from './inference'

export const fromPairs = arg => inferObject(() => {
  const value = arg()
  return isEof(value) ? value : { [value[0]]: value[1] }
})
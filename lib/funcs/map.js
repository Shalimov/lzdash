import { isNotEof } from '../helpers'
import { inferArray } from '../inference'

export const map = transform => arg => inferArray(() => {
  const value = arg()
  return isNotEof(value) ? transform(value) : value
})
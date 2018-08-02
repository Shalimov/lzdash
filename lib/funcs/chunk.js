import { isNotEof, isEof } from '../helpers';
import { inferArray } from '../inference'

export const chunk = n => arg => inferArray(() => {
  const result = []
  let value = null

  do {
    value = arg()
    if (isEof(value)) break
    result.push(value)
  } while (isNotEof(value) && n > result.length)

  return (result.length > 0) ? result : value
})

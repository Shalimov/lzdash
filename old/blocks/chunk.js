import { isEof } from '../helpers';
import { inferArray } from '../inference'

export const chunk = size => arg => inferArray(() => {
  const result = []
  for (let i = 0; i < size; i += 1) { 
    const value = arg()
    
    if (isEof(value)) {
      break
    }

    result.push(value)
  }

  return result
})

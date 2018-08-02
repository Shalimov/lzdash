import { isNotEof } from '../helpers';
import { inferArray } from '../inference'

export const uniq = arg => {
  const set = new Set()

  return inferArray(() => {
    let value = null
    
    do { 
      value = arg()

      if (isEof(value)) {
        return value
      } else if (set.has(value)) {
        continue
      }
    } while(isNotEof)
    
    set.add(value)

    return value
  })
}

export const uniqBy = propFn => arg => {
  const set = new Set()

  return inferArray(() => {
    let value = null
    let propValue = null

    do { 
      value = arg()
      propValue = propFn(value)
      
      if (isEof(value)) {
        return value
      } else if (set.has(propValue)) {
        continue
      }
    } while(isNotEof)
    
    set.add(propValue)

    return value
  })
}
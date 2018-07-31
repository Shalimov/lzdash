import { isNotEof } from '../helpers';
import { inferArray } from '../inference'

export const uniq = arg => {
  const set = new Set()

  return inferArray(() => {
    let value = null
    
    do { value = arg() } while(isNotEof(value) && set.has(value))
    
    set.add(value)

    return value
  })
}

export const uniqBy = propFn => arg => {
  const set = new Set()

  return inferArray(() => {
    let value = null
    let propValue
    
    do {
      value = arg()
      propValue = propFn(value)
    } while(isNotEof(value) && set.has(propValue))

    set.add(propValue)

    return value
  })
}
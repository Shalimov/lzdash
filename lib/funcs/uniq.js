import { isEof } from '../helpers'
import { inferArray } from '../inference'

export const uniq = (arg) => {
  const set = new Set()

  return inferArray(() => {
    let value = null

    do {
      value = arg()

      if (isEof(value)) {
        return value
      }
    } while (set.has(value))

    set.add(value)

    return value
  })
}

export const uniqBy = propFn => (arg) => {
  const set = new Set()

  return inferArray(() => {
    let value = null
    let propValue = null

    do {
      value = arg()

      if (isEof(value)) {
        return value
      }

      propValue = propFn(value)
    } while (set.has(propValue))

    
    set.add(propValue)

    return value
  })
}

import { isEof } from '../helpers'
import { inferArray } from '../inference'

const DEFAULT_VALUE = {}

export const consecutive = (arg) => {
  let prevValue = DEFAULT_VALUE

  return inferArray(() => {
    const x = prevValue === DEFAULT_VALUE ? arg() : prevValue
    const y = arg()

    if (isEof(y)) return y
    
    prevValue = y

    return [x, y]
  })
}

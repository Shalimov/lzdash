import { isEof } from '../helpers';
import { inferArray } from '../inference'

const withFnDef = (v1, v2) => [v1, v2]

export const zip = anotSource => arg => inferArray(() => {
  const value = arg()
  let anthSourceValue = anotSource()
  anthSourceValue = isEof(anthSourceValue) ? undefined : anthSourceValue

  return isEof(value) ? value : [value, anthSourceValue]
})

export const zipWith = (anotSource, withFn = withFnDef) => arg => inferArray(() => {
  const value = arg()
  let anthSourceValue = anotSource()
  anthSourceValue = isEof(anthSourceValue) ? undefined : anthSourceValue

  return isEof(value) ? value : withFn(value, anthSourceValue)
})

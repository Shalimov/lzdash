import { isEof } from '../helpers'
import { inferArray } from '../inference'
import { sourceFactory } from '../source.factory'

const withFnDef = (v1, v2) => [v1, v2]

// use source factory
export const zip = (data) => (arg) => {
  const anthSource = sourceFactory(data, [])

  return inferArray(() => {
    const value = arg()
    let anthSourceValue = anthSource()
    anthSourceValue = isEof(anthSourceValue) ? undefined : anthSourceValue

    return isEof(value) ? value : [value, anthSourceValue]
  })
}

export const zipWith = (data, withFn = withFnDef) => (arg) => {
  const anthSource = sourceFactory(data, [])

  return inferArray(() => {
    const value = arg()
    let anthSourceValue = anthSource()
    anthSourceValue = isEof(anthSourceValue) ? undefined : anthSourceValue

    return isEof(value) ? value : withFn(value, anthSourceValue)
  })
}

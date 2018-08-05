import { isEof } from '../helpers'
import { inferArray } from '../inference'
import { sourceFactory } from '../sources/source.factory'

const withFnDef = (v1, v2) => [v1, v2]

// use source factory
export const zip = data => {
  const anthSource = sourceFactory(data, [])

  return arg => inferArray(() => {
    const value = arg()
    let anthSourceValue = anthSource()
    anthSourceValue = isEof(anthSourceValue) ? undefined : anthSourceValue

    return isEof(value) ? value : [value, anthSourceValue]
  })
}

export const zipWith = (data, withFn = withFnDef) => {
  const anthSource = sourceFactory(data, [])

  return arg => inferArray(() => {
    const value = arg()
    let anthSourceValue = anthSource()
    anthSourceValue = isEof(anthSourceValue) ? undefined : anthSourceValue

    return isEof(value) ? value : withFn(value, anthSourceValue)
  })
}

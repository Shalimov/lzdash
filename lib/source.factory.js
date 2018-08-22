import { eof, isObject, getSource, SOURCE_TYPES } from './helpers'
import { from } from './funcs/from'

const fallbackSource = () => eof

export const sourceFactory = (data, funcs) => {
  const { COLLECTION, INV_SOURCE, SIMP_SOURCE } = SOURCE_TYPES

  switch (getSource(data)) {
    case COLLECTION: return from(data)
    case INV_SOURCE: return data()
    case SIMP_SOURCE: return data
    default: break
  }

  const butler = funcs[0]

  if (isObject(data) && butler.__kve__) {
    return from([data])
  }

  return fallbackSource
}

import { eof, isSourceProvider, isObject } from './helpers'
import { from } from './funcs/from'
import { keys, values, entries } from './funcs/object'

const objectTransformers = [keys, values, entries]
const fallbackSource = () => eof

export const sourceFactory = (data, funcs) => {
  if (isSourceProvider(data)) {
    return data()
  }

  if (Array.isArray(data)) {
    return from(data)
  }

  const butler = funcs[0]
  const isObjectTransformer = objectTransformers.includes(butler)

  if (isObject(data) && isObjectTransformer) {
    return from([data])
  }

  return fallbackSource
}

import { eof, isSourceProvider } from './helpers'
import { from } from './funcs/from'
import { keys, values, entries, isObject } from './funcs/object'

const fallbackSource = () => eof

export const sourceFactory = (data, funcs) => {
  if (isSourceProvider(data)) {
    return data
  }

  if (Array.isArray(data)) {
    return from(data)
  }

  const butler = funcs[0]
  const isObjectTransformer = [keys, values, entries].includes(butler)

  if (isObject(data) && isObjectTransformer) {
    return from([data])
  }

  return fallbackSource
}

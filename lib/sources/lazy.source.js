import { wrapInvocableSource } from '../helpers'
import { sourceFactory } from '../source.factory'

export const lazySource = (...funcs) => {
  // TODO: cover it with test
  if (funcs.length === 0) {
    return wrapInvocableSource(v => v)
  }

  return collection => wrapInvocableSource(() => {
    const source = sourceFactory(collection, funcs)
    const sequence = [source, ...funcs].reduce((arg, fn) => fn(arg))
    return sequence
  })
}

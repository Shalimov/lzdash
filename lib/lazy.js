import { sourceFactory } from './sources/source.factory'
import { applyInference } from './inference'

// TODO: move to sources
export const lazySource = (...funcs) => {
  if (funcs.length === 0) {
    return v => v
  }

  return (collection) => {
    const source = sourceFactory(collection, funcs)
    const seq = [source, ...funcs].reduce((arg, fn) => fn(arg))

    const wrapSeq = () => seq()
    wrapSeq.__source__ = true
    return Object.freeze(wrapSeq)
  }
}

export const lazy = (...funcs) => {
  if (funcs.length === 0) {
    return v => v
  }

  return (collection) => {
    const source = sourceFactory(collection, funcs)
    const func = [source, ...funcs].reduce((arg, fn) => fn(arg))
    return applyInference(func)
  }
}

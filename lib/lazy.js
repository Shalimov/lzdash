import { sourceFactory } from './source.factory'
import { applyInference } from './inference'

const lazy = (...funcs) => {
  if (funcs.length === 0) {
    return v => v
  }

  return (collection) => {
    const source = sourceFactory(collection, funcs)
    const func = [source, ...funcs].reduce((arg, fn) => fn(arg))
    return applyInference(func)
  }
}

export {
  lazy,
}

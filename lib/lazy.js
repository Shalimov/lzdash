import { from } from './funcs/from'
import { applyInference } from './inference'

const lazy = (...funcs) => {
  if (funcs.length === 0) {
    return v => v
  }

  return (collection) => {
    const source = from(collection)
    const func = [source, ...funcs].reduce((arg, fn) => fn(arg))
    return applyInference(func)
  }
}

export {
  lazy,
}

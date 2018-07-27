import { eof } from './helpers'

const fromCollection = (collection) => {
  let index = 0

  const values = Array.isArray(collection) ?
    collection :
    Object.entries(collection)

  return () => {
    if (index < values.length) {
      return values[index++]
    }

    return eof
  }
}

const lazy = (...funcs) => {
  if (funcs.length === 0) {
    return v => v
  }

  return (collection) => {
    const argFn = fromCollection(collection)
    const func = [argFn, ...funcs].reduce((arg, fn) => fn(arg))
    return func.__infer__(func)
  }
}


export {
  lazy,
  map,
  filter,
  take,
  takeWhile,
  drop,
  dropWhile,
  uniq,
  uniqBy,
  chunk,
  fromPairs,
}
import { eof } from '../helpers'

const genGenerator = function* (fn, count) {
  let index = 0

  while (index < count) {
    yield fn(index)
    index += 1
  }

  return eof
}

export const gen = (fn, count = Infinity) => {
  const gen = genGenerator(fn, count)

  const genFn = () => {
    const { value, done } = gen.next()
    return done ? eof : value
  }

  genFn.__source__ = true

  return Object.freeze(genFn)
}

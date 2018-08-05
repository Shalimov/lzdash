import { eof } from '../helpers'

const repeatGenerator = function* (what, count) {
  let index = 0

  while (index < count) {
    yield what
    index += 1
  }

  return eof
}

export const repeat = (what, count = Infinity) => {
  const gen = repeatGenerator(what, count)

  const repeatFn = () => {
    const { value, done } = gen.next()
    return done ? eof : value
  }

  repeatFn.__source__ = true

  return Object.freeze(repeatFn)
}

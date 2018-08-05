import { eof, toSource } from '../helpers'

const genGenerator = function* (fn, count = Infinity) {
  let index = 0

  while (index < count) {
    yield fn(index)
    index += 1
  }

  return eof
}

export const generator = toSource(genGenerator)

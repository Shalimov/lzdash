import { eof, toSource } from '../helpers'

const repeatGenerator = function* (what, count = Infinity) {
  let index = 0

  while (index < count) {
    yield what
    index += 1
  }

  return eof
}

export const repeat = toSource(repeatGenerator)

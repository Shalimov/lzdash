import { eof, toSource } from '../helpers'

const repeatGenerator = (what, count = Infinity) => {
  let index = 0

  return () => {
    if (index < count) {
      index += 1
      return what
    }

    return eof
  }
}

export const repeat = toSource(repeatGenerator)

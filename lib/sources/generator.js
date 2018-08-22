import { eof, toSource } from '../helpers'

const genGenerator = (fn, count = Infinity) => {
  let index = 0

  return () => {
    if (index < count) {
      return fn(index++)
    }

    return eof
  }
}

export const generator = toSource(genGenerator)

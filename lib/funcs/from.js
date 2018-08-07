import { eof } from '../helpers'
import { inferObject } from '../inference'

export const from = (data) => {
  let index = 0

  return () => {
    if (index < data.length) {
      return data[index++]
    }

    return eof
  }
}

export const fromPairs = arg => inferObject(() => arg())

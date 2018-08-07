import { isNotEof, isEof } from '../helpers'
import { inferArray } from '../inference'

export const drop = count => (arg) => {
  let dropIndex = 0

  return inferArray(() => {
    while (dropIndex < count) {
      arg()
      dropIndex += 1
    }
    const value = arg()
    return value
  })
}

export const dropWhile = predicate => (arg) => {
  let dropFinished = false

  return inferArray(() => {
    if (dropFinished) {
      return arg()
    }

    let value = null

    do {
      value = arg()

      const stopDropping = isEof(value) || predicate(value) === false

      if (stopDropping) {
        dropFinished = stopDropping
        break
      }
    } while (isNotEof(value))

    return value
  })
}

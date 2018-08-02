import { isNotEof, isEof } from '../helpers';
import { inferArray } from '../inference'

export const drop = count => arg => {
  let dropIndex = 0

  return inferArray(() => {
    for (dropIndex; dropIndex < count; dropIndex += 1) { arg() }
    const value = arg()
    return value
  })
}

export const dropWhile = predicate => arg => {
  let dropFinish = false

  return inferArray(() => {
    let value = null

    if (dropFinish) {
      do {
        value = arg()
        const stopDropping = isEof(value) || predicate(value) === true
        if (stopDropping) {
          dropFinish = stopDropping
          return value
        }
      } while (isNotEof(value))
    }

    return arg()
  })
}

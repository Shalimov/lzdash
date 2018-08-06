import { isEof } from '../helpers'
import { inferObject } from '../inference'

const id = v => v

export const groupBy = (iteratee = id) => arg => {
  const group = {}

  return inferObject(() => {
    const value = arg()

    if (isEof(value)) return value

    const key = iteratee(value)

    if (group.hasOwnProperty(key)) {
      group[key].push(value)
    } else {
      group[key] = [value]
    }

    return group
  })
}

export const countBy = (iteratee = id) => arg => {
  const group = {}

  return inferObject(() => {
    const value = arg()

    if (isEof(value)) return value

    const key = iteratee(value)

    if (group.hasOwnProperty(key)) {
      group[key] += 1
    } else {
      group[key] = 1
    }

    return group
  })
}

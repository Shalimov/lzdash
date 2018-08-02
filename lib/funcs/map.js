import { from } from './from'
import { isNotEof, isEof } from '../helpers'
import { inferArray } from '../inference'

export const map = transform => arg => inferArray(() => {
  const value = arg()
  return isNotEof(value) ? transform(value) : value
})

export const flatMap = transform => arg => {
  const stack = [arg]
  const isOverDeepMaximum = stack => stack.length > 1
  const peek = stack => stack[stack.length - 1]

  return inferArray(() => {
    let value = null

    do {
      const source = peek(stack)
      value = source()

      if (isEof(value)) {
        stack.pop()
        continue
      }

      if (isOverDeepMaximum(stack)) {
        return value
      }

      const transformedValue = transform(value)

      if (Array.isArray(transformedValue)) {
        const newSource = from(transformedValue)
        stack.push(newSource)
        continue
      }

      return transformedValue
    } while (stack.length > 0)

    return value
  })
}

export const flatMapDeep = transform => arg => {
  const stack = [arg]
  const isOverDeepMaximum = stack => stack.length > 1
  const peek = stack => stack[stack.length - 1]

  return inferArray(() => {
    let value = null

    do {
      const source = peek(stack)
      value = source()

      if (isEof(value)) {
        stack.pop()
        continue
      }

      value = isOverDeepMaximum(stack) ? value : transform(value)

      if (Array.isArray(value)) {
        const newSource = from(value)
        stack.push(newSource)
        continue
      }

      return value
    } while (stack.length > 0)

    return value
  })
}

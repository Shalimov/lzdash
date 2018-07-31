
import { EOF, isArg, isEof, isNext, fmap } from './utils'
import { from, map, filter } from './funcs/base'
import { take, takeWhile } from './funcs/take'

const createFlow = funcs => () => {
  const flowLenght = funcs.length

  let operationPointer = 0
  let valueBuffer

  do {
    const operation = funcs[operationPointer]
    const item = operation(valueBuffer)

    if (isNext(item)) {
      valueBuffer = fmap(item)
      operationPointer += 1
    } else if (isArg(item)) {
      operationPointer -= 1
    } else if (isEof(item)) {
      return [valueBuffer, EOF]
    }
  } while (operationPointer < flowLenght)

  return [valueBuffer]
}

const lazy = (...funcs) => (data) => {
  const flow = createFlow([from(data), ...funcs])
  const last = funcs[funcs.length - 1]
  const { __infer__ } = last
  return __infer__(flow)
}

export {
  lazy,
  map,
  filter,
  take,
  takeWhile,
}

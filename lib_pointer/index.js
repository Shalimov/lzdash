
import { EOF, isArg, isEof, isNext, fmap } from './utils'
import { from, map, filter } from './funcs/base'
import { take, takeWhile } from './funcs/take'
import { drop, dropWhile } from './funcs/drop'
import { chunk } from './funcs/chunk'

const createFlow = funcs => {
  const evaluationState = new Map()

  return () => {
    const flowLenght = funcs.length
  
    let operationPointer = 0
    let valueBuffer
  
    do {
      const operation = funcs[operationPointer]
      const item = operation(valueBuffer, evaluationState)
  
      if (isNext(item)) {
        valueBuffer = fmap(item)
        operationPointer += 1
      } else if (isArg(item)) {
        operationPointer = 0
      } else if (isEof(item)) {
        evaluationState.clear()
        return [valueBuffer, EOF]
      }
    } while (operationPointer < flowLenght)
  
    return [valueBuffer]
  }
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
  drop,
  dropWhile,
  chunk,
}

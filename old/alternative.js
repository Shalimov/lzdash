const filter = pr => value => (pr(value) === true ? { state: 'next', value } : { state: 'arg' })
const map = tr => value => ({ state: 'next', value: tr(value) })

const fromCollection = (collection) => {
  let index = 0

  const values = Array.isArray(collection) ?
    collection :
    Object.entries(collection)

  return () => {
    if (index < values.length) {
      return { state: 'next', value: values[index++] }
    }

    return { state: 'end' }
  }
}

const lazy = (...funcs) => {
  const crfl = funcs => () => {
    let valueBuffer
    let operationPointer = 0

    do {
      const operation = funcs[operationPointer]
      const item = operation(valueBuffer)

      if (item.state === 'next') {
        valueBuffer = item.value
        operationPointer += 1
      } else if(item.state === 'arg') {
        operationPointer -= 1
      } else if (item.state === 'end') {
        return [valueBuffer, 'end']
      }
    } while(operationPointer < funcs.length)

    return [valueBuffer]
  }

  return (data) => {
    const fl = crfl([fromCollection(data), ...funcs])
    const result = []
    let value
    let state

    do {
      [value, state] = fl()
      if (state === 'end') break
      result.push(value)
    } while (state !== 'end')

    return result
  }
}

const lz = lazy(
  filter(v => v % 2 === 0),
  map(v => v * 2),
  map(v => v * 2),
  map(v => v * 2)
)

console.log(lz([1, 2, 3, 4]))
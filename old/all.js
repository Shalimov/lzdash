const INFERENCE = {
  ARRAY: (lz) => {
    const result = []
    let value = null

    do {
      value = lz()
      if (isEof(value)) break
      result.push(value)
    } while (isNotEof(value))

    return result
  },
  OBJECT: (lz) => {
    const shape = {}
    let value = null

    do {
      value = lz()
      if (isEof(value)) break
      Object.assign(shape, value)
    } while (isNotEof(value))

    return shape
  },
  ANY: lz => lz(),
}

const eof = Object.freeze(() => { })
const isEof = value => value === eof
const isNotEof = value => value !== eof

const infer = type => fn => {
  fn.__infer__ = type
  return fn
}

const inferArray = infer(INFERENCE.ARRAY)
const inferObject = infer(INFERENCE.OBJECT)

/* region Functions set */

const uniq = arg => {
  const set = new Set()

  return inferArray(() => {
    let value = null

    do { value = arg() } while (isNotEof(value) && set.has(value))

    set.add(value)

    return value
  })
}

const uniqBy = propFn => arg => {
  const set = new Set()

  return inferArray(() => {
    let value = null
    let propValue

    do {
      value = arg()
      propValue = propFn(value)
    } while (isNotEof(value) && set.has(propValue))

    set.add(propValue)

    return value
  })
}

const take = count => arg => {
  let itemsTaken = 0

  return inferArray(() => {
    const value = arg()
    itemsTaken += 1
    return itemsTaken <= count ? value : eof
  })
}

const takeWhile = predicate => arg => inferArray(() => {
  const value = arg()
  return predicate(value) === true ? value : eof
})

const drop = count => arg => {
  let dropIt = false

  return inferArray(() => {
    if (!dropIt) {
      for (let i = 0; i < count; i += 1) { arg() }
      dropIt = true
    }

    const value = arg()
    return value
  })
}

const dropWhile = predicate => arg => {
  let dropIt = true

  return inferArray(() => {
    let value = null

    if (dropIt) {
      do {
        value = arg()
        const continueDropping = predicate(value)
        if (continueDropping && isNotEof(value)) {
          continue
        } else if (continueDropping) {
          break
        }
      } while (isNotEof(value))

      dropIt = false
    }

    return value
  })
}

const chunk = size => arg => inferArray(() => {
  const result = []
  for (let i = 0; i < size; i += 1) {
    const value = arg()

    if (isEof(value)) {
      break
    }

    result.push(value)
  }

  return result.length === 0 ? eof : result
})

const map = transform => arg => inferArray(() => {
  const value = arg()
  return isNotEof(value) ? transform(value) : value
})

const filter = predicate => arg => inferArray(() => {
  let value = null

  do {
    value = arg()

    if (predicate(value) === true && isNotEof(value)) {
      return value
    }
  } while (isNotEof(value))

  return value
})

const fromCollection = (collection) => {
  let index = 0

  const values = Array.isArray(collection) ?
    collection :
    Object.entries(collection)

  return () => {
    if (index < values.length) {
      return values[index++]
    }

    return eof
  }
}

const fromPairs = arg => inferObject(() => {
  const value = arg()
  return isEof(value) ? value : { [value[0]]: value[1] }
})

/* endregion Functions set */

const lazy = (...funcs) => {
  if (funcs.length === 0) {
    return v => v
  }

  return (collection) => {
    const argFn = fromCollection(collection)
    const func = [argFn, ...funcs].reduce((arg, fn) => fn(arg))
    return func.__infer__(func)
  }
}

/*
const lz = lazy(
  filter(v => v % 2 === 0),
  take(12),
  map(v => ({ value: v })),
  uniqBy(v => v.value),
  chunk(2)
)

const r = lz([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
])
console.log(r)
*/
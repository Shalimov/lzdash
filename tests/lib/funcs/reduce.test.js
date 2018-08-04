import { lazy } from '../../../lib/lazy'
import * as reduceFuncs from '../../../lib/funcs/reduce'

const { reduce } = reduceFuncs

describe('Test Reduce funcs set', () => {
  test('set should have one functions as source', () => {
    expect(Object.keys(reduceFuncs)).toEqual(['reduce'])
  })

  test('#reduce should return sum of number in array', () => {
    const lz = lazy(reduce((x, y) => x + y))

    expect(lz([1, 2, 3, 4, 5, 6])).toEqual(21)

    
    expect(lz([])).toEqual(undefined)
    expect(lz({})).toEqual(undefined)
    expect(lz()).toEqual(undefined)
    expect(lz(1)).toEqual(undefined)
    expect(lz(null)).toEqual(undefined)
    expect(lz(undefined)).toEqual(undefined)
  })

  test('#reduce could accept acc param', () => {
    const lz = lazy(reduce((a, x) => ({
      ...a,
      [x]: x,
    }), {}))

    expect(lz([1, 2, 3, 4, 5, 6])).toEqual({
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
    })
    
    // Should be investigated
    expect(lz([])).toEqual({})

    expect(lz({})).toEqual({})
    expect(lz()).toEqual({})
    expect(lz(1)).toEqual({})
    expect(lz(null)).toEqual({})
    expect(lz(undefined)).toEqual({})
  })
})

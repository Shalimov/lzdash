import { lazy } from '../../../lib/lazy'
import eager from '../../../lib/eager'
import * as flattenFuncs from '../../../lib/funcs/flatten'

const { flatten, flattenDeep } = flattenFuncs

describe('Test Flatten funcs set', () => {
  test('set should have two functions', () => {
    expect(Object.keys(flattenFuncs)).toEqual(['flatten', 'flattenDeep'])
  })


  test('#flatten should flat first nested level of array', () => {
    const lz = lazy(flatten)

    expect(lz([1, [2, 3], [4]])).toEqual([1, 2, 3, 4])
    expect(lz([1, [2, 3], [[4]]])).toEqual([1, 2, 3, [4]])
    expect(lz([[[1]], [2, 3], [[4]]])).toEqual([[1], 2, 3, [4]])

    expect(eager.flatten([1, [2], [3]])).toEqual([1, 2, 3])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#flatten should flat all nested levels of array', () => {
    const lz = lazy(flattenDeep)

    expect(lz([1, [2, 3], [4]])).toEqual([1, 2, 3, 4])
    expect(lz([1, [2, 3], [[4]]])).toEqual([1, 2, 3, 4])
    expect(lz([[[1]], [2, 3], [[4]]])).toEqual([1, 2, 3, 4])
    expect(lz([[[1]], [[2], 3], [[4]]])).toEqual([1, 2, 3, 4])
    
    expect(eager.flattenDeep([[[1]], [[2], 3], [[4]]])).toEqual([1, 2, 3, 4])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })
})

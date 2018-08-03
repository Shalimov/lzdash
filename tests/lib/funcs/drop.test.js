import { lazy } from '../../../lib/lazy'
import * as dropFuncs from '../../../lib/funcs/drop'

const { drop, dropWhile } = dropFuncs

describe('Test Drop funcs set', () => {
  test('set should have two functions', () => {
    expect(Object.keys(dropFuncs)).toEqual(['drop', 'dropWhile'])
  })

  test('#drop should skip n of elements from start', () => {
    const lz = lazy(drop(5))

    expect(lz([1, 2, 3, 4, 5, 6])).toEqual([6])
    expect(lz([1, 2, 3, 4, 5, 6, 7])).toEqual([6, 7])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })


  test('#dropWhile should skip elements from start while condition is true', () => {
    const lz = lazy(dropWhile(v => v < 5))

    expect(lz([1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1])).toEqual([5, 6, 5, 4, 3, 2, 1])
    expect(lz([4, 5, 6, 5, 4, 3, 2, 1])).toEqual([5, 6, 5, 4, 3, 2, 1])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })
})

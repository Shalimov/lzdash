import eager from '../../../lib/eager'
import { lazy } from '../../../lib/lazy'
import * as filterFuncs from '../../../lib/funcs/filter'

const { filter, reject, compact } = filterFuncs

describe('Test Filters funcs set', () => {
  test('set should have three functions', () => {
    expect(Object.keys(filterFuncs)).toEqual(['filter', 'reject', 'compact'])
  })

  test('#compact should remove falsy values from collection', () => {
    const lz = lazy(compact)

    expect(lz(['', 1, 0, 3, NaN, 5, false, 6, undefined, 7, null])).toEqual([1, 3, 5, 6, 7])

    expect(eager.compact(['', 1, 0, 3, NaN, 5, false, 6, undefined, 7, null])).toEqual([1, 3, 5, 6, 7])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#filter should return values that fit the condition', () => {
    const even = v => v % 2 === 0
    const lz = lazy(filter(even))

    expect(lz([1, 2, 3, 4, 5, 6, 7])).toEqual([2, 4, 6])
    expect(lz([1, 2, 3])).toEqual([2])
    expect(lz([1])).toEqual([])

    expect(eager.filter([1, 2, 3, 4, 5, 6, 7], even)).toEqual([2, 4, 6])
    expect(eager.filter([1, 2, 3], even)).toEqual([2])
    expect(eager.filter([1], even)).toEqual([])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#reject should remove values that fit the condition', () => {
    const even = v => v % 2 === 0
    const lz = lazy(reject(even))

    expect(lz([1, 2, 3, 4, 5, 6, 7])).toEqual([1, 3, 5, 7])
    expect(lz([1, 2, 3])).toEqual([1, 3])
    expect(lz([2])).toEqual([])

    expect(eager.reject([1, 2, 3, 4, 5, 6, 7], even)).toEqual([1, 3, 5, 7])
    expect(eager.reject([1, 2, 3], even)).toEqual([1, 3])
    expect(eager.reject([2], even)).toEqual([])

    expect(lz()).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz(undefined)).toEqual([])
    expect(lz([])).toEqual([])
  })
})

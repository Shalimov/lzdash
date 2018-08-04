import { lazy } from '../../../lib/lazy'
import * as mapFuncs from '../../../lib/funcs/map'

const { map, flatMap, flatMapDeep } = mapFuncs

describe('Test Map funcs set', () => {
  test('set should have three functions', () => {
    expect(Object.keys(mapFuncs)).toEqual(['map', 'flatMap', 'flatMapDeep'])
  })

  test('#map should transform elements of collection by defined rule', () => {
    const lz = lazy(map(v => v * v))

    expect(lz([1, 2, 3, 4, 5, 6, 7])).toEqual([1, 4, 9, 16, 25, 36, 49])
    expect(lz([1, 2, 3, 4, 5, 6, 7])).toEqual([1, 4, 9, 16, 25, 36, 49])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })


  test(`
    #flatMap could transform elements of collection by defined rule,
    return array that will be ingested seamlessly in flat array,
    but includes only one level of nesting
  `, () => {
      const lz = lazy(flatMap(v => [v, v]))

      expect(lz([1, 2, 3, 4])).toEqual([1, 1, 2, 2, 3, 3, 4, 4])
      expect(lz([[1], [2], [3], [4]])).toEqual([[1], [1], [2], [2], [3], [3], [4], [4]])

      expect(lz()).toEqual([])
      expect(lz(1)).toEqual([])
      expect(lz({})).toEqual([])
      expect(lz([])).toEqual([])
      expect(lz(null)).toEqual([])
      expect(lz(undefined)).toEqual([])
    })

  test(`
    #flatMapDeep could transform elements of collection by defined rule,
    return array that will be ingested seamlessly in flat array,
    includes deep nesting
  `, () => {
      const lz = lazy(flatMapDeep(v => [[v, [v]], [v, [v]]]))

      expect(lz([1, 2, 3])).toEqual([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3])
      expect(lz([1, [[2]], [3], 4])).toEqual([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4])

      expect(lz()).toEqual([])
      expect(lz(1)).toEqual([])
      expect(lz({})).toEqual([])
      expect(lz([])).toEqual([])
      expect(lz(null)).toEqual([])
      expect(lz(undefined)).toEqual([])
    })
})
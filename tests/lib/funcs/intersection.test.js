import { lazy } from '../../../lib/lazy'
import * as intersectionFuncs from '../../../lib/funcs/intersection'

const { intersection, intersectionBy } = intersectionFuncs

describe('Test Intersection funcs set', () => {
  test('set should have one functions as source', () => {
    expect(Object.keys(intersectionFuncs)).toEqual(['intersection', 'intersectionBy'])
  })

  test('#intersection should return common between two collections', () => {
    const lz = lazy(intersection([1, 2, 3, 4]))

    expect(lz([2, 3, 4, 5, 6, 7])).toEqual([2, 3, 4])

    expect(lz([])).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#differenceBy should return common between two collection by iteratee', () => {
    const lz = lazy(intersectionBy([{ x: 1 }, { x: 2 }], ({ x }) => x))

    expect(lz([{ x: 1 }, { x: 3 }, { x: 4 }])).toEqual([{ x: 1 }])

    expect(lz([])).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })
})

import eager from '../../../lib/eager'
import { lazy } from '../../../lib/lazy'
import * as differenceFuncs from '../../../lib/funcs/difference'

const { difference, differenceBy } = differenceFuncs

describe('Test Difference funcs set', () => {
  test('set should have one functions as source', () => {
    expect(Object.keys(differenceFuncs)).toEqual(['difference', 'differenceBy'])
  })

  test('#difference should return diff between two collections', () => {
    const lz = lazy(difference([1, 2, 3, 4]))

    expect(lz([2, 3, 4, 5, 6, 7])).toEqual([5, 6, 7])

    expect(eager.difference([2, 3, 4, 5, 6, 7], [1, 2, 3, 4])).toEqual([5, 6, 7])

    expect(lz([])).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#differenceBy should return diff between two collection by iteratee', () => {
    const lz = lazy(differenceBy([{ x: 1 }, { x: 2 }], ({ x }) => x))

    expect(lz([{ x: 1 }, { x: 3 }, { x: 4 }])).toEqual([{ x: 3 }, { x: 4 }])

    expect(eager.differenceBy([{ x: 1 }, { x: 3 }, { x: 4 }], [{ x: 1 }, { x: 2 }], ({ x }) => x))
      .toEqual([{ x: 3 }, { x: 4 }])

    expect(lz([])).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })
})

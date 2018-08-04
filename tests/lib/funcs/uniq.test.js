import { lazy } from '../../../lib/lazy'
import * as uniqFuncs from '../../../lib/funcs/uniq'

const { uniq, uniqBy } = uniqFuncs

describe('Test Drop funcs set', () => {
  test('set should have two functions', () => {
    expect(Object.keys(uniqFuncs)).toEqual(['uniq', 'uniqBy'])
  })

  test('#take should retain n of elements from start and abort sequence', () => {
    const lz = lazy(uniq)

    expect(lz([1, 1, 2, 3, 3, 4, 4, 5, 3, 1, 2, 6])).toEqual([1, 2, 3, 4, 5, 6])
    expect(lz([1, 1, 2, 3, 3, 4, 4, 5, 3, 1, 2, 6])).toEqual([1, 2, 3, 4, 5, 6])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#takeWhile should retain elements from start while condition is true then abort sequence', () => {
    const lz = lazy(uniqBy(obj => obj.x))

    expect(lz([1, 1, 2, 3, 3, 4, 4, 5, 3, 1, 2, 6].map(x => ({ x })))).toEqual([
      { x: 1 },
      { x: 2 },
      { x: 3 },
      { x: 4 },
      { x: 5 },
      { x: 6 },
    ])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })
})

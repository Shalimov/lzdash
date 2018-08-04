import { lazy, lazySource, map, filter, range, take } from '../../../lib'
import * as zipFuncs from '../../../lib/funcs/zip'

const { zip, zipWith } = zipFuncs

describe('Test Zip funcs set', () => {
  test('set should have two functions', () => {
    expect(Object.keys(zipFuncs)).toEqual(['zip', 'zipWith'])
  })

  test('#zip should blend two sources', () => {
    const zipSource = lazySource(
      filter(v => v % 2 === 0),
      map(v => v * v),
      take(10)
    )

    let lz = lazy(
      zip(zipSource(range(1)))
    )

    expect(lz([1, 2, 3, 4, 5, 6])).toEqual([
      [1, 4],
      [2, 16],
      [3, 36],
      [4, 64],
      [5, 100],
      [6, 144],
    ])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#zipWith should blend two sources, and use transform function', () => {
    const zipSource = lazySource(
      filter(v => v % 2 === 0),
      map(v => v * v),
      take(10)
    )

    let lz = lazy(
      zipWith(zipSource(range(1)), (x, y) => y - x)
    )

    expect(lz([1, 2, 3, 4, 5, 6])).toEqual([3, 14, 33, 60, 95, 138])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })
})

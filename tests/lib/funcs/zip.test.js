import { lazy, lazySource, map, filter, range, repeat, generator, take } from '../../../lib'
import * as zipFuncs from '../../../lib/funcs/zip'

const { zip, zipWith } = zipFuncs

// TODO: add test for diff kind of sources
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
    expect(lz([1, 2, 3, 4, 5, 6])).toEqual([3, 14, 33, 60, 95, 138])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#zip should mix diff sources', () => {
    let lz = lazy(zip([0, 1, 2, 3, 4, 5, 6]))

    expect(lz([1, 2, 3, 4, 5, 6, 7])).toEqual([[1, 0], [2, 1], [3, 2], [4, 3], [5, 4], [6, 5], [7, 6]])
    expect(lz([1, 2, 3, 4, 5, 6, 7])).toEqual([[1, 0], [2, 1], [3, 2], [4, 3], [5, 4], [6, 5], [7, 6]])
    
    lz = lazy(zip(repeat('hi')))
    expect(lz([1, 2, 3])).toEqual([[1, 'hi'], [2, 'hi'], [3, 'hi']])

    lz = lazy(zip(generator((i) => {
      return -i
    })))
    expect(lz([1, 2, 3])).toEqual([[1, -0], [2, -1], [3, -2]])
    expect(lz([1, 2, 3])).toEqual([[1, -0], [2, -1], [3, -2]])
  })
})

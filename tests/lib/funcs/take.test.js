import { lazy } from '../../../lib/lazy'
import * as takeFuncs from '../../../lib/funcs/take'

const { take, takeWhile } = takeFuncs

describe('Test take funcs set', () => {
  test('set should have two functions', () => {
    expect(Object.keys(takeFuncs)).toEqual(['take', 'takeWhile'])
  })

  test('#take should retain n of elements from start and abort sequence', () => {
    const lz = lazy(take(5))

    expect(lz([1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3, 4, 5])
    expect(lz([1, 2, 3, 4, 5, 6, 7])).toEqual([1, 2, 3, 4, 5])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#takeWhile should retain elements from start while condition is true then abort sequence', () => {
    const lz = lazy(takeWhile(v => v < 5))

    expect(lz([1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4])
    expect(lz([4, 5, 6, 5, 4, 3, 2, 1])).toEqual([4])

    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })
})

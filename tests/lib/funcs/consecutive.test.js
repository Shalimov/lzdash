import { lazy } from '../../../lib/lazy'
import * as consecutiveFuncs from '../../../lib/funcs/consecutive'

const { consecutive } = consecutiveFuncs

describe('Test Pairs funcs set', () => {
  test('set should have one functions as source', () => {
    expect(Object.keys(consecutiveFuncs)).toEqual(['consecutive'])
  })

  test('#reduce should return sum of number in array', () => {
    const lz = lazy(consecutive)

    expect(lz([1, 2, 3])).toEqual([[1, 2], [2, 3]])
    expect(lz([1, 2])).toEqual([[1, 2]])
    expect(lz([1])).toEqual([])


    expect(lz([])).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

})

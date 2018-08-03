import { lazy } from '../../../lib/lazy'
import * as pairsFuncs from '../../../lib/funcs/pairs'

const { pairs } = pairsFuncs

describe('Test Pairs funcs set', () => {
  test('set should have one functions as source', () => {
    expect(Object.keys(pairsFuncs)).toEqual(['pairs'])
  })

  test('#reduce should return sum of number in array', () => {
    const lz = lazy(pairs)

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

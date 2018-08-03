import { lazy } from '../../../lib/lazy'
import * as objFuncs from '../../../lib/funcs/object'

const { keys, values, entries } = objFuncs

describe('Test Object funcs set', () => {
  test('set should have four functions', () => {
    expect(Object.keys(objFuncs)).toEqual(['keys', 'values', 'entries', 'isObject'])
  })

  test('#keys should transform object source to key collection and use it as source', () => {
    const lz = lazy(keys)

    expect(lz({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c'])
    expect(lz({ a: 1, b: 2, c: 3, d: 4 })).toEqual(['a', 'b', 'c', 'd'])

    expect(lz({})).toEqual([])
    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#values should transform object source to value collection and use it as source', () => {
    const lz = lazy(values)

    expect(lz({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3])
    expect(lz({ a: 1, b: 2, c: 3, d: 4 })).toEqual([1, 2, 3, 4])

    expect(lz({})).toEqual([])
    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })

  test('#entries should transform object source to entry collection and use it as source', () => {
    const lz = lazy(entries)

    expect(lz({ a: 1, b: 2, c: 3 })).toEqual([['a', 1], ['b', 2], ['c', 3]])
    expect(lz({ a: 1, b: 2, c: 3, d: 4 })).toEqual([['a', 1], ['b', 2], ['c', 3], ['d', 4]])

    expect(lz({})).toEqual([])
    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })
})


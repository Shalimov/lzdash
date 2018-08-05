import { lazy } from '../../../lib/lazy'
import { map } from '../../../lib/funcs/map'
import { take } from '../../../lib/funcs/take'
import * as genFuncs from '../../../lib/sources/gen'

const { gen } = genFuncs

describe('Test Gen sequence generator', () => {
  test('set should have three functions as source', () => {
    expect(Object.keys(genFuncs)).toEqual(['gen'])
  })

  test('check finite repeat sequence', () => {
    const lz = lazy(map(v => v))

    expect(lz(gen(Math.random, 5))).toHaveLength(5)
  })


  test('check infinite repeat sequence as source, but limited by take!', () => {
    const lz = lazy(take(10))
    expect(lz(gen(Math.random))).toHaveLength(10)
  })
})

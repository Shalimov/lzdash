import { lazy } from '../../../lib/lazy'
import { map } from '../../../lib/funcs/map'
import { take } from '../../../lib/funcs/take'
import * as genFuncs from '../../../lib/sources/generator'

const { generator } = genFuncs

describe('Test Generator of sequence', () => {
  test('set should have three functions as source', () => {
    expect(Object.keys(genFuncs)).toEqual(['generator'])
  })

  test('check finite generator of sequence', () => {
    const lz = lazy(map(v => v))

    expect(lz(generator(Math.random, 5))).toHaveLength(5)
  })


  test('check infinite generator of sequence as source, but limited by take!', () => {
    const lz = lazy(take(10))
    expect(lz(generator(Math.random))).toHaveLength(10)
  })
})

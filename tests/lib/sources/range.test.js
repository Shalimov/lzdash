import { lazy } from '../../../lib/lazy'
import { map } from '../../../lib/funcs/map'
import { take } from '../../../lib/funcs/take'
import * as rangeFuncs from '../../../lib/sources/range'

const { range } = rangeFuncs

describe('Test Range sequence generator', () => {
  test('set should have three functions as source', () => {
    expect(Object.keys(rangeFuncs)).toEqual(['range'])
  })

  test('check finite range sequence', () => {
    const lz = lazy(map(v => v))

    expect(lz(range(1, 5, 2))).toEqual([1, 3])
  })


  test('check infinite range sequence as source, but limited by take!', () => {
    const lz = lazy(take(150))
    const expectedData = []

    for (let i = 1; i < 300; i += 2) {
      expectedData.push(i)
    }

    expect(lz(range(1, Infinity, 2))).toEqual(expectedData)
  })
})

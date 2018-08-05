import { lazy } from '../../../lib/lazy'
import { map } from '../../../lib/funcs/map'
import { take } from '../../../lib/funcs/take'
import * as repeatFuncs from '../../../lib/sources/repeat'

const { repeat } = repeatFuncs

describe('Test Repeat sequence generator', () => {
  test('set should have three functions as source', () => {
    expect(Object.keys(repeatFuncs)).toEqual(['repeat'])
  })

  test('check finite repeat sequence', () => {
    const lz = lazy(map(v => v))

    expect(lz(repeat('Hi', 5))).toEqual(['Hi', 'Hi', 'Hi', 'Hi', 'Hi'])
  })


  test('check infinite repeat sequence as source, but limited by take!', () => {
    const lz = lazy(take(10))
    const expectedData = []

    for (let i = 0; i < 10; i += 1) {
      expectedData.push('hi')
    }

    expect(lz(repeat('hi'))).toEqual(expectedData)
  })
})

import { lazy } from '../../../lib/lazy'
import * as groupFuncs from '../../../lib/funcs/aggregate'

const { groupBy, countBy } = groupFuncs

describe('Test Group funcs set', () => {
  test('set should have two functions as source', () => {
    expect(Object.keys(groupFuncs)).toEqual(['groupBy', 'countBy'])
  })

  test('#difference should return grouped values by key', () => {
    const lz = lazy(groupBy(v => v.x))

    const testObj = [2, 3, 4, 5, 2, 3].map(x => ({ x }))
    expect(lz(testObj)).toEqual({
      2: [{ x: 2 }, { x: 2 }],
      3: [{ x: 3 }, { x: 3 }],
      4: [{ x: 4 }],
      5: [{ x: 5 }],
    })

    expect(lz([])).toEqual({})
    expect(lz({})).toEqual({})
    expect(lz()).toEqual({})
    expect(lz(1)).toEqual({})
    expect(lz(null)).toEqual({})
    expect(lz(undefined)).toEqual({})
  })


  test('#countBy should return count by keys', () => {
    const lz = lazy(countBy(v => v.x))

    const testObj = [2, 3, 4, 5, 2, 3].map(x => ({ x }))
    expect(lz(testObj)).toEqual({
      2: 2,
      3: 2,
      4: 1,
      5: 1,
    })

    expect(lz([])).toEqual({})
    expect(lz({})).toEqual({})
    expect(lz()).toEqual({})
    expect(lz(1)).toEqual({})
    expect(lz(null)).toEqual({})
    expect(lz(undefined)).toEqual({})
  })
})

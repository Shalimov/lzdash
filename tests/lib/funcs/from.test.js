import eager from '../../../lib/eager'
import { lazy } from '../../../lib/lazy'
import * as fromFuncs from '../../../lib/funcs/from'

const { fromPairs } = fromFuncs

describe('Test From funcs set', () => {
  test('set should have two functions', () => {
    expect(Object.keys(fromFuncs)).toEqual(['from', 'fromPairs'])
  })

  test('#fromPairs should build object from pairs', () => {
    const lz = lazy(fromPairs)

    expect(lz([['__1', 1], ['__2', 2]])).toEqual({
      __1: 1,
      __2: 2,
    })

    expect(eager.fromPairs([['__1', 1], ['__2', 2]])).toEqual({
      __1: 1,
      __2: 2,
    })

    expect(lz([1])).toEqual({
      undefined: undefined,
    })

    expect(lz()).toEqual({})
    expect(lz(1)).toEqual({})
    expect(lz({ a: 1 })).toEqual({})
    expect(lz([])).toEqual({})
    expect(lz(null)).toEqual({})
    expect(lz(undefined)).toEqual({})
  })
})

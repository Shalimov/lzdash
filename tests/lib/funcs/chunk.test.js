import eager from '../../../lib/eager'
import { lazy } from '../../../lib/lazy'
import * as chunkFuncs from '../../../lib/funcs/chunk'

const { chunk } = chunkFuncs

describe('Test Chunk funcs set', () => {
  test('set should have only one function', () => {
    expect(Object.keys(chunkFuncs)).toEqual(['chunk'])
  })

  test('#chunk should break collection into peaces', () => {
    const lz = lazy(chunk(3))

    expect(lz([1, 2, 3, 4, 5, 6, 7])).toEqual([[1, 2, 3], [4, 5, 6], [7]])
    expect(lz([1])).toEqual([[1]])
    
    expect(eager.chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]])
    expect(eager.chunk([1], 3)).toEqual([[1]])
    
    expect(lz()).toEqual([])
    expect(lz(1)).toEqual([])
    expect(lz({})).toEqual([])
    expect(lz([])).toEqual([])
    expect(lz(null)).toEqual([])
    expect(lz(undefined)).toEqual([])
  })
})

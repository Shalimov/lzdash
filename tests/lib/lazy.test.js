import { lazy } from '../../lib'

describe('Test LAZY flow generator', () => {
  it('#lazy should return unchanged collection if pipeline is not defined', () => {
    const emptyLz = lazy()

    expect(emptyLz(5)).toBe(5)
    expect(emptyLz({})).toEqual({})
    expect(emptyLz([1, 2, 3])).toEqual([1, 2, 3])
  })
})

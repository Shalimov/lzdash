import { lazy, lazySource, map, filter } from '../../lib'

describe('Test LAZY flow generator', () => {
  it('#lazy should return unchanged collection if pipeline is not defined', () => {
    const emptyLz = lazy()

    expect(emptyLz(5)).toBe(5)
    expect(emptyLz({})).toEqual({})
    expect(emptyLz([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('#lazySource should return unchanged collection if pipeline is not defined', () => {
    const ls = lazySource(
      filter(v => v % 2 === 0),
      map(v => v * v)
    )

    const l = ls([1, 2, 3, 4])()

    expect(l()).toBe(4)
    expect(l()).toBe(16)
  })
})

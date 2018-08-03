import { eof, isNotEof, isEof } from '../../lib/helpers'

describe('Test EOF Helpers', () => {
  it('#eof should be a frozen function', () => {
    expect(Object.isFrozen(eof)).toBe(true)
    expect(eof).toBeInstanceOf(Function)
  })

  it('#isEof should return true if value is eof', () => {
    expect(isEof({})).toBe(false)
    expect(isEof([])).toBe(false)
    expect(isEof(false)).toBe(false)
    expect(isEof(true)).toBe(false)
    expect(isEof(0)).toBe(false)
    expect(isEof(NaN)).toBe(false)
    expect(isEof(NaN)).toBe(false)

    expect(isEof(eof)).toBe(true)
  })

  it('#isNotEof should return true if value is not eof', () => {
    expect(isNotEof({})).toBe(true)
    expect(isNotEof([])).toBe(true)
    expect(isNotEof(false)).toBe(true)
    expect(isNotEof(true)).toBe(true)
    expect(isNotEof(0)).toBe(true)
    expect(isNotEof(NaN)).toBe(true)
    expect(isNotEof(NaN)).toBe(true)

    expect(isNotEof(eof)).toBe(false)
  })
})

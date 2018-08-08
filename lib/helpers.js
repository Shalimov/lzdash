const SOURCE_PROVIDER = Object.freeze({})

export const eof = Object.freeze(() => { })
export const isEof = value => value === eof
export const isNotEof = value => value !== eof
export const isSourceProvider = fn => (fn && fn.__source__) === SOURCE_PROVIDER
export const wrapSource = (fn) => {
  fn.__source__ = SOURCE_PROVIDER
  return Object.freeze(fn)
}

export const toSource = generator => (...args) => wrapSource(() => {
  const gen = generator(...args)

  return () => {
    const { value, done } = gen.next()
    return done ? eof : value
  }
})

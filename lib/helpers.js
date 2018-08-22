export const SOURCE_TYPES = Object.freeze({
  COLLECTION: 'collection',
  INV_SOURCE: 'inv_source',
  SIMP_SOURCE: 'simp_source',
})

export const eof = Object.freeze(() => { })
export const isEof = value => value === eof
export const isNotEof = value => value !== eof
export const isObject = value => Object.prototype.toString.call(value) === '[object Object]'
export const getSource = (src) => {
  if (Array.isArray(src)) {
    return SOURCE_TYPES.COLLECTION
  }

  return src && src.__source__
}

export const wrapSource = (fn, sourceType, freeze = true) => {
  fn.__source__ = sourceType
  return freeze ? Object.freeze(fn) : fn
}

export const wrapSimpleSource = (fn, frz) => wrapSource(fn, SOURCE_TYPES.SIMP_SOURCE, frz)
export const wrapInvocableSource = (fn, frz) => wrapSource(fn, SOURCE_TYPES.INV_SOURCE, frz)

export const toSource = generator => (...args) => wrapSource(() => {
  const gen = generator(...args)
  return () => gen()
}, SOURCE_TYPES.INV_SOURCE)

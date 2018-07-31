const ARG = Object.freeze({ state: 'arg '})
const EOF = Object.freeze({ state: 'eof '})
const NEXT = Object.freeze({ state: 'next '})

const next = value => ({ ...NEXT, value })
const arg = () => ARG
const eof = () => EOF

const isArg = value => ARG === value
const isEof = value => EOF === value
const isNotEof = value => EOF !== value
const isNext = value => NEXT.state === value.state

const fmap = (item, prop = 'value') => (isNext(item) ? item[prop] : undefined)

export {
  EOF,
  fmap,
  next,
  arg,
  eof,
  isArg,
  isEof,
  isNotEof,
  isNext
}
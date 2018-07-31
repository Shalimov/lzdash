export const eof = Object.freeze(() => {})
export const isEof = value => value === eof
export const isNotEof = value => value !== eof
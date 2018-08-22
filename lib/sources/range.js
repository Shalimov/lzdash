import { eof, toSource } from '../helpers'

const rangeGenerator = (start, end = Infinity, step = 1) => {
  const basis = (end - start) >= 0 ? 1 : -1
  const correctedStep = step * basis
  const evalCondition = basis > 0 ? (s, e) => s < e : (s, e) => s > e

  return () => {
    if (evalCondition(start, end)) {
      const buff = start
      start += correctedStep
      return buff
    }

    return eof
  }
}

export const range = toSource(rangeGenerator)

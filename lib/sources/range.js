import { eof, toSource } from '../helpers'

const rangeGenerator = function* (start, end = Infinity, step = 1) {
  const basis = (end - start) >= 0 ? 1 : -1
  const correctedStep = step * basis
  const evalCondition = basis > 0 ? (s, e) => s < e : (s, e) => s > e

  while (evalCondition(start, end)) {
    yield start
    start += correctedStep
  }

  return eof
}

export const range = toSource(rangeGenerator)

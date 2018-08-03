import { eof } from '../helpers'

const rangeGenerator = function* (start, end, step) {
  const basis = (end - start) >= 0 ? 1 : -1
  const correctedStep = step * basis
  const evalCondition = basis > 0 ? (s, e) => s < e : (s, e) => s > e

  while (evalCondition(start, end)) {
    yield start
    start += correctedStep
  }

  return eof
}

export const range = (start, end = Infinity, step = 1) => {
  const gen = rangeGenerator(start, end, step)

  return () => {
    const { value, done } = gen.next()
    return done ? eof : value
  }
}

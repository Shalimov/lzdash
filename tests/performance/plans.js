const fp = require('lodash/fp')
const lz = require('../../dist/dist')

const simpleValueSets = [
  10 ** 1,
  5 * 10 ** 1,
  10 ** 2,
  5 * 10 ** 2,
  10 ** 3,
  5 * 10 ** 3,
  10 ** 4,
  5 * 10 ** 4,
  10 ** 5,
  5 * 10 ** 5,
  10 ** 6,
  5 * 10 ** 6,
  10 ** 7,
].map(end => lz.eager.map(lz.range(0, end), v => v))

const simpleObjectSets = [
  10 ** 1,
  5 * 10 ** 1,
  10 ** 2,
  5 * 10 ** 2,
  10 ** 3,
  5 * 10 ** 3,
  10 ** 4,
  5 * 10 ** 4,
  10 ** 5,
  5 * 10 ** 5,
  10 ** 6,
  5 * 10 ** 6,
].map(end => lz.eager.map(lz.range(0, end), v => ({ v })))

const plans = {
  lzdash: [
    [
      lz.lazy(lz.filter(v => v % 2 === 0), lz.map(v => v * v), lz.reduce((x, y) => x + y, 0)),
      '[filter(v % 2) -> map(v * v) -> reduce(x + y)]',
      simpleValueSets,
    ],
    [
      lz.lazy(lz.reject(v => v % 2 === 0), lz.map(v => v * 3), lz.take(100)),
      '[reject(v % 2) -> map(v * 3) -> take(100)]',
      simpleValueSets,
    ],
    [
      lz.lazy(lz.values, lz.reduce((x, y) => x + y, 0)),
      '[values, reduce(x + y)]',
      simpleObjectSets,
    ],
    [
      lz.lazy(lz.values, lz.reject(v => v % 2 === 0), lz.reduce((x, y) => x + y, 0)),
      '[values, reject(v % 2), reduce(x + y)]',
      simpleObjectSets,
    ],
  ],
  lodash: [
    [
      fp.flow(fp.filter(v => v % 2 === 0), fp.map(v => v * v), fp.reduce((x, y) => x + y, 0)),
      '[filter(v % 2) -> map(v * v) -> reduce(x + y)]',
      simpleValueSets,
    ],
    [
      fp.flow(fp.reject(v => v % 2 === 0), fp.map(v => v * 3), fp.take(100)),
      '[reject(v % 2) -> map(v * 3) -> take(100)]',
      simpleValueSets,
    ],
    [
      fp.flow(fp.values, fp.reduce((x, y) => x + y, 0)),
      '[values, reduce(x + y)]',
      simpleObjectSets,
    ],
    [
      fp.flow(fp.values, fp.reject(v => v % 2 === 0), fp.reduce((x, y) => x + y, 0)),
      '[values, reject(v % 2), reduce(x + y)]',
      simpleObjectSets,
    ],
  ],
}

module.exports = {
  simpleValueSets,
  simpleObjectSets,
  plans,
}

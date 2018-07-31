const { lazy, map, filter, take, takeWhile } = require('../dist/dist')

const lz1 = lazy(
  filter(v => v % 2 === 0),
  map(v => v * 2),
  take(4)
)


const lz2 = lazy(
  filter(v => v % 2 === 0),
  map(v => v * 2),
  takeWhile(v => v > 5)
)

console.log(
  lz1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]),
  lz1([9, 8, 7, 6, 5, 4, 3, 2, 1]),
  lz2([9, 8, 7, 6, 5, 4, 3, 2, 1])
)
const { lazy, map, filter, take, takeWhile, drop, dropWhile } = require('../dist/dist')

const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const lz1 = lazy(
  filter(v => v % 2 === 0),
  map(v => v * 2),
  take(4)
)


const lz2 = lazy(
  filter(v => v % 2 === 0),
  takeWhile(v => v < 5)
)


const lz3 = lazy(
  filter(v => v % 2 === 0),
  map(v => v * v),
  drop(5)
)


const lz4 = lazy(
  filter(v => v % 2 === 0),
  map(v => v),
  dropWhile(v => v < 2)
)

console.log(
  lz1(testData),
  lz1(testData),
  lz2(testData),
  lz2(testData),
  lz3(testData),
  lz3(testData),
  lz4(testData),
  lz4(testData),
)
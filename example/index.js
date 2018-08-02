const {
  lazy,
  map,
  flatMap,
  flatMapDeep,
  filter,
  reject,
  take,
  takeWhile,
  drop,
  dropWhile,
  chunk,
  uniq,
  uniqBy,
  reduce,
  fromPairs,
} = require('../dist/dist')

const toObjData = lazy(map(v => ({ v })))
const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const testDataObj = toObjData(testData)

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
  dropWhile(v => v < 10)
)

const lz5 = lazy(
  filter(v => v % 2 === 0),
  chunk(4)
)

const lz6 = lazy(
  filter(v => v % 2 === 0),
  uniq
)

const lz7 = lazy(
  filter(v => v % 2 === 0),
  map(v => v * v),
  reduce((x, y) => y - x)
)

const lz8 = lazy(
  filter(v => v.v % 2 === 0),
  uniqBy(v => v.v)
)

const lz9 = lazy(
  filter(v => v.v % 2 === 0),
  uniqBy(v => v.v),
  map(v => [`__${v.v}__`, v.v]),
  fromPairs
)

const lz10 = lazy(
  filter(v => v % 2 === 0),
  flatMap(v => [v, v])
)

const lz11 = lazy(
  filter(v => v % 2 === 0),
  flatMapDeep(v => [v, [[v], v], v])
)

const lz12 = lazy(
  reject(v => v % 2 === 0),
  flatMap(v => [v, v])
)

console.log(
  [
    lz1(testData),
    lz1(testData),
    lz2(testData),
    lz2(testData),
    lz3(testData),
    lz3(testData),
    lz4(testData),
    lz4(testData),
    lz5(testData),
    lz6(testData.concat(testData)),
    lz6(testData.concat(testData)),
    lz7(testData),
    lz7(testData),
    lz7(testData),
    lz8(testDataObj.concat(testDataObj)),
    lz8(testDataObj.concat(testDataObj)),
    lz9(testDataObj.concat(testDataObj)),
    lz9(testDataObj.concat(testDataObj)),
    lz10(testData),
    lz11(testData),
    lz12(testData),
  ].join('\n')
)

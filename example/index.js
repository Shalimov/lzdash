const {
  lazy,
  map,
  flatMap,
  flatMapDeep,
  filter,
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

console.log(
  // '\n',
  // lz1(testData),
  // '\n',
  // lz1(testData),
  // '\n',
  // lz2(testData),
  // '\n',
  // lz2(testData),
  // '\n',
  // lz3(testData),
  // '\n',
  // lz3(testData),
  // '\n',
  // lz4(testData),
  // '\n',
  // lz4(testData),
  // '\n',
  // lz5(testData),
  // '\n',
  // lz6(testData.concat(testData)),
  // '\n',
  // lz6(testData.concat(testData)),
  // '\n',
  // lz7(testData),
  // '\n',
  // lz7(testData),
  // '\n',
  // lz7(testData),
  // '\n',
  // lz8(testDataObj.concat(testDataObj)),
  // '\n',
  // lz8(testDataObj.concat(testDataObj)),
  // '\n',
  // lz9(testDataObj.concat(testDataObj)),
  // '\n',
  // lz9(testDataObj.concat(testDataObj)),
  '\n',
  lz10(testData),
  '\n',
  lz11(testData),
)

let stime = process.hrtime.bigint()
const tlr = testData.map(v => v * v).filter(v => v % 2 === 0).map(v => v / 2)
console.log(process.hrtime.bigint() - stime)

const lzt = lazy(
  map(v => v * v),
  filter(v => v % 2 === 0),
  map(v => v / 2)
)

stime = process.hrtime.bigint()
const lztr = lzt(testData)
console.log(process.hrtime.bigint() - stime)

console.log(
  tlr,
  lztr
)
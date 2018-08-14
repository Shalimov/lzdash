# Lazy non-strict evaluation in JS subset of lodash/fp functions to work with collections effectively

**lzdash** is a functional utility library for JavaScript, contains subset of Lodash functions (api similar to lodash/fp), but with a lazy engine under the hood that strives to do as little work as possible while being as flexible as possible.

**For:**
- __more information check [API Docs](/docs/api.md)__
- __explanation how it works check [Explanation](/docs/expl.md)__

```javascript
import fp from 'lodash/fp'
import _ from 'lodash'
//---------------------
import lz from 'lzdash'

const fpSuperSum = fp.flow(
  fp.filter(v => v % 2 === 0),
  fp.map(v => v * v),
  fp.reduce((x, y) => x + y, 0)
)

// when u pass a collection to handle
// it starts from reduce and ask for `y` arg to be evaluated
// this request goes to map and then map do the same in relation to filter
// filter ask collection to get 1 item and pass item to map if it fits the condition
// filter holds map evaluation while predicate gives false (other words: condition is not true)
const lzSuperSum = lz.lazy(
  lz.filter(v => v % 2 === 0),
  lz.map(v => v * v),
  lz.reduce((x, y) => x + y, 0)
)

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const _filterResult = _.filter(data, v => v % 2 === 0) // 10 iterations => [2, 4, 6, 8, 10]
const _mapResult = _.map(_filterResult, v => v * v) // 5 iterations => [4, 16, 36, 64, 100]
const _result = _.reduce(_mapResult, (x, y) => x + y, 0) // 5 iterations => 220

console.log(
  fpSuperSum(data), // returns 220, iterations 10 by filter, 5 by map, 5 by reduce, total iterations 20
  _result, // returns 220, iterations 10 by filter, 5 by map, 5 by reduce, total iterations 20
  // ---------------------
  lzSuperSum(data), // returns 220, total iterations 10 because of lazy nature + sharing
)

```

It has no external dependencies, so you can get started right away with:
```
yarn add lzdash
// or
npm install lzdash
```

```javascript
export {
  lazy,
  map,
  flatMap,
  flatMapDeep,
  flatten,
  flattenDeep,
  consecutive,
  intersection,
  intersectionBy,
  difference,
  differenceBy,
  filter,
  reject,
  compact,
  reduce,
  take,
  takeWhile,
  drop,
  dropWhile,
  uniq,
  uniqBy,
  chunk,
  zip,
  zipWith,
  groupBy,
  countBy,
  keys,
  values,
  entries,
  fromPairs,
  // Infinite/Lazy sources
  lazySource,
  range,
  repeat,
  generator,
}

```
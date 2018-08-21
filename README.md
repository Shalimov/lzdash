# Lazy non-strict evaluation in JS subset of lodash/fp functions to work with collections effectively

**lzdash** is a functional utility library for JavaScript, contains subset of Lodash functions (api similar to lodash/fp), but with a lazy engine under the hood that strives to do as little work as possible while being as flexible as possible.

**For:**
- __more information check [API Docs](/docs/api.md)__
- __explanation how it works, check [Explanation](/docs/expl.md)__
- [__Caveats__](#caveats)

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

__What we have:__
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
---
## __Caveats:__
[](#caveats)

Because of the lazy nature of some of the functions, __logical__ restrictions apply; explanation to why can be found below. Here is a list of restrictions:
- `reduce`, `groupBy`, `countBy`, `fromPairs` makes sense to use only as trailing functions
- `keys`, `values`, `entries` works a bit different in case if they are not leading (will be shown below)

__NB!__: Main point here being: you can use them wherever you want in the pipeline, but in almost all cases it makes sense for some of them be either trailing or leading. Because they are lazy and work with args as well as other lazy functions (whisper: one by one).

__Example of usage:__

```javascript
import lz from 'lzdash'

// # trailing functions
lz.lazy(
  lz.filter(value => value % 2 === 0),
  lz.map(value => value ** 2),
  lz.reduce(...)
)

lz.lazy(
  lz.filter(value => value % 2 === 0),
  lz.map(value => value ** 2),
  lz.groupBy(...)
)

lz.lazy(
  lz.filter(value => value % 2 === 0),
  lz.map(value => value ** 2),
  lz.countBy(...)
)

// # leading functions

lz.lazy(lz.keys, ...otherFuncs)
lz.lazy(lz.values, ...otherFuncs)
lz.lazy(lz.entries, ...otherFuncs)
```

Let's start with `reduce/groupBy/countBy`:

Example:
```javascript

const lzReduce = lz.lazy(
  lz.filter(value => value % 2 === 0),
  lz.map(value => value ** 2),
  lz.reduce((x, y) => x + y, 0)
)

lzReduce([1, 2, 3, 4, 5, 6]) // 56 -> works fine

// # BIG DIFF IS HERE

const lzReduce1 = lz.lazy(
  lz.map(value => value ** 2),
  lz.reduce((x, y) => x + y, 0),
  lz.map(afterReduce => afterReduce) // yep that's possible
)

// pls note, that map takes all intermediate results
// from reduce work, cuz reduce obey the rules
// of lazy evaluation and produce one result per iteration
lzReduce1([1, 2, 3]) // [1, 5, 14]

```

In `lzReduce` reduce returns the result of only one iteration and that's why we get such an effect.
If this is not enough for you to understand, pls let me know in issues (tag your issue as [Question]) and I will replay as soon as I can.

---

When I'm talking about `keys/values/entries` I told that we have some diffs while working with this set of functions:
- if you use them as leading functions, then there is no diff for u in comparison to other libs
- if you use them inside flow (not leading position), it will take arg and do its magic over it, please take a look:

```javascript

const fn = lz.lazy(
  lz.keys,
  lz.map(k => `key:${k}`)
)

fn({ a: 1, b: 2 }) // ['key:a', 'key:b']


const fnKeys = lz.lazy(
  lz.map(v => v) // actually we can remove it and it will work the same.
  lz.keys,
  lz.map(key => `_${key}_`)
)

// lz.lazy(lz.keys, lz.map(key => `_${key}_`)) almost the same as code example above
// but diff is in case if `keys` is leading func u can pass object to fnKeys
// otherwise it should be an array

const data = [
  { a: 1, b: 2 },
  { c: 1, d: 2 },
]

fnKeys(data) // ['_a_', '_b_', '_c_', '_d_']

```

Here you see that object after first `map(v => v)` goes to `keys` function, `keys` create a sequence of keys and move first of them to next `map(key ....)` and that's why we got the result like this.

---
Please, let me know if something still unclear for you and I will try to reveal all magic around.
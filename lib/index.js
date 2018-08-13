import { lazy } from './lazy'
// funcs
import { map, flatMap, flatMapDeep } from './funcs/map'
import { flatten, flattenDeep } from './funcs/flatten'
import { filter, reject, compact } from './funcs/filter'
import { fromPairs } from './funcs/from'
import { chunk } from './funcs/chunk'
import { reduce } from './funcs/reduce'
import { take, takeWhile } from './funcs/take'
import { drop, dropWhile } from './funcs/drop'
import { uniq, uniqBy } from './funcs/uniq'
import { zip, zipWith } from './funcs/zip'
import { consecutive } from './funcs/consecutive'
import { difference, differenceBy } from './funcs/difference'
import { intersection, intersectionBy } from './funcs/intersection'
import { groupBy, countBy } from './funcs/aggregate'
import { keys, values, entries } from './funcs/object'
// sources
import { generator } from './sources/generator'
import { range } from './sources/range'
import { repeat } from './sources/repeat'
import { lazySource } from './sources/lazy.source'

// xor, xorBy

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
  // Sources
  lazySource,
  range,
  repeat,
  generator,
}

export default {
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
  lazySource,
  range,
  repeat,
  generator,
}

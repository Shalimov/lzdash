import { lazy, lazySource } from './lazy'
// funcs
import { map, flatMap, flatMapDeep } from './funcs/map'
import { filter, reject, compact } from './funcs/filter'
import { fromPairs } from './funcs/from'
import { chunk } from './funcs/chunk'
import { reduce } from './funcs/reduce'
import { take, takeWhile } from './funcs/take'
import { drop, dropWhile } from './funcs/drop'
import { uniq, uniqBy } from './funcs/uniq'
import { zip, zipWith } from './funcs/zip'
import { pairs } from './funcs/pairs'
import { keys, values, entries } from './funcs/object'
// sources
import { range } from './sources/range'

// difference, differenceBy, intersection, intersectionBy, xor, xorBy, flatten, flattenDeep

export {
  lazy,
  lazySource,
  map,
  flatMap,
  flatMapDeep,
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
  keys,
  values,
  entries,
  pairs,
  fromPairs,
  range,
}

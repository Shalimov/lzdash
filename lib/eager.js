import { lazy } from './lazy'
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

const toEager = (fn, cplx = true) => (
  cplx ?
    (collection, ...args) => lazy(fn(...args))(collection) :
    lazy(fn)
)

export default {
  map: toEager(map),
  flatMap: toEager(flatMap),
  flatMapDeep: toEager(flatMapDeep),
  flatten: toEager(flatten, false),
  flattenDeep: toEager(flattenDeep, false),
  filter: toEager(filter),
  reject: toEager(reject),
  compact: toEager(compact, false),
  fromPairs: toEager(fromPairs, false),
  chunk: toEager(chunk),
  reduce: toEager(reduce),
  take: toEager(take),
  takeWhile: toEager(takeWhile),
  drop: toEager(drop),
  dropWhile: toEager(dropWhile),
  uniq: toEager(uniq, false),
  uniqBy: toEager(uniqBy),
  zip: toEager(zip),
  zipWith: toEager(zipWith),
  consecutive: toEager(consecutive, false),
  difference: toEager(difference),
  differenceBy: toEager(differenceBy),
  intersection: toEager(intersection),
  intersectionBy: toEager(intersectionBy),
  groupBy: toEager(groupBy),
  countBy: toEager(countBy),
  keys: toEager(keys, false),
  values: toEager(values, false),
  entries: toEager(entries, false),
}

# Welcome to API Docs

## **Functions:**
1. [lazy](/docs/api.md#lazy)
1. [map](/docs/api.md#map)
1. [flatMap](/docs/api.md#flatMap)
1. [flatMapDeep](/docs/api.md#flatMapDeep)
1. [flatten](/docs/api.md#flatten)
1. [flattenDeep](/docs/api.md#flattenDeep)
1. [consecutive](/docs/api.md#consecutive)
1. [intersection](/docs/api.md#intersection)
1. [intersectionBy](/docs/api.md#intersectionBy)
1. [difference](/docs/api.md#lazy)
1. [differenceBy](/docs/api.md#lazy)
1. [filter](/docs/api.md#lazy)
1. [reject](/docs/api.md#lazy)
1. [compact](/docs/api.md#lazy)
1. [reduce](/docs/api.md#lazy)
1. [take](/docs/api.md#lazy)
1. [takeWhile](/docs/api.md#lazy)
1. [drop](/docs/api.md#lazy)
1. [dropWhile](/docs/api.md#lazy)
1. [uniq](/docs/api.md#lazy)
1. [uniqBy](/docs/api.md#lazy)
1. [chunk](/docs/api.md#lazy)
1. [zip](/docs/api.md#lazy)
1. [zipWith](/docs/api.md#lazy)
1. [groupBy](/docs/api.md#lazy)
1. [countBy](/docs/api.md#lazy)
1. [keys](/docs/api.md#lazy)
1. [values](/docs/api.md#lazy)
1. [entries](/docs/api.md#lazy)
1. [fromPairs](/docs/api.md#lazy)
***
## **Sources:**
1. [range](/docs/api.md#lazy)
1. [repeat](/docs/api.md#lazy)
1. [generator](/docs/api.md#lazy)
1. [lazySource](/docs/api.md#lazy)

***

### **Lazy** [](#lazy)

`lz.lazy(...functions)`

Create a lazy pipeline of functions, kind of execution plan

**Params:** 
- Arglist\<Function> - functions should belong to lzdash lib

**Returns:** 
- Function - lazy-powered function

**Example**
```javascript
import lz from 'lzdash'

// lz.lazy creates a lazy pipeline
const emptyPipeline = lz.lazy()

emptyPipeline([1, 2, 3]) // [1, 2, 3]
emptyPipeline(1) // 1
emptyPipeline() // undefined

const pipeline = lz.lazy(
  lz.filter(v => v % 2 === 0),
  lz.map(v => v * 2)
)

pipeline([1, 2, 3, 4]) // [4, 8]
pipeline(undefined) // []
pipeline(null) // []
pipeline() // []
```
---
### **Map** [](#map)

`lz.map(iteratee)`

Creates an array of values by running each element in collection thru iteratee.

**Params:** 
- iteratee - transformation function

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.map(v => v * v)
)

pl([1, 2, 3]) // [1, 4, 9]
pl([2, 4, 8]) // [4, 16, 64]

pl(null) // []
pl(undefined) // []
```
---
### **Flat Map** [](#flatMap)

`lz.flatMap(iteratee)`

Creates a flattened array of values by running each element in collection thru iteratee and flattening the mapped results.

**Params:** 
- iteratee - transformation function

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.flatMap(v => [v * 2, v * 3])
)

pl([1, 2, 3]) // [2, 3, 4, 6, 6, 9]

pl(null) // []
pl(undefined) // []
```
---
### **Flat Map Deep** [](#flatMapDeep)

`lz.flatMapDeep(iteratee)`

This method is like [lz.flatMap](/docs/api.md#flatMap) except that it recursively flattens the mapped results.

**Params:** 
- iteratee - transformation function

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.flatMapDeep(v => [v, [v * 2, [v * 3]]])
)

pl([1, 2, 3]) // [1, 2, 3, 2, 4, 6, 3, 6, 9]

pl(null) // []
pl(undefined) // []
```
---
### **Flatten** [](#flatten)

`lz.flatten`

Flattens array a single level deep.

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(lz.flatten)

pl([1, [2, 3], [[4]]]) // [1, 2, 3, [4]]

pl(null) // []
pl(undefined) // []
```
---
### **Flatten Deep** [](#flattenDeep)

`lz.flattenDeep`

Recursively flattens array.

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(lz.flattenDeep)

pl([1, [2, 3], [[4]]]) // [1, 2, 3, 4]

pl(null) // []
pl(undefined) // []
```
---
### **Consecutive** [](#consecutive)

`lz.consecutive`

Groups a sequence into consecutive (overlapping) segments of a length of 2. If the underlying sequence has fewer elements than the specified length, then this sequence will be empty.

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(lz.consecutive)

pl([1, 2, 3, 4]) // [[1, 2], [2, 3], [3, 4]]

pl(null) // []
pl(undefined) // []
```
---
### **Intersection** [](#intersection)

`lz.intersection(arrayToCompare)`

Creates an array of unique values that are included in all given arrays using strict comparison `===` for equality comparisons. The order and references of result values are determined by the first array.

**Params:** 
- Array\<any> - array of values to compare

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.intersection([2, 3])
)

pl([1, 2, 3, 4]) // [2, 3]

pl(null) // []
pl(undefined) // []
```
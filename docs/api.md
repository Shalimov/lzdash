# Welcome to API Docs

## **Functions:**
1. [lazy](/docs/api.md#lazy)
1. [map](/docs/api.md#map)
1. [flatMap](/docs/api.md#flat-map)
1. [flatMapDeep](/docs/api.md#flat-map-deep)
1. [flatten](/docs/api.md#flatten)
1. [flattenDeep](/docs/api.md#flatten-deep)
1. [consecutive](/docs/api.md#consecutive)
1. [intersection](/docs/api.md#intersection)
1. [intersectionBy](/docs/api.md#intersection-by)
1. [difference](/docs/api.md#difference)
1. [differenceBy](/docs/api.md#difference-by)
1. [filter](/docs/api.md#filter)
1. [reject](/docs/api.md#reject)
1. [compact](/docs/api.md#compact)
1. [reduce](/docs/api.md#reduce)
1. [take](/docs/api.md#take)
1. [takeWhile](/docs/api.md#take-while)
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
## [**Caveats:**](/docs/api.md#caveats)

***

### **Lazy**
[](#lazy)

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
### **Map**
[](#map)

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
### **Flat Map**
[](#flat-map)

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
### **Flat Map Deep**
[](#flat-map-deep)

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
### **Flatten**
[](#flatten)

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
### **Flatten Deep**
[](#flatten-deep)

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
### **Consecutive**
[](#consecutive)

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
### **Intersection**
[](#intersection)

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
---
### **Intersection By**
[](#intersection-by)

`lz.intersectionBy(array, [iteratee=_.identity])`

This method is like [lz.intersection](/docs/api.md#intersection) except that it accepts iteratee which is invoked for each element of each arrays to generate the criterion by which they're compared. 

**Params:** 
- Array\<any> - array of values to compare
- iteratee - function that is used to extract value (usualy of transform key or etc...)

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.intersectionBy([{ x: 2 }, { x: 3 }], value => value.x)
)

pl([{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }]) // [{ x: 2 }, { x: 3 }]

pl(null) // []
pl(undefined) // []
```
---
### **Difference**
[](#difference)

`lz.difference(arrayToCompare)`

Creates an array of array values not included in the other given arrays using strict comparison `===` for equality comparisons. The order and references of result values are determined by the first array. 

**Params:** 
- Array\<any> - array of values to compare

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.difference([0, 1, 2, 3])
)

pl([1, 2, 3, 4, 5]) // [4, 5]

pl(null) // []
pl(undefined) // []
```
---
### **Difference By**
[](#difference-by)

`lz.differenceBy(arrayToCompare, [iteratee = identity])`

This method is like [lz.difference](/docs/api.md#difference) except that it accepts iteratee which is invoked for each element of array and values to generate the criterion by which they're compared.

**Params:** 
- Array\<any> - array of values to compare
- iteratee - function that is used to extract value (usualy of transform key or etc...)

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.differenceBy([{ x: 2 }, { x: 3 }], value => value.x)
)

pl([{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }]) // [{ x: 1 }, { x: 4 }]

pl(null) // []
pl(undefined) // []
```
---
### **Filter**
[](#filter)

`lz.filter(predicate)`

Iterates over elements of collection, returning an array of all elements predicate returns truthy for.

**Params:** 
- predicate - the function invoked per iteration.

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.filter(v => v % 2 === 0)
)

pl([1, 2, 3, 4, 5, 6]) // [2, 4, 6]

pl(null) // []
pl(undefined) // []
```
---
### **Reject**
[](#reject)

`lz.reject(predicate)`

The opposite of [lz.filter](/docs/api.md#filter); this method returns the elements of collection that predicate does not return truthy for.


**Params:** 
- predicate - the function invoked per iteration.

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.reject(v => v % 2 === 0)
)

pl([1, 2, 3, 4, 5, 6]) // [1, 3, 5]

pl(null) // []
pl(undefined) // []
```
---
### **Compact**
[](#compact)

`lz.compact`

Reject falsey values from result. The values false, null, 0, "", undefined, and NaN are falsey.

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(lz.compact)

pl([1, 0, 3, false, 5, NaN, '', 9, null, undefined, 1]) // [1, 3, 5, 9, 1]

pl(null) // []
pl(undefined) // []
```
---
### **Reduce**
[](#reduce)

`lz.reduce(iteratee, [accumulator])`

Reduces running each element thru iteratee, where each successive invocation is supplied the return value of the previous. If accumulator is not given, the first element of collection is used as the initial value.

**Params:**
- iteratee - function invoked per iteration.
- accumulator - initial value.


**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(lz.reduce((x, y) => x + y))

pl([1, 2, 3, 4, 5]) // 15

pl(null) // undefined
pl(undefined) // undefined
```
---
### **Take**
[](#take)

`lz.take(n)`

Takes `n` elements from the beginning and stop pipeline evaluation.

**Params:**
- n - items count to take

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.take(3)
)

pl([1, 2, 3, 4, 5]) // [1, 2, 3] - requires only 3 iterations

pl(null) // []
pl(undefined) // []
```
---
### **Take While**
[](#take-while)

`lz.takeWhile(predicate)`

Takes elements from the beginning and stop pipeline evaluation if predicate function returns falsey.

**Params:**
- predicate - function invoked per iteration

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.takeWhile(v => v < 3)
)

pl([1, 2, 3, 4, 5]) // [1, 2] - requires only 2 iterations

pl(null) // []
pl(undefined) // []
```
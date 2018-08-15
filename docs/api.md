# Welcome to API Docs

## [**Functions:**](/docs/api.md#funcs)
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
1. [drop](/docs/api.md#drop)
1. [dropWhile](/docs/api.md#drop-while)
1. [uniq](/docs/api.md#uniq)
1. [uniqBy](/docs/api.md#uniq-by)
1. [chunk](/docs/api.md#chunk)
1. [zip](/docs/api.md#zip)
1. [zipWith](/docs/api.md#zip-with)
1. [groupBy](/docs/api.md#group-by)
1. [countBy](/docs/api.md#count-by)
1. [keys](/docs/api.md#keys)
1. [values](/docs/api.md#values)
1. [entries](/docs/api.md#entries)
1. [fromPairs](/docs/api.md#from-pairs)
***
## [**Sources:**](/docs/api.md#sources)
1. [range](/docs/api.md#range)
1. [repeat](/docs/api.md#repeat)
1. [generator](/docs/api.md#generator)
<!-- 1. [lazySource](/docs/api.md#lazy) -->
***
## [**Caveats**](/docs/api.md#caveats)

***

## __Functions:__
[](#funcs)

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

`lz.intersectionBy(array, [iteratee = identity])`

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
---
### **Drop**
[](#drop)

`lz.drop(n)`

Drop first `n` elements from the beginning.

**Params:**
- n - items count to drop

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.drop(3)
)

pl([1, 2, 3, 4, 5]) // [4, 5]

pl(null) // []
pl(undefined) // []
```
---
### **Drop While**
[](#drop-while)

`lz.dropWhile(predicate)`

Drops elements from the beginning and retursn elements after predicate function returns first falsey.

**Params:**
- predicate - function invoked per iteration

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.dropWhile(v => v < 3)
)

pl([1, 2, 3, 4, 5]) // [3, 4, 5]

pl(null) // []
pl(undefined) // []
```
---
### **Uniq**
[](#uniq)

`lz.uniq`

Drops duplicates from flow, using strict equality, in which only the first occurrence of each element is kept. The order of result values is determined by the order they occur in the array.

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.uniq(v => v < 3)
)

pl([1, 2, 3, 2, 1, 4]) // [1, 2, 3, 4]

pl(null) // []
pl(undefined) // []
```
---
### **Uniq By**
[](#uniq-by)

`lz.uniqBy(iteratee)`

This method is like [lz.uniq](/docs/api.md#uniq) except that it accepts iteratee which is invoked for each element in sequence to generate the criterion by which uniqueness is computed. The order of result values is determined by the order they occur in the array. 

**Params:**
- iteratee - function invoked per iteration

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.uniqBy(item => item.name)
)

pl([
  { name: 'Sam' },
  { name: 'Mary' },
  { name: 'Sam' },
  { name: 'Raul' },
]) // [{ name: 'Sam' }, { name: 'Mary' }, { name: 'Raul' }]

pl(null) // []
pl(undefined) // []
```
---
### **Chunk**
[](#chunk)

`lz.chunk(n)`

Splits flow's elements into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.

**Params:**
- n - length of each chunk

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.chunk(2)
)

pl([1, 2, 3, 4, 5]) // [[1, 2], [3, 4], [5]]

pl(null) // []
pl(undefined) // []
```
---
### **Zip**
[](#zip)

`lz.zip(source)`

Creates grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on

**Params:**
- source - sequence source

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const indexSource = lz.range(0) // creates an infinite repeater starts from 0 and goes to Infinity
const withIndicies = lz.zip(indexSource)

const pl = lz.lazy(
  withIndicies,
)

pl([1, 2, 3, 4, 5]) // [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]]

const pl1 = lz.lazy(
  withIndicies,
  lz.map(([value, index]) => value * index)
)

pl1([1, 2, 3, 4, 5]) // [0, 2, 6, 12, 20]

const pl2 = lz.lazy(
  lz.zip(['a', 'b', 'c'])
)

pl([1, 2, 3, 4, 5]) // [[1, 'a'], [2, 'b'], [3, 'c'], [4, undefined], [5, undefined]]
```
---
### **Zip With**
[](#zip-with)

`lz.zipWith(source, [iteratee = identity])`

This method is like [lz.zip](/docs/api.md#zip) except that it accepts iteratee to specify how grouped values should be combined. The iteratee is invoked with the elements of each group: (...group).

**Params:**
- source - sequence source
- iteratee - function to combine grouped values

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const indexSource = lz.repeat(0) // creates an infinite repeater starts from 0 and goes to Infinity

const pl = lz.lazy(
  lz.zipWith(indexSource, ((value, index) => value - index))
)

pl([1, 2, 3, 4, 5]) // [1, 1, 1, 1, 1]
```
---
### **Group By**
[](#group-by)

`lz.groupBy([iteratee = identity])`

Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The order of grouped values is determined by the order they occur in collection. The corresponding value of each key is an array of elements responsible for generating the key.

**Params:**
- iteratee - iteratee to transform keys

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.groupBy((item) => item.key)
)

pl([
  { key: 'a', name: 'java' },
  { key: 'a', name: 'c++' },
  { key: 'b', name: 'ruby' },
  { key: 'c', name: 'silversight' },
])
/*
{
  a: [{ key: 'a', name: 'java' }, { key: 'a', name: 'c++' }],
  b: [{ key: 'b', name: 'ruby' }],
  c: [{ key: 'c' }, { name: 'silversight' }]
}
*/
```
---
### **Count By**
[](#count-by)

`lz.countBy([iteratee = identity])`

Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the number of times the key was returned by iteratee.

**Params:**
- iteratee - iteratee to transform keys

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.countBy((item) => item.key)
)

pl([
  { key: 'a', name: 'java' },
  { key: 'a', name: 'c++' },
  { key: 'b', name: 'ruby' },
  { key: 'c', name: 'silversight' },
])
/*
{
  a: 2,
  b: 1,
  c: 1
}
*/
```
---
### **Keys**
[](#keys)

`lz.keys`

Creates flow based on passed object's keys to pass it down thru pipeline

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(lz.keys)

pl({ a: 1, b: 2, c: 3 }) // ['a', 'b', 'c']
```
---
### **Values**
[](#values)

`lz.values`

Creates flow based on passed object's values to pass it down thru pipeline

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(lz.values)

pl({ a: 1, b: 2, c: 3 }) // [1, 2, 3]
```
---
### **Entries**
[](#entries)

`lz.entries`

Creates flow based on passed object's [key, value] entries to pass it down thru pipeline

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(lz.entries)

pl({ a: 1, b: 2, c: 3 }) // [['a', 1], ['b', 2], ['c', 3]]
```
---
### **From Pairs**
[](#from-pairs)

`lz.fromPairs`

Method returns an object composed from key-value pairs ([k, v] pair as an example)

**Returns:** 
- Function - that should be consumed by [lz.lazy](/docs/api.md#lazy) | [lz.lazySource](/docs/api.md#lazySource) 

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.entries,
  lz.map(([key, value]) => [key, value * 2]),
  lz.fromPairs
)

pl({ a: 1, b: 2, c: 3 }) // { a: 2, b: 4, c: 6 }


const pl1 = lz.lazy(lz.fromPairs)

pl1([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
```

***

## __Sources:__
[](#sources)

### **Range**
[](#range)

`lz.range(start, [end = Infinity], [step = 1])`

Create a lazy source to produce potentially inifinte sequences

**Params:** 
- start - start of the range
- end - end of the range, exclusive
- step - distance between current and next value in range

**Returns:** 
- Function - lazy-source

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(
  lz.take(5)
)

pl(lz.range(1, Infinity)) // [1, 2, 3, 4, 5]
pl(lz.range(1, Infinity, 2)) // [1, 3, 5, 7, 9]
pl(lz.range(1, 3)) // [1, 2]

pl(lz.range(1, -3)) // [1, 0, -1, -2]
pl(lz.range(0, -Infinity)) // [0, -1, -2, -3, -4]

const withIndex = lz.zip(lz.range(0))

const pl1 = lz.lazy(
  withIndex,
  lz.map(([value, index]) => value * index)
)

pl1(lz.range(1)) // [0, 2, 6, 12, 20]
```
---

### **Repeat**
[](#repeat)

`lz.range(what, [count = Infinity])`

Create a lazy source to produce potentially inifinte sequences

**Params:** 
- what - something to repeat
- count - count of times to repeat

**Returns:** 
- Function - lazy-source

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(lz.take(5))

pl(lz.repeat('hi')) // ['hi', 'hi', 'hi', 'hi', 'hi']

const pl1 = lz.lazy(
  lz.zip(lz.range('abc'))
  lz.take(3)
)

pl1(lz.range(1)) // [[1, 'abc'], [2, 'abc'], [3, 'abc']]
```
---

### **Generator**
[](#generator)

`lz.generator(genFunc, [count = Infinity])`

Create a lazy source to produce potentially inifinte sequences

**Params:** 
- genFunc - value producer, has one argument (index of iteration)
- count - count of times to repeat

**Returns:** 
- Function - lazy-source

**Example**
```javascript
import lz from 'lzdash'

const pl = lz.lazy(lz.take(5))

pl(lz.generator(Math.random)) // five random numbers

const pl1 = lz.lazy(
  lz.zip(lz.generator(() => 'abc'), 2)
  lz.take(3)
)

pl1(lz.range(1)) // [[1, 'abc'], [2, 'abc'], [3, undefined]]
```
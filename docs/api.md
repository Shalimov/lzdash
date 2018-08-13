# Welcome to API Docs

## **Functions:**
1. [lazy](/docs/api.md#lazy)
1. [map](/docs/api.md#lazy)
1. [flatMap](/docs/api.md#lazy)
1. [flatMapDeep](/docs/api.md#lazy)
1. [flatten](/docs/api.md#lazy)
1. [flattenDeep](/docs/api.md#lazy)
1. [consecutive](/docs/api.md#lazy)
1. [intersection](/docs/api.md#lazy)
1. [intersectionBy](/docs/api.md#lazy)
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
Create a lazy pipeline of functions, kind of execution plan
```javascript
import lz from 'lzdash'

// lz.lazy creates a lazy pipeline
const emptyPipeline = lz.lazy()

console.log(
  emptyPipeline([1, 2, 3]), // [1, 2, 3]
  emptyPipeline(1), // 1
  emptyPipeline(), // undefined
)


const pipeline = lz.lazy(
  lz.filter(v => v % 2 === 0),
  lz.map(v => v * 2)
)

console.log(
  pipeline([1, 2, 3, 4]), // [4, 8]
  pipeline(undefined), // []
  pipeline(null), // []
  pipeline(), // []
)
```
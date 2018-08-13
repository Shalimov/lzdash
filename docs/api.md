# Welcome to API Docs

## **Functions:**
1. [lazy](/api.md#lazy)
1. [map](/api.md#lazy)
1. [flatMap](/api.md#lazy)
1. [flatMapDeep](/api.md#lazy)
1. [flatten](/api.md#lazy)
1. [flattenDeep](/api.md#lazy)
1. [consecutive](/api.md#lazy)
1. [intersection](/api.md#lazy)
1. [intersectionBy](/api.md#lazy)
1. [difference](/api.md#lazy)
1. [differenceBy](/api.md#lazy)
1. [filter](/api.md#lazy)
1. [reject](/api.md#lazy)
1. [compact](/api.md#lazy)
1. [reduce](/api.md#lazy)
1. [take](/api.md#lazy)
1. [takeWhile](/api.md#lazy)
1. [drop](/api.md#lazy)
1. [dropWhile](/api.md#lazy)
1. [uniq](/api.md#lazy)
1. [uniqBy](/api.md#lazy)
1. [chunk](/api.md#lazy)
1. [zip](/api.md#lazy)
1. [zipWith](/api.md#lazy)
1. [groupBy](/api.md#lazy)
1. [countBy](/api.md#lazy)
1. [keys](/api.md#lazy)
1. [values](/api.md#lazy)
1. [entries](/api.md#lazy)
1. [fromPairs](/api.md#lazy)
***
## **Sources:**
1. [range](/api.md#lazy)
1. [repeat](/api.md#lazy)
1. [generator](/api.md#lazy)
1. [lazySource](/api.md#lazy)

***

### **Lazy**

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
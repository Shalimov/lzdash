# Explanation


In programming language theory, lazy evaluation, or call-by-need is an evaluation strategy which delays the evaluation of an expression until its value is needed (non-strict evaluation) and which also avoids repeated evaluations (sharing). The sharing can reduce the running time of certain functions by an exponential factor over other non-strict evaluation strategies, such as call-by-name.

The benefits of lazy evaluation include:

- The ability to define control flow (structures) as abstractions instead of primitives.
- The ability to define potentially infinite data structures. This allows for more straightforward implementation of some algorithms.
- Performance increases by avoiding needless calculations, and error conditions in evaluating compound expressions.
- Lazy evaluation is often combined with memoization.
- Lazy evaluation can lead to reduction in memory footprint, since values are created when needed

Let's review how it `lzdash` works by example:
Assume we have a plan to get all even numbers from array and then multiply each by 2.

Here is the code to do it:
```javascript
import lz from 'lzdash'

const pipelineFunc = lz.lazy(
  lz.filter(v => v % 2 === 0),
  lz.map(v => v * 2)
)
```

Want to draw your attention to `lz.lazy` function which composes our `filter` and `map` into one function (similar to `fp.flow` from **lodash/fp**); `lz.lazy` contains all magic inside, it doesn't matter how many functions you pass to compose, `lz.lazy` always add extra function to transform passing param into __lazy source__ by using __source provider__.

**Example:**

![Pipeline function initialization](/docs/img/first-step.jpeg "lz.lazy")

**But what is source provider and lazy source itself?**  
- __source provider__ is function that creates lazy source from collection
- __lazy source__ is a function that returns inner collection's items one by one, e.g:
```javascript
// under the hood it works smarter but in matter of explanation I simplify source provider
const END_OF_SOURCE = 'EOS'

const createArrayLazySource = (simpleArray) => {
  const index = 0 // closure helps us to save collection index

  return () => {
    if (simpleArray.length > index) {
      return simpleArray[index++]
    }

    return END_OF_SOURCE
  }
}

const lzSource = createArrayLazySource([1, 2])

console.log(
  lzSource(), // 1
  lzSource(), // 2
  lzSource(), // EOS
  lzSource(), // EOS
  lzSource(), // EOS
)

```

`createArrayLazySource` produces our lazy source function that gives collection elements one by one for
each call and increments index value inside, if we exceed end of array it starts to return __EOS__ no matter how many times you invoke lazy source.

**Bottom line**: `sourceProvide` aim is to prepare data to be consumed by other function in the pipeline. It is injected implicitly into pipeline.

---
Explanation to be continued
![Pipeline function evaluation](/docs/img/sec-step.jpeg "pl([1,2,3,4,5,6,7,8,9,10,11])")

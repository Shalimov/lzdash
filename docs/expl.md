# Explanation


In programming language theory, lazy evaluation, or call-by-need is an evaluation strategy which delays the evaluation of an expression until its value is needed (non-strict evaluation) and which also avoids repeated evaluations (sharing). The sharing can reduce the running time of certain functions by an exponential factor over other non-strict evaluation strategies, such as call-by-name.

The benefits of lazy evaluation include:

- The ability to define control flow (structures) as abstractions instead of primitives.
- The ability to define potentially infinite data structures. This allows for more straightforward implementation of some algorithms.
- Performance increases by avoiding needless calculations, and error conditions in evaluating compound expressions.
- Lazy evaluation is often combined with memoization.
- Lazy evaluation can lead to reduction in memory footprint, since values are created when needed

Let's review how `lzdash` works by example:
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

---
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

**Bottom line**: `sourceProvider`'s aim is to prepare data to be consumed by other function in the pipeline. It is injected implicitly into pipeline.

---
Seems we're ready to go ahead, let's review the code below, here we added invocation of `pipelineFunc` and print the result.
```javascript
import lz from 'lzdash'

const pipelineFunc = lz.lazy(
  lz.filter(v => v % 2 === 0),
  lz.map(v => v * 2)
)

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const result = pipelineFunc(data)

console.log(result) // [4, 8, 12, 16, 20]
```

Let's check the diagramm below:

![Pipeline function evaluation](/docs/img/sec-step.jpeg "pl([1,2,3,4,5,6,7,8,9,10,11])")

First off, note that `pipelineFunc` has reversed order of passed funcs inside (it starts from __map__ and goes down to __source provider__).
All main magic has been explained by the diagram below. 
Let me shed a light here:

1. inside we invoke `map` function, under the hood it works with `arg()` function instead of real values (cuz real values should go thru pipeline chain before `map` consumes it)
2. in this particular case `arg()` from `map` invokes `filter`
3. then `filter` requests real value from `lazy source`
4. after `filter` gets real value, it checks whether value fits to condition
5. if value fits then `filter` returns control to map (back to step 1) with evaluated value, else (back to step 3)
6. if value `lazy source` returns `END_OF_SOURCE` then we stop evaluation
and returns the result

__Example:__
```javascript

const sourceProvider = createArrayLazySource

const simpleLazy = (fnmap, fnfilter) => {
  return (dataArray) => {
    let result = []
    let value = null

    const lazySource = sourceProvider(dataArray)
    const filterSource = fnfilter(lazySource)
    const mapFilterSource = fnmap(filterSource)

    do {
      value = mapFilterSource()
      
      if (value === EOS) break

      result.push(value)
    } while(value !== EOS)

    return result
  }
}

const simpleFilter = (predicate) => {
  return (argFunction) => {
    return () => {
      const realValue = argFunction() // it invokes lazySource here
      ....implementation....
    }
  }
}

const simpleMap = (iteratee) => {
  return (argFunction) => {
    return () => {
      const realValue = argFunction() // it invokes filter here
      return realValue === EOS ? EOS : iteratee(realValue)
    }
  }
}

const pl = simpleLazy(
  simpleFilter(v => v % 2 === 0),
  simpleMap(v => v * 2)
)

console.log(
  pl([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
)

```

Hope it helps you to understand the basics how it works. The section shows intentionally simplified details of implementation but the main gist is revealed.
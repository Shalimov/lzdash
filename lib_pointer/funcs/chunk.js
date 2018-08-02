import { inferArray } from '../inference.js'
import { next, arg } from '../utils.js'

const chunk = n => inferArray((value, state) => {
  const buffer = state.get(chunk.name) || []
  
  buffer.push(value)

  if (buffer.length < n) {
    state.set(chunk.name, buffer)
    return arg()
  }

  state.set(chunk.name, [])
  return next(buffer)
})


export {
  chunk
}
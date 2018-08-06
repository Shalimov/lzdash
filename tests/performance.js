/* eslint-disable */

const fp = require('lodash/fp')
const lz = require('../dist/dist')

const data = fp.times((i) => i + 1, 1000000)
const noop = () => { }

const meter = ({ run, beforeRun = noop, afterRun = noop }) => {
  const brresult = beforeRun()

  const start = process.hrtime.bigint()
  const result = run(brresult)
  const end = process.hrtime.bigint()

  afterRun(result)

  return `${Number(end - start) / 10 ** 9} sec.`
}

// Lo_DASH
console.log(meter({
  beforeRun: () => fp.flow(
    fp.filter(v => v % 2 === 0),
    fp.map(v => v * 2),
    fp.groupBy(v => v)
  ),
  run: lo => lo(data),
  afterRun: (rs) => {
    // console.log(rs)
  }
}))

// Lazier
console.log(meter({
  beforeRun: () => lz.lazy(
    lz.filter(v => v % 2 === 0),
    lz.map(v => v * 2),
    lz.groupBy(v => v)
  ),
  run: lz => lz(data),
  afterRun: (rs) => {
    // console.log(rs)
  }
}))
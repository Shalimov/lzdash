/* eslint-disable */

const fp = require('lodash/fp')
const lz = require('../dist/dist')

const noop = () => { }

const meter = ({ run, beforeRun = noop, afterRun = noop }) => {
  const brresult = beforeRun()

  const start = process.hrtime.bigint()
  const result = run(brresult)
  const end = process.hrtime.bigint()

  afterRun(result)

  return `${Number(end - start) / 10 ** 9} sec.`
}

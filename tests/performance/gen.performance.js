/* eslint-disable */

const fs = require('fs-extra')
const { plans } = require('./plans')

const lib = process.argv[2]
const funcPlan = plans[lib]

if (!funcPlan) {
  throw new Error('plan is incorrect ' + lib)
}

const meter = (fn, arg) => {
  const start = process.hrtime.bigint()
  const result = fn(arg)
  const end = process.hrtime.bigint()

  // console.log(result.length)

  return Number(end - start) / 10 ** 9
}

const report = () => {
  const reps = []

  for (let [libf, op, simpleValueSets] of funcPlan) {
    const reportMap = {
      [op]: {}
    }

    for (let values of simpleValueSets) {
      const libft = meter(libf, values)

      reportMap[op][`${values.length} set`] = libft
    }

    reps.push(reportMap)
  }

  return reps
}

fs.writeJson(`./tests/reports/${lib}.json`, report())
  .then(() => process.exit(0), () => process.exit(0))
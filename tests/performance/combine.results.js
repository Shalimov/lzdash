/* eslint-disable */

const fs = require('fs-extra')

const lodashReport = require('../reports/lodash.json')
const lzdashReport = require('../reports/lzdash.json')

const combinedReport = () => {
  const result = []

  for (let i = 0; i < lodashReport.length; i += 1) {
    result.push(Object.keys(lodashReport[i]).reduce((combinedReport, operation) => {
      const ldOp = lodashReport[i][operation]
      const lzOp = lzdashReport[i][operation]

      const opCombReport = Object.keys(ldOp).reduce((opReport, vset) => {
        const ldSetResult = ldOp[vset]
        const lzSetResult = lzOp[vset]

        opReport[vset] = {
          'lodash/fp': `${ldSetResult} sec.`,
          'lzdash': `${lzSetResult} sec.`,
          'fastest': lzSetResult < ldSetResult ?
            `lzdash fastest x${ldSetResult / lzSetResult}` :
            `lodash/fp fastest x${lzSetResult / ldSetResult}`,
        }

        return opReport
      }, {})

      combinedReport[operation] = opCombReport
      return combinedReport
    }, {}))
  }

  return result
}

fs.writeJson('./tests/reports/combined.json', combinedReport())
  .then(() => process.exit(0), () => process.exit(0))

const fp = require('lodash/fp')
const lz = require('../dist/dist')

const runSequences = [
  {
    fp: fp.flow(
      
    ),
    lz: lz.lazy(

    ),
  },
]

const sets = [
  10 * 1,
  10 * 2,
  10 * 3,
  10 * 4,
  10 * 5,
  10 * 6,
  10 * 7,
]

const lzgen = lz.lazy(lz.zipWith(lz.repeat(runSequences[0])))

lzgen(sets)



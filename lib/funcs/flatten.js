import { flatMap, flatMapDeep } from './map'

export const flatten = flatMap(v => v)
export const flattenDeep = flatMapDeep(v => v)

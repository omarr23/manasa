import { mergeWith, isUndefined } from 'lodash'

export const setDefaults = <T>(obj: T, objDefaults: T): T => {
  return mergeWith({}, objDefaults, obj, (o, s) => (isUndefined(s) ? o : s))
}
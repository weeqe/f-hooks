export const isFunction  = (value: unknown): value is Function => typeof value === 'function'
export const isString = (value: unknown): value is String => typeof value === 'string'
export const isUndef = (value: unknown): value is undefined => typeof value === 'undefined'
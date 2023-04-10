export const getType = (value) => {
  return typeof value
}
export const isString = (value) => {
  return getType(value) === 'string'
}
export const isNumber = (value) => {
  return getType(value) === 'number' && !isNaN(value) && isFinite(value)
}
export const isBoolean = (value) => {
  return getType(value) === 'boolean'
}
export const isArray = (value) => {
  return Array.isArray(value)
}
export const isNotEmptyArray = (value) => {
  return Boolean(isArray(value) && value.length)
}
export const isObject = (value) => {
  return typeof value === 'object' && !isArray(value) && value !== null
}
export const hardObjectToSimple = (obj) => {
  let simpleObj = { ...obj }
  for (const simpleObjKey in simpleObj) {
    if (isObject(simpleObj[simpleObjKey])) {
      simpleObj = {
        ...simpleObj,
        ...hardObjectToSimple(simpleObj[simpleObjKey])
      }
    }
  }
  return simpleObj
}

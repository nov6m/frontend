import { isNotEmptyArray } from '@/core/utils/type'

export const getArrayCoords = (coordinates, coordsField = 'coords') => {
  if (!isNotEmptyArray(coordinates)) {
    return [null, null]
  }
  const coords = []
  coordinates.forEach((item) => {
    coords.push(getCoordsFromString(item[coordsField]))
  })
  return coords
}
export const getCenter = (coordinates, coordsField = 'coords') => {
  if (!isNotEmptyArray(coordinates)) {
    return [null, null]
  }
  const coords = getArrayCoords(coordinates, coordsField)
  if (coords.length > 1) {
    let x = 0
    let y = 0
    coords.forEach((el) => {
      el = el.toString().split(',')
      x += +el[0]
      y += +el[1]
    })
    x = +(x / coords.length).toFixed(6)
    y = +(y / coords.length).toFixed(6)
    return [x, y]
  }
  return coords[0]
}
export const getCoordsFromString = (coords) => {
  if (typeof coords === 'string') {
    return coords.split(', ').map((el) => +el)
  }
  return [null, null]
}

export const getGroupsIcon = (groups, type) => {
  return groups.find((el) => el.name === type).image
}

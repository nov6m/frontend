import { isNotEmptyArray } from '@/core/utils/type'

export default (groups) => {
  const clustersObj = {}
  if (isNotEmptyArray(groups)) {
    groups.forEach((el) => {
      if (el.name === 'all') {
        return
      }
      clustersObj[el.cluster] = {
        clusterNumbers: [100],
        clusterIconContentLayout: `<div style="display: flex; align-items: center; justify-content: center; background-color: ${el.color}; border-radius: 100%; color: #fff; font-weight: 600;">$[properties.geoObjects.length]</div>`,
        clusterIcons: [
          {
            size: [40, 40],
            offset: [-20, -20]
          }
        ]
      }
    })
  }
  return clustersObj
}

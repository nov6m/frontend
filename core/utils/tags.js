function getFormat(val, format = 'number') {
  if (format === 'number') {
    return new Intl.NumberFormat('ru-RU').format(val)
  } else {
    return val
  }
}
export const getNewDataForRemove = (tag, requestData) => {
  const newParamData = [...requestData[tag.param]]
  newParamData.splice(
    newParamData.indexOf(isNaN(tag.key) ? tag.key : +tag.key),
    1
  )
  return newParamData
}
export const getNewDataForRemoveRange = (tag, requestData) => {
  return tag.changeMin
    ? [tag.min, requestData[tag.param][1]]
    : [requestData[tag.param][0], tag.max]
}
export const getTags = (filters) => {
  const tags = []
  filters.forEach((filter) => {
    if (
      ['checkbox', 'color', 'select'].includes(filter.type) &&
      !filter.tags_ignore &&
      !filter.disabled
    ) {
      filter.values.forEach((group) => {
        group.values.forEach((e) =>
          e.checked
            ? tags.push({
                type: filter.type,
                key: typeof e.key === 'string' ? e.key.toLowerCase() : e.key,
                name: e.value,
                title: e.name ? e.name : '',
                param: filter.name,
                group_name: group.group_name
              })
            : ''
        )
      })
    }
    if (filter.type === 'range' && !filter.tags_ignore && !filter.disabled) {
      if (filter.values.min !== filter.values.range[0]) {
        tags.push({
          name:
            'от ' +
            getFormat(filter.values.range[0], filter.values.format) +
            ` ${filter.values.postfix}`,
          type: filter.type,
          param: filter.name,
          changeMin: true,
          min: filter.values.min,
          max: filter.values.max,
          range: filter.values.range
        })
      }
      if (filter.values.max !== filter.values.range[1]) {
        tags.push({
          name:
            'до ' +
            getFormat(filter.values.range[1], filter.values.format) +
            ` ${filter.values.postfix}`,
          type: filter.type,
          param: filter.name,
          changeMin: false,
          min: filter.values.min,
          max: filter.values.max,
          range: filter.values.range,
          id: filter.id
        })
      }
    }
  })
  return tags
}
export const getNameRooms = (count, isStudio) => {
  const countRooms = +count

  switch (countRooms) {
    case 1:
      return isStudio ? 'Студия' : 'Однокомнатная'
    case 2:
      return 'Двухкомнатная'
    case 3:
      return 'Трёхкомнатная'
    case 4:
      return 'Четырёхкомнатная'
    default:
      return `${countRooms} комнатная`
  }
}
export const applyModifiersToString = (str) => {
  if (str) {
    let formattedStr = str.split(/[\]\\[]/g)
    formattedStr = formattedStr.map((el) => {
      if (el.includes('|')) {
        const splitPart = el.split('|')
        let updatedPart = splitPart.shift()
        splitPart.forEach((el) => {
          if (el.toLowerCase() === 'n') {
            updatedPart = new Intl.NumberFormat('ru-RU')
              .format(+updatedPart)
              .replace(',', '.')
          }
          if (el.toLowerCase() === 'l') {
            updatedPart = updatedPart.toLowerCase()
          }
          if (el.toLowerCase() === 'u') {
            updatedPart = updatedPart.toUpperCase()
          }
          if (el.toLowerCase() === 'a') {
            const nameData = updatedPart.split(';')
            updatedPart =
              getNameRooms(nameData[0], nameData[1] === 'True') +
              (nameData[1] === 'False' ? ' квартира' : '')
          }
        })
        return updatedPart
      }
      return el
    })
    return formattedStr.join('')
  }
  return str
}

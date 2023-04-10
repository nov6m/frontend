export const getQuarterFromDate = (date) => {
  const quarter = Math.floor((new Date(date).getMonth() + 3) / 3)
  if (quarter === 1) {
    return 'I'
  }
  if (quarter === 2) {
    return 'II'
  }
  if (quarter === 3) {
    return 'III'
  }
  return 'IV'
}
export const getMonthNameFromDate = (date) => {
  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
  return monthNames[new Date(date).getMonth()]
}

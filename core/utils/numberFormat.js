import { WORDS_BY_NUMBER } from '@/core/constants'
import { isArray } from '@/core/utils/type'

export const ruFormat = (number, options = {}) => {
  return (
    (options?.prefix || '') +
    new Intl.NumberFormat('ru-RU').format(parseInt(number, 10).toFixed(0)) +
    (options?.postfix || '')
  )
}
export const formatNumber = (number, { fixed, precision, prefix, postfix }) => {
  if (isNaN(number)) {
    return number
  }
  let formattedNumber = +number
  formattedNumber = formattedNumber.toFixed(precision || 0)
  if (!fixed) {
    formattedNumber = parseFloat(formattedNumber)
  }

  return (prefix || '') + formattedNumber + (postfix || '')
}
export const isLastOddElem = (items, i) => {
  return items.length - 1 === i && items.length % 2 !== 0
}

export const removeTags = (number) => {
  return String(number).replace(/[\\()_\-\s+]*/g, '')
}

export const formatPhoneNumber = (number) => {
  const formatPhone = number.replace(/\D/g, '')
  if (formatPhone[0] === '8') {
    formatPhone.replace('8', '7')
  }
  return formatPhone
}

export const wordByNumber = (n, param) => {
  if (isArray(WORDS_BY_NUMBER[param]) && WORDS_BY_NUMBER[param].length >= 3) {
    n = Math.abs(n) % 100
    const n1 = n % 10
    if (n > 10 && n < 20) {
      return WORDS_BY_NUMBER[param][2]
    }
    if (n1 > 1 && n1 < 5) {
      return WORDS_BY_NUMBER[param][1]
    }
    if (n1 === 1) {
      return WORDS_BY_NUMBER[param][0]
    }
    return WORDS_BY_NUMBER[param][2]
  }
  console.error(`${param} not found in WORDS_BY_NUMBER`)
  return ''
}
export const getPricePerSquare = (price, square) => {
  return (price / square).toFixed(0)
}
export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export const getFileSize = (size) => {
  const fSExt = ['Байт', 'КБ', 'МБ', 'ГБ']
  let i = 0
  while (size > 900) {
    size /= 1024
    i++
  }
  return Math.round(size * 100) / 100 + ' ' + fSExt[i]
}

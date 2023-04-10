import {
  FAKE_HOST,
  DIVIDER_FILTER_PARAM,
  PRIMITIVE_PARAM_NAMES
} from '@/core/constants'
import { isNumber, isNotEmptyArray } from '@/core/utils/type'

export const getUrlParam = (url, param) => {
  const urlObj = new URL(FAKE_HOST + url)
  return urlObj.searchParams.get(param) || ''
}

export const checkEqualityUrlByParam = (url, paramName, paramValue) => {
  return getUrlParam(url, paramName) === paramValue.toLowerCase()
}

export const syncHash = (query) => {
  const params = {}
  for (const elem in query) {
    if (PRIMITIVE_PARAM_NAMES.includes(elem)) {
      params[elem] = isNumber(+query[elem])
        ? Number(query[elem])
        : String(query[elem])
    } else {
      params[elem] = [
        ...new Set(
          query[elem]
            .split(DIVIDER_FILTER_PARAM)
            .map((item) =>
              isNumber(+item) ? Number(item) : String(item).toLowerCase()
            )
        )
      ]
    }
  }
  return params
}

export const getActiveTabByUrl = (tabs, path) => {
  let activeTab = tabs.find((item) =>
    checkEqualityUrlByParam(path, 'type', item.type)
  )
  if (!activeTab && isNotEmptyArray(tabs)) {
    activeTab = tabs[0]
  }
  return activeTab
}

export const getFileTypeFromUrl = (url) => {
  return url.split('.').pop()
}

export const removeLastSymbol = (string, symbol) => {
  if (string[string.length - 1] === symbol && string.length > 1) {
    return string.slice(0, -1)
  }
  return string
}
export const getCurrentHref = () => {
  if (process.client) {
    return window.location.href
  }
  return ''
}

export const saveUTMLabels = () => {
  if (process.client) {
    const location = window.location.href
    const url = new URL(location)
    const utm = {
      utm_source: url.searchParams.get('utm_source') || undefined,
      utm_medium: url.searchParams.get('utm_medium') || undefined,
      utm_campaign: url.searchParams.get('utm_campaign') || undefined,
      utm_content: url.searchParams.get('utm_content') || undefined,
      utm_term: url.searchParams.get('utm_term') || undefined
    }
    for (const utmKey in utm) {
      if (utm[utmKey]) {
        sessionStorage.setItem(utmKey, utm[utmKey])
      }
    }
  }
}

export const getUTMLabels = () => {
  if (process.client) {
    const location = window.location.href
    const url = new URL(location)
    return {
      utm_source: sessionStorage.getItem('utm_source') || undefined,
      utm_medium: sessionStorage.getItem('utm_medium') || undefined,
      utm_campaign: sessionStorage.getItem('utm_campaign') || undefined,
      utm_content: sessionStorage.getItem('utm_content') || undefined,
      utm_term: sessionStorage.getItem('utm_term') || undefined
    }
  }
  return {}
}

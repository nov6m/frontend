import Api from '@/core/Api'
import { getTags } from '@/core/utils/tags'
import { getUrlParam } from '@/core/utils/url'

export const state = () => ({
  loading: false,
  requestData: {},
  activeTab: {},
  tabs: [],
  filters: [],
  topFilter: {},
  sorting: [],
  info: {},
  items: {},
  page: 1
})

export const getters = {
  requestData: (state) => state.requestData,
  countItems: (state) => state.info?.cars_count,
  sorting: (state) => state.sorting,
  items: (state) => state.items?.data || [],
  itemsType: (state) => state.items.type,
  loading: (state) => state.loading,
  tabs: (state) => state.tabs,
  activeTab: (state) => state.activeTab,
  filters: (state) => state.filters,
  topFilter: (state) => state.topFilter,
  info: (state) => state.info,
  page: (state) => state.page,
  openedFilterNames: (state) => {
    const namesArray = []
    ;(state.filters || []).forEach((el) => {
      if (el.opened) {
        namesArray.push(el.name)
      }
    })
    return namesArray
  },
  tags(state) {
    return getTags(state.filters)
  }
}

export const mutations = {
  SET_LOADING(state, val) {
    state.loading = val
  },
  SET_REQUEST_DATA(state, data) {
    state.requestData = { ...state.requestData, ...data }
  },
  RESET_REQUEST_DATA(state) {
    state.requestData = { view: state.requestData.view }
  },
  REMOVE_KEY_FROM_REQUEST_DATA(state, key) {
    delete state.requestData[key]
  },
  UPDATE_FILTER_BY_INDEX(state, { index, item }) {
    state.filters.splice(index, 1, item)
  },
  SET_ACTIVE_TAB(state, tab) {
    state.activeTab = tab
  },
  SET_TABS(state, data) {
    state.tabs = data
    state.activeTab = state.tabs.find((elem) => elem.active)
  },
  SET_FILTERS(state, data) {
    state.filters = data
  },
  SET_TOP_FILTER(state, data) {
    state.topFilter = data
  },
  SET_ITEMS(state, items) {
    state.items = items
  },
  SET_SORTING(state, data) {
    state.sorting = data
  },
  SET_INFO(state, data) {
    state.info = data
  },
  SET_PAGE_URL(state, url) {
    if (process.client) {
      history.pushState(
        '',
        'data.seo.title',
        `${location.pathname}?${url || ''}`
      )
    }
  },
  SET_PAGE(state, page) {
    state.page = page
  }
}

export const actions = {
  async initTabs({ commit }) {
    const data = await Api.getFilterTabs()
    if (data) {
      commit('SET_TABS', data)
    }
  },
  async updateData({ commit, getters }, settings) {
    if (!settings.offLoading) {
      commit('SET_LOADING', true)
    }
    const currentTab = getters.activeTab
    const openedFilters = getters.openedFilterNames
    const requestData = {
      type: currentTab?.type || 'items',
      view: 'model',
      ...getters.requestData
    }
    if (openedFilters.length) {
      requestData.opened = openedFilters
    }
    const data = await Api.getFilterData(1, requestData)
    if (data) {
      commit('SET_FILTERS', data.filters)
      commit('SET_TOP_FILTER', data.top_filter)
      commit('SET_ITEMS', data.cars)
      commit('SET_SORTING', data.sorting)
      commit('SET_INFO', data.info)
      commit('SET_PAGE_URL', data.info?.url)
      commit('SET_PAGE', getUrlParam(`/url?${data.info?.url}`, 'page'))
    }
    if (!settings.offLoading) {
      commit('SET_LOADING', false)
    }
  }
}

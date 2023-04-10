import Api from '@/core/Api'
import { settingsByCodeQuery } from '@/query'

export const state = () => ({
  contact: {},
  integrations: {},
  social: {}
})

export const getters = {
  getFavicon: (state) => state.contact?.favicon,
  getLogo: (state) => state.contact?.logo,
  getAddress: (state) => state.contact?.address,
  getReceptionPhone: (state) => state.contact?.reception_phone,
  getMarketPhone: (state) => state.contact?.market_phone,
  getMarketEmail: (state) => state.contact?.market_email,
  getHrEmail: (state) => state.contact?.hr_email,
  getHrPhone: (state) => state.contact?.hr_phone,
  getWorktime: (state) => state.contact?.worktime,
  getSalePhone: (state) => state.contact?.sale_phone,
  getReceptionMail: (state) => state.contact?.reception_email,
  getScriptHead: (state) => state.integrations?.script_head,
  getScriptFooter: (state) => state.integrations?.script_footer,
  getScriptBody: (state) => state.integrations?.script_body,
  getStyles: (state) => state.integrations?.styles,
  getSocials: (state) => state.social
}

export const mutations = {
  setContact(state, data) {
    state.contact = data
  },
  setIntegrations(state, data) {
    state.integrations = data
  },
  setSocial(state, data) {
    state.social = data
  }
}

export const actions = {
  async initContact({ commit }) {
    const { settingsByCode } = await Api.graphQL(settingsByCodeQuery, {
      code: 'contact'
    })
    if (settingsByCode) {
      commit('setContact', settingsByCode.settings)
    }
  },
  async initIntegrations({ commit }) {
    const { settingsByCode } = await Api.graphQL(settingsByCodeQuery, {
      code: 'integrations'
    })
    if (settingsByCode) {
      commit('setIntegrations', settingsByCode.settings)
    }
  },
  async initSocial({ commit }) {
    const { settingsByCode } = await Api.graphQL(settingsByCodeQuery, {
      code: 'social'
    })
    if (settingsByCode) {
      commit('setSocial', settingsByCode.settings)
    }
  }
}

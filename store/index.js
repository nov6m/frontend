// import { isDev } from '@/core/utils/process'

// export const actions = {
//   async nuxtServerInit({ commit, dispatch }, { req }) {
//     const host = req?.headers?.host
//     if (host && !isDev) {
//       this.$axios.setBaseURL(`https://${host}/`)
//     }
//     await dispatch('settings/initSocial')
//     await dispatch('settings/initContact')
//     await dispatch('settings/initIntegrations')
//   }
// }

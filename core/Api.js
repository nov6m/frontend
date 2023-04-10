const baseUrlPrefix = '/api/v1'
export default {
  graphQL(data, vars = {}) {
    return this.$axios
      .$post('/api/graphql/', {
        query: data,
        variables: vars
      })
      .then(({ data }) => data)
      .catch((error) => Promise.resolve(error.response))
  },
  getConfig(url) {
    return this.$axios
      .$post(baseUrlPrefix + '/constructor/pages/info/', {
        url
      })
      .then((data) => Promise.resolve(data))
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  getFilterTabs() {
    return this.$axios
      .$get('/cars/filter/')
      .then((data) => data)
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  getFilterData(activeTab = '1', request = {}) {
    return this.$axios
      .$post(baseUrlPrefix + '/filter/', request)
      .then((data) => data)
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  getFilterVacancy(request = {}) {
    return this.$axios
      .$post(baseUrlPrefix + '/filter/vacancy/', request)
      .then((data) => data)
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  getSchema(request = {}) {
    return this.$axios
      .$post(baseUrlPrefix + '/filter/schema/', request)
      .then((data) => data)
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  getParking(request = {}) {
    return this.$axios
      .$post(baseUrlPrefix + '/filter/parking_space/', request)
      .then((data) => data)
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  getHousePointInfo(id) {
    return this.$axios
      .$get(baseUrlPrefix + `/bc/houses/${id}/prices/`)
      .then((data) => data)
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  getMortgage(data) {
    return this.$axios
      .$post(baseUrlPrefix + '/mortgage/', data)
      .then((data) => data)
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  getFavorableMortgage() {
    return this.$axios
      .$get(baseUrlPrefix + '/mortgage/favorable_mortgage_terms/')
      .then((data) => data)
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  sendSMS({ phone, token }) {
    return this.$axios
      .$post(baseUrlPrefix + '/sms/send/', { phone, token })
      .then((data) => data)
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  checkSMSCode(data) {
    return this.$axios
      .$post(baseUrlPrefix + '/sms/check/', data)
      .then((data) => data)
      .catch((error) => Promise.resolve(error?.response?.data))
  },
  sendTicket(data) {
    return this.$axios
      .post(baseUrlPrefix + '/ticket/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((data) => data)
      .catch((error) => error?.response)
  }
}

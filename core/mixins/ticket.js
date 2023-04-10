import Api from '@/core/Api'
import { getUTMLabels } from '../utils/url'

export default {
  methods: {
    getValue(param, defaultValue) {
      return this.$attrs[param] ? this.$attrs[param] : defaultValue
    },
    async sendTicket(data) {
      const form = {
        ...data,
        page: window.location.href,
        ...getUTMLabels()
      }
      const formData = new FormData()
      for (const key in form) {
        if (form[key]) {
          formData.append(key, form[key])
        }
      }
      const response = await Api.sendTicket(formData)
      if (response.status >= 300) {
        this.modalShow({ name: 'error' })
      } else {
        this.modalShow({ name: 'success' })
      }
    }
  }
}

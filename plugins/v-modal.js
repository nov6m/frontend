import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'
import 'vue-js-modal/dist/styles.css'

Vue.use(VModal, { componentName: 'vue-js-modal' })

Vue.mixin({
  computed: {
    getModal() {
      return this.$store.getters['modal/getModal']
    }
  },
  methods: {
    modalShow(obj = {}) {
      this.$modal.show('modalDialog')
      document.querySelector('html').classList.add('locked')
      this.$store.commit('modal/changeModal', obj)
    },

    modalHide() {
      this.$modal.hide('modalDialog')
      document.querySelector('html').classList.remove('locked')
    }
  }
})

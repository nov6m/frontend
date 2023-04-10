export default {
  methods: {
    scrollToTop() {
      if (process.client) {
        this.$nextTick(() => {
          this.$scrollTo('body')
        })
      }
    }
  }
}

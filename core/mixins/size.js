import { isClient } from '../utils/process'

export default {
  data() {
    return {
      isTablet: false,
      isNotebook: false,
      isDesktop: false
    }
  },
  mounted() {
    this.setWindowSizes()
    window.addEventListener('resize', this.setWindowSizes)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWindowSizes)
  },
  methods: {
    setWindowSizes() {
      if (isClient && window) {
        this.isTablet = window.innerWidth <= 768
        this.isNotebook = window.innerWidth <= 1024
        this.isDesktop = window.innerWidth > 1024
      }
    }
  }
}

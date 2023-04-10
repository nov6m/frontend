export default {
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      type: Number,
      default: null
    },
    breadcrumbs: {
      type: Array,
      default() {
        return []
      }
    }
  }
}

<template lang="pug">
component(
  v-if="path"
  :fields="fields"
  :breadcrumbs="breadcrumbs"
  :id="id"
  :is="componentLoader"
)
</template>

<script>
import componentPromise from '@/core/utils/componentPromise'

export default {
  name: 'AsyncLoader',
  props: {
    path: {
      type: String,
      default: ''
    },
    fields: {
      type: Object,
      default() {
        return {}
      }
    },
    breadcrumbs: {
      type: Array,
      default() {
        return []
      }
    },
    id: {
      type: [Number, String],
      default: '0'
    }
  },
  computed: {
    componentLoader() {
      return () => {
        return {
          component: componentPromise(this.path),
          delay: 100,
          timeout: 6000
        }
      }
    }
  }
}
</script>

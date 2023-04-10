<template lang="pug">
div(
  :class="classes"
)
  slot
</template>

<script>
export default {
  name: 'VBootstrapCol',
  props: {
    col: {
      type: [Number, String],
      default: 0
    },
    sm: {
      type: [Number, String],
      default: 0
    },
    md: {
      type: [Number, String],
      default: 0
    },
    lg: {
      type: [Number, String],
      default: 0
    },
    xl: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    classes() {
      const classesArray = []
      classesArray.push(this.col ? `col-${this.col}` : 'col')
      if (this.sm) {
        classesArray.push(`col-sm-${this.sm}`)
      }
      if (this.md) {
        classesArray.push(`col-md-${this.md}`)
      }
      if (this.lg) {
        classesArray.push(`col-lg-${this.lg}`)
      }
      if (this.xl) {
        classesArray.push(`col-xl-${this.xl}`)
      }
      return classesArray
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap-4-grid/scss/grid';
</style>

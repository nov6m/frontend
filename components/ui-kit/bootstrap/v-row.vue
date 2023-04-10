<template lang="pug">
.row(
  :class="{'no-gutters': noGutters}"
)
  slot
</template>

<script>
export default {
  name: 'VBootstrapRow',
  props: {
    noGutters: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap-4-grid/scss/grid';
</style>

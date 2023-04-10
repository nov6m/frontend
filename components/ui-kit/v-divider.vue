<template lang="pug">
.v-divider(
  :style="{borderColor: color}"
)
</template>

<script>
export default {
  name: 'VDivider',
  props: {
    color: {
      type: String,
      default: '#D2D2D2'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-divider {
  border-bottom: 1px solid;
}
</style>

<template lang="pug">
component.v-title(
  :is="tag"
  :class="{large, small}"
)
  slot
</template>

<script>
export default {
  name: 'VTitle',
  props: {
    tag: {
      type: String,
      default: 'h2'
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-title {
  font-weight: 600;
  font-size: 28px;
  @include below($desktopSml) {
    font-size: 24px;
  }
  @include below($tablet) {
    font-size: 20px;
  }
  &.large {
    font-weight: 700;
    font-size: 45px;
  }
  &.small {
    font-size: 20px;
  }
}
</style>

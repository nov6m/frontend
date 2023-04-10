<template lang="pug">
.v-container(
  :class="{fluid}"
)
  slot
</template>

<script>
export default {
  name: 'VContainer',
  props: {
    fluid: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  @include below($desktopDef) {
    padding: 0 20px;
  }
  @include below($tablet) {
    padding: 0 10px;
  }
  &.fluid {
    max-width: unset;
    @include below($desktopDef) {
      padding: 0;
    }
    @include below($tablet) {
      padding: 0;
    }
  }
}
</style>

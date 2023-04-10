<template lang="pug">
component.v-description(
  :is="tag"
)
  slot
</template>

<script>
export default {
  name: 'VDescription',
  props: {
    tag: {
      type: String,
      default: 'p'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-description {
  color: theme(grey-dark);
  line-height: 24px;
}
</style>

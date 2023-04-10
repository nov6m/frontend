<template lang="pug">
  .swiper
    .swiper-container(
      v-swiper="options"
    )
      .swiper-wrapper(
        :id="wrapId"
      )
        slot
      slot(
        name="wrapper-in"
      )
    slot(
      name="nav"
    )
    slot(
      name="progress"
    )
    slot(
      name="thumb"
    )
</template>

<script>
import { directive } from 'vue-awesome-swiper'

export default {
  name: 'VSwiper',
  directives: {
    swiper: directive
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    wrapId: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  position: relative;
}
.swiper-wrapper {
  align-items: stretch;
}
</style>

<template lang="pug">
component.swiper-slide(
  :is="tag"
)
  slot
</template>

<script>
export default {
  name: 'VSwiperSlide',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  height: unset;
  width: unset;
  padding: 20px 0;
}
</style>

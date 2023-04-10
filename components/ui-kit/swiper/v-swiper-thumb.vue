<template lang="pug">
.swiper-container(
  :class="target + '-thumb '"
)
  .swiper-wrapper
    slot
</template>

<script>
export default {
  name: 'VSwiperThumb',
  props: {
    target: {
      type: String,
      default: 'swiper'
    }
  }
}
</script>

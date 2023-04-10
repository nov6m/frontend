<template lang="pug">
.swiper__progressbar(
  :class="target + '-progressbar ' + mode"
)
</template>

<script>
export default {
  name: 'VSwiperNavigation',
  props: {
    target: {
      type: String,
      default: 'swiper'
    },
    mode: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  &__progressbar {
    &.default {
      background-color: theme(bg-color);
      width: 100%;
      height: 3px;
      border-radius: 3px;
      &::v-deep .swiper-pagination-progressbar-fill {
        background: theme(grey-light);
        border-radius: 3px;
      }
    }
  }
}
</style>

<template lang="pug">
.swiper__nav(
  :class="position + '-position'"
)
  .swiper__button.swiper__button-prev.swiper-button-prev(
    :class="target + '-prev ' + mode"
  )
    svg-icon.swiper__button-icon(
      v-if="icon"
      :name="icon"
    )
    slot(
      name="content-prev"
    )
  .swiper__button.swiper__button-next.swiper-button-next(
    :class="target + '-next ' + mode"
  )
    svg-icon.swiper__button-icon(
      v-if="icon"
      :name="icon"
    )
    slot(
      name="content-next"
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
    },
    position: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: 'arrow-swiper-nav'
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper__nav {
  &.top-position {
    display: flex;
    .swiper {
      &__button {
        position: static;
        margin-top: 0;
        &.swiper__button-prev {
          margin-right: 15px;
          @include below($tablet) {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .swiper {
    &__button {
      &.default {
        width: 40px;
        height: 40px;
        border: 1px solid theme(grey);
        color: theme(grey);
        border-radius: 50%;
        transition: all 0.25s ease;
        &:hover {
          color: theme(black-color);
          border-color: theme(black-color);
        }
        &:after {
          display: none;
        }
        &.swiper__button-prev {
          transform: rotate(180deg);
        }
        .swiper__button-icon {
          width: 8px;
          height: 14px;
          @include below($tablet) {
            width: 6px;
            height: 12px;
          }
        }
        @include below($tablet) {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>

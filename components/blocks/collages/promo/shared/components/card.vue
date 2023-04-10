<template lang="pug">
.promo-collage-card(
  :class="{small}"
)
  .promo-collage-card__text(
    v-if="text"
  ) {{ text }}
  v-img.promo-collage-card__img(
    v-if="img"
    :src="img"
    cover
  )
  .promo-collage-card__more(
    v-if="!small"
  )
    v-icon.promo-collage-card__more-icon(
      icon="arrow-right"
      mode="outline"
      rounded
    )
    | Подробнее
</template>

<script>
export default {
  name: 'CollagePromoCard',
  props: {
    text: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.promo-collage-card {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: theme(ui-radius);
  overflow: hidden;
  padding: 40px;
  @include below($notebook) {
    padding: 27px;
  }
  @include below($mobileDef) {
    padding: 16px;
  }
  &:hover {
    .promo-collage-card {
      &__img {
        transform: scale(1.05);
      }
      &__more {
        opacity: 1;
      }
    }
  }
  &.small {
    padding: 20px;
    .promo-collage-card {
      &__text {
        font-size: 18px;
        line-height: 22px;
        @include below($notebook) {
          font-size: 16px;
          line-height: inherit;
        }
        @include below($mobileDef) {
          font-size: 14px;
        }
      }
    }
    @include below($notebook) {
      padding: 15px;
    }
    @include below($mobileDef) {
      padding: 8px;
    }
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: transform 0.25s ease;
  }
  &__text {
    position: relative;
    z-index: 1;
    font-size: 22px;
    line-height: 27px;
    @include below($notebook) {
      font-size: 18px;
      line-height: inherit;
    }
    @include below($mobileDef) {
      font-size: 15px;
    }
  }
  &__more {
    margin-top: 15px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    pointer-events: none;
    transition: opacity 0.25s ease;
    opacity: 0;
  }
  &__more-icon {
    margin-right: 15px;
    font-weight: 600;
    font-size: 16px;
    width: 40px;
    height: 40px;
    &::v-deep(.v-icon__icon) {
      width: 10px;
      height: 14px;
    }
  }
}
</style>

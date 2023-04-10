<template lang="pug">
.promo-card
  .promo-card__title(
    v-if="title"
    v-html="title"
  )
  .promo-card__btn
    v-btn(
      @click="modalShow"
      mode="outline"
      small
    ) {{ btnText || 'Узнать больше' }}
  v-img.promo-card__img(
    v-if="img"
    :src="img"
    :alt="title"
  )
</template>

<script>
export default {
  name: 'PromoCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.promo-card {
  padding: 30px 45px;
  background-color: theme(white-color);
  border: 1px solid theme(grey-light);
  border-radius: theme(ui-radius);
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  @include below($desktopSml) {
    padding: 26px 25px;
  }
  @include below($tablet) {
    padding: 22px 20px 200px;
  }
  @include below($mobileDef) {
    padding: 18px 15px 200px;
  }
  &__title {
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 20px;
    max-width: 50%;
    &::v-deep(span) {
      color: theme(current-color);
    }
    @include below($desktopSml) {
      font-size: 20px;
    }
    @include below($tablet) {
      max-width: 100%;
    }
  }
  &__btn {
    margin-top: auto;
    @include below($tablet) {
      margin-top: 0;
    }
  }
  &__img {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    max-width: 100%;
    @include below($tablet) {
      height: unset;
      max-height: 50%;
      right: 50%;
      transform: translateX(50%);
    }
  }
}
</style>

<template lang="pug">
v-link.offers-card(
  :style="{'background': color, color: idealTextColor(color)}"
  :to="href"
)
  .offers-card__head
    .offers-card__title(
      v-if="name"
      v-text="name"
    )
    .offers-card__subtitle(
      v-if="complex"
    ) {{ complex }}
    .offers-card__date(
      v-if="date"
    ) {{ date }}
  .offers-card__wrap-img
    v-img.offers-card__img(
      :src="img"
      :alt="name"
      cover
    )
</template>

<script>
import { idealTextColor } from '@/core/utils/color'

export default {
  name: 'OfferCard',
  props: {
    href: {
      type: String,
      default: '/'
    },
    name: {
      type: String,
      default: ''
    },
    complex: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  },
  methods: {
    idealTextColor
  }
}
</script>

<style lang="scss" scoped>
.offers-card {
  padding: 30px;
  overflow: hidden;
  border-radius: theme(ui-radius);
  height: 380px;
  position: relative;
  &:hover .offers-card__img {
    transform: scale(1.1);
  }
  @include below($desktopSml) {
    height: 260px;
  }
  @include below($notebook) {
    height: 292px;
  }
  @include below($mobileLrg) {
    height: 320px;
  }
  &__title {
    font-weight: 600;
    font-size: 20px;
  }
  &__subtitle,
  &__date {
    font-weight: 600;
    font-size: 14px;
    margin-top: 10px;
    max-width: 40%;
  }
  &__wrap-img {
    position: absolute;
    left: 35%;
    top: 25%;
    border-radius: 50%;
    width: 460px;
    height: 460px;
    overflow: hidden;
    @include below($desktopSml) {
      width: 315px;
      height: 315px;
    }
    @include below($notebook) {
      width: 353px;
      height: 353px;
    }
    @include below($mobileLrg) {
      width: 395px;
      height: 395px;
    }
  }
  &__img {
    height: 100%;
    width: 100%;
    transition: transform 0.4s ease;
  }
}
</style>

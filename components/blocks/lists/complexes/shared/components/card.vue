<template lang="pug">
.complex-card
  .complex-card__img-wrap
    v-img.complex-card__img(
      :src="img"
      :alt="name"
      cover
    )
    .complex-card__mark(
      v-if="mark"
    ) {{ mark }}
  .complex-card__tags
    .complex-card__tag.complex-card__tag--current(
      v-if="address"
    ) {{ address }}
    .complex-card__tag(
      v-if="count"
    ) {{ formatCount }}
  .complex-card__btm
    .complex-card__name(
      v-if="name"
    ) {{ name }}
    .complex-card__price(
      v-if="price"
    ) {{ formatPrice }}
</template>

<script>
import { wordByNumber } from '@/core/utils/numberFormat'

export default {
  name: 'ComplexCard',
  props: {
    name: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    mark: {
      type: String,
      default: ''
    },
    count: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    formatCount() {
      if (isNaN(this.count)) {
        return this.count
      }
      return `${this.count} ${wordByNumber(this.count, 'apartment')}`
    },
    formatPrice() {
      return `от ${(this.price / 1000000).toFixed(1)} млн ₽`
    }
  }
}
</script>

<style lang="scss" scoped>
.complex-card {
  &:hover {
    .complex-card {
      &__img {
        transform: scale(1.1);
      }
      &__name {
        color: theme(current-color);
      }
    }
  }
  &__img-wrap {
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    border-radius: theme(ui-radius);
    @include below($desktopSml) {
      margin-bottom: 12px;
    }
  }
  &__img {
    width: 100%;
    height: 305px;
    transition: transform 0.25s ease;
    @include below($desktopSml) {
      height: 240px;
    }
    @include below($tablet) {
      height: 180px;
    }
  }
  &__mark {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 4px 12.5px;
    font-weight: 600;
    font-size: 14px;
    border-radius: theme(ui-radius-small);
    background-color: theme(white-color);
    color: theme(current-color);
    @include below($tablet) {
      top: 10px;
      left: 10px;
    }
  }
  &__tags {
    display: flex;
    margin-bottom: 20px;
    @include below($desktopSml) {
      margin-bottom: 12px;
    }
  }
  &__tag {
    padding: 4px 10px;
    margin-right: 10px;
    border-radius: theme(ui-radius-small);
    font-size: 14px;
    background: #f4f4f4;
    &:last-child {
      margin-right: 0;
    }
    &--current {
      background: theme(current-extra-light-color);
      color: theme(current-color);
    }
  }
  &__btm {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  &__name {
    font-size: 22px;
    font-weight: 600;
    transition: color 0.25s ease;
    @include below($desktopSml) {
      font-size: 18px;
    }
  }
  &__price {
    font-size: 20px;
    font-weight: 600;
    @include below($desktopSml) {
      font-size: 16px;
    }
  }
}
</style>

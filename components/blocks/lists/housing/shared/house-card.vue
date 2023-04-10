<template lang="pug">
Photoswipe.house-card(
  auto
  @click="$emit('click')"
  v-pswp="img"
)
  .house-card__group(
    v-if="group"
  ) {{ year }} г.
  .house-card__img-wrap
    v-img.house-card__img(
      ref="image"
      :src="img"
      :alt="name"
      cover
    )
    .house-card__mark(
      v-if="mark"
    ) {{ mark }}
  .house-card__tags
    .house-card__tag.house-card__tag--current(
      v-if="complex"
    ) {{ complex }}
    .house-card__tag(
      v-if="year"
    ) {{ year }} год
  .house-card__name(
    v-if="name"
  ) {{ name }}
</template>

<script>
// import { wordByNumber } from '@/core/utils/numberFormat'

export default {
  name: 'HouseCard',
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
    complex: {
      type: String,
      default: ''
    },
    mark: {
      type: String,
      default: ''
    },
    year: {
      type: [String, Number],
      default: 0
    },
    group: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.house-card {
  cursor: pointer;
  position: relative;
  &:hover {
    .house-card {
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
  &__name {
    font-size: 22px;
    font-weight: 600;
    transition: color 0.25s ease;
    @include below($desktopSml) {
      font-size: 18px;
    }
  }
  &__group {
    position: absolute;
    top: -10px;
    left: 0;
    padding-left: 15px;
    font-weight: 600;
    font-size: 25px;
    transform: translateY(-100%);
    @include below($desktopSml) {
      font-size: 20px;
    }
    &:before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      width: 3px;
      height: 80%;
      background: theme(current-color);
    }
  }
}
</style>

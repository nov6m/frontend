<template lang="pug">
.collage-gallery(
  v-if="isNotEmptyArray(fields.items)"
)
  v-container
    v-title.collage-gallery__title(
      v-if="fields.title"
    ) {{ fields.title }}
    Photoswipe.collage-gallery__items(
      auto
      :class="{[fields.scheme || 'default']: true}"
    )
      .collage-gallery__item(
        v-for="(item, i) in fields.items"
        :key="item.id"
        v-if="item.img"
        v-pswp="item.img"
        :class="`collage-gallery__item--${++i}`"
      )
        .collage-gallery__mark(
          v-if="item.mark"
        ) {{ item.mark }}
        v-img.collage-gallery__img(
          :src="item.img"
          :alt="item.mark || 'Фото галереи'"
          cover
        )
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'CollageGallery',
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.collage-gallery {
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 25px;
    }
  }
  &__items {
    display: grid;
    gap: 20px;
    &.default {
      height: 615px;
      grid-template-areas:
        'A B B B B B B B C'
        'A B B B B B B B C'
        'D D D D D D D E C'
        'D D D D D D D E C';
      @include below($desktopSml) {
        height: 420px;
      }
      @include below($notebook) {
        grid-template-areas:
          'A B C'
          'A B C'
          'D E C'
          'D E C';
      }
      @include below($tablet) {
        grid-template-areas:
          'A C'
          'B C'
          'D E';
        height: 600px;
      }
      @include below($mobileLrg) {
        gap: 8px;
        height: 450px;
      }
    }
  }
  &__item {
    position: relative;
    border-radius: theme(ui-radius-small);
    overflow: hidden;
    width: 100%;
    &--1 {
      grid-area: A;
    }
    &--2 {
      grid-area: B;
    }
    &--3 {
      grid-area: C;
    }
    &--4 {
      grid-area: D;
    }
    &--5 {
      grid-area: E;
    }
  }
  &__img {
    width: 100%;
    height: 100%;
  }
  &__mark {
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 6px 10px;
    background-color: theme(white-color);
    border-radius: theme(ui-radius-small);
    @include below($mobileLrg) {
      top: 9px;
      left: 9px;
      padding: 3px 6px;
      font-size: 9px;
    }
  }
}
</style>

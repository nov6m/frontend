<template lang="pug">
.completed-complexes(
  v-if="isNotEmptyArray(fields.items)"
)
  v-container
    v-title.completed-complexes__title(
      v-if="fields.title"
      v-text="fields.title"
    )
    .completed-complexes__items
      v-link.completed-complexes__item(
        v-for="(item, idx) in fields.items"
        :key="idx"
        :to="item.url"
      )
        v-img.completed-complexes__item-bg(
           v-if="item.img"
           :src="item.img"
           cover
        )
        .completed-complexes__item-name(
          v-if="item.title"
          v-text="item.title"
        )
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'CompletedComplexes',
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Жилищное строительство',
          to: '/',
          img: 'https://zsrf.ru/uploads/items/1896/2304/original.jpg'
        },
        {
          id: 2,
          name: 'Строительство социально значимых объектов',
          to: '/',
          img: 'https://vedtver.ru/wp-content/uploads/2020/04/74a804cf86bb071d8f7ea56edddbe220.jpg'
        }
      ]
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.completed-complexes {
  &__title {
    margin-bottom: 35px;
    @include below($tablet) {
      margin-bottom: 25px;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    @include below($desktopSml) {
      gap: 32px;
    }
    @include below($tablet) {
      gap: 18px;
      grid-template-columns: 1fr;
    }
  }
  &__item {
    position: relative;
    border-radius: theme(ui-radius);
    overflow: hidden;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      opacity: 0;
      background: rgba(0, 0, 0, 0.2);
      transition: opacity 0.2s ease;
    }
    &:hover {
      &:after {
        opacity: 1;
      }
    }
    &-bg {
      height: 100%;
      max-width: 100%;
    }
    &-name {
      position: absolute;
      z-index: 2;
      top: 30px;
      left: 30px;
      font-weight: 700;
      font-size: 22px;
      color: theme(white-color);
      max-width: 90%;
      @include below($desktopSml) {
        font-size: 18px;
        top: 20px;
        left: 20px;
      }
      @include below($notebook) {
        font-size: 15px;
        top: 15px;
        left: 15px;
      }
    }
  }
}
</style>

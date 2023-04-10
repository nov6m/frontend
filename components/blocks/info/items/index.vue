<template lang="pug">
.info-items(
  v-if="isNotEmptyArray(fields.items)"
)
  v-container
    .info-items__content
      card.info-items__item(
        v-for="(item, idx) in fields.items"
        :key="idx"
        :img="item.img"
        :text="item.text"
        :icon="item.icon"
      )
</template>

<script>
import card from './shared/components/card'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'InfoItems',
  components: {
    card
  },
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
.info-items {
  &__content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: 200px;
    @include below($notebook) {
      grid-template-columns: 1fr 1fr;
      height: unset;
      grid-template-rows: 190px 190px;
    }
  }
  &__item {
    &:first-child {
      border-radius: theme(ui-radius) 0 0 theme(ui-radius);
      @include below($notebook) {
        border-radius: 0;
      }
    }
    &:nth-child(3) {
      @include below($notebook) {
        order: 2;
      }
    }
    &:last-child {
      border-radius: 0 theme(ui-radius) theme(ui-radius) 0;
      @include below($notebook) {
        border-radius: 0;
        order: 1;
      }
    }
  }
}
</style>

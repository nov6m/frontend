<template lang="pug">
.promo-collage(
)
  v-container
    .promo-collage__items
      v-link.promo-collage__item(
        v-for="(item, idx) in fields.items"
        :key="idx"
        :to="item.to"
        block
      )
        card(
          :text="item.text"
          :img="item.img"
          :small="idx < 3 && idx > 0"
        )
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'
import card from '@/components/blocks/collages/promo/shared/components/card'

export default {
  name: 'PromoCollage',
  components: {
    card
  },
  // props: {
  //   fields: {
  //     type: Object,
  //     required: true
  //   }
  // },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.promo-collage {
  &__items {
    display: grid;
    gap: 20px;
    grid-template-columns: 0.4fr 0.3fr 0.3fr;
    grid-template-rows: 300px 300px;
    @include below($notebook) {
      grid-template-rows: 205px 205px;
      gap: 15px;
    }
    @include below($tablet) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 300px 195px 205px;
      gap: 10px;
    }
    @include below($mobileDef) {
      grid-template-rows: 250px 240px 140px;
    }
  }
  &__item {
    &:first-child {
      grid-row: span 2;
      @include below($tablet) {
        grid-row: unset;
        grid-column: span 2;
      }
    }
    &:last-child {
      grid-column: span 2;
    }
  }
}
</style>

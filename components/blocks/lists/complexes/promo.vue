<template lang="pug">
.list-complex-promo(
  v-if="isNotEmptyArray(items)"
)
  v-container
    v-title.list-complex-promo__title(
      v-if="fields.title"
      v-text="fields.title"
    )
    v-description.list-complex-promo__descr(
      v-if="fields.description"
      v-text="fields.description"
    )
    .list-complex-promo__content
      v-link.list-complex-promo__item(
        v-for="item in items"
        :key="item.id"
        :to="item.url"
      )
        card(
          :img="item.menuImage || item.image"
          :name="item.name"
          :mark="item.tags[0]"
          :address="item.street"
          :count="item.countApartments"
          :price="item.minPrice"
        )
</template>

<script>
import card from './shared/components/card'
import { complexListQuery } from '@/query'
import Api from '@/core/Api'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'ListComplexPromo',
  components: {
    card
  },
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      items: []
    }
  },
  async fetch() {
    const { allComplex } = await Api.graphQL(complexListQuery, {
      limit: this.fields.count || 3,
      exclude: this.fields.hideCurrent ? [this.id] : []
    })
    if (allComplex) {
      this.items = allComplex
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.list-complex-promo {
  &__title,
  &__descr {
    margin-bottom: 15px;
  }
  &__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    @include below($desktopSml) {
      gap: 20px;
    }
    @include below($tablet) {
      gap: 24px;
      grid-template-columns: 1fr;
    }
  }
}
</style>

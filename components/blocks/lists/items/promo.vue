<template lang="pug">
.list-items-promo(
  v-if="isNotEmptyArray(items)"
)
  v-container
    v-title.list-items-promo__title(
      v-if="fields.title"
      v-text="fields.title"
    )
    .list-items-promo__items
      card-promo.list-items-promo__item(
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :href="item.url"
        :img="item.layoutImage"
        :name="getApartmentName(item.rooms, item.isStudio, item.square, item.floor, item.house.countFloors)"
        :price="item.price"
        :mortgage="item.minMortgage"
        :complex="item.house.complex.name"
        :color="item.house.complex.color"
      )
</template>

<script>
import cardPromo from '@/components/blocks/shared/components/card-promo'
import { isNotEmptyArray } from '@/core/utils/type'
import Api from '@/core/Api'
import { apartmentsListByComplexQuery, similarApartmentsQuery } from '@/query'
import apartment from '@/core/mixins/apartment'

export default {
  name: 'ListItemsPromo',
  components: {
    cardPromo
  },
  mixins: [apartment],
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
    const data = await Api.graphQL(
      this.fields.pageApartment
        ? similarApartmentsQuery
        : apartmentsListByComplexQuery,
      {
        id: this.id,
        excludePk: this.fields.pageApartment ? this.id : undefined
      }
    )
    this.items = data.popularApartmentByComplex || data.similarApartments
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.list-items-promo {
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 20px;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 27px;
    @include below($desktopSml) {
      gap: 17px;
    }
    @include below($notebook) {
      display: flex;
      overflow-y: hidden;
      overflow-x: auto;
      padding-bottom: 15px;
    }
  }
  &__item {
    @include below($notebook) {
      width: 260px;
      min-width: 260px;
    }
    @include below($tablet) {
      width: 245px;
      min-width: 245px;
    }
  }
}
</style>

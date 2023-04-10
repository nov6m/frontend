<template lang="pug">
.favorite-list
  v-container
    template(
      v-if="isNotEmptyArray(items)"
    )
      v-title.favorite-list__title(
        v-if="fields.title"
        v-text="fields.title"
        tag="h1"
      )
      .favorite-list__filters
        v-select.favorite-list__filter(
          v-model="sort"
          :options="SORT_ITEMS"
          track-by="id"
          label="name"
          placeholder="Сортировать"
          small
        )
      .favorite-list__items
        card-promo.list-items-promo__item(
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          :href="item.url"
          :img="item.layoutImage"
          :name="getApartmentName(item.rooms, item.isStudio, item.square, item.floor, item.house.countFloors)"
          :price="item.price"
          :complex="item.house.complex.name"
          :color="item.house.complex.color"
          :mortgage="item.minMortgage"
          lazy-favorite
          :lazy-favorite-remove-callback="removeItem"
        )
    empty-favorite(
      v-else
    )
</template>

<script>
import { mapGetters } from 'vuex'
import EmptyFavorite from './shared/emptyFavorite'
import { isNotEmptyArray } from '@/core/utils/type'
import CardPromo from '@/components/blocks/shared/components/card-promo'
import apartment from '@/core/mixins/apartment'
import block from '@/core/mixins/block'
import { SORT_ITEMS } from './constants'

export default {
  name: 'FavoriteList',
  components: {
    EmptyFavorite,
    CardPromo
  },
  mixins: [apartment, block],
  data() {
    return {
      sort: '',
      SORT_ITEMS
    }
  },
  computed: {
    ...mapGetters({
      favoritesId: 'favorite/items'
    })
  },
  methods: {
    isNotEmptyArray,
    removeItem(id) {
      const indexItem = this.items.findIndex((el) => el.id === id)
      if (indexItem !== -1) {
        this.items.splice(indexItem, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.favorite-list {
  &__filters {
    margin: 35px 0;
    @include below($notebook) {
      margin: 20px 0;
    }
  }
  &__filter {
    max-width: 240px;
    @include below($mobileLrg) {
      max-width: 100%;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 27px;
    @include below($notebook) {
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    @include below($tablet) {
      grid-template-columns: 1fr 1fr;
      gap: 21px;
    }
    @include below($mobileLrg) {
      grid-template-columns: 1fr;
      gap: 14px;
    }
  }
}
</style>

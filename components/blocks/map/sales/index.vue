<template lang="pug">
.sales-map(
  v-if="isNotEmptyArray(items)"
)
  v-container
    .sales-map__content
      sidebar.sales-map__sidebar(
        :title="fields.title"
        :selected.sync="selectedItem"
        :items="items"
      )
      y-map.sales-map__map(
        v-if="!isTablet"
        :selected="selectedItem"
        :items="items"
      )
</template>

<script>
import sidebar from './shared/components/sidebar'
import yMap from './shared/components/map'
import size from '@/core/mixins/size'
import { isNotEmptyArray } from '@/core/utils/type'
import { complexesOfficeQuery } from '@/query'
import Api from '@/core/Api'
export default {
  name: 'SalesMap',
  components: {
    sidebar,
    yMap
  },
  mixins: [size],
  props: {
    fields: {
      type: Object,
      default() {
        return {
          title: 'Офис'
        }
      }
    }
  },
  data() {
    return {
      selectedItem: null,
      items: [{
        id: 1,
        name: 'Главный офис',
        phone: '+7(999) 000 00 00',
        address: 'г. Оренбург, ул. Советская, 1а',
        coords: ['51.755222', '55.105004'],
        workTime: 'пн-вс: с 0:00 до 23:59',
        image: 'https://photos.wikimapia.org/p/00/00/59/60/24_big.jpg',
        icon: 'https://photos.wikimapia.org/p/00/00/59/60/24_big.jpg'
      }]
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.sales-map {
  padding-bottom: 25px;
  &__content {
    display: grid;
    grid-template-columns: 435px auto;
    height: 590px;
    border-radius: theme(ui-radius);
    overflow: hidden;
    border: 1px solid theme(grey-light);
    @include below($desktopSml) {
      grid-template-columns: 300px auto;
    }
    @include below($notebook) {
      height: 460px;
    }
    @include below($tablet) {
      height: unset;
      display: block;
      border: none;
      border-radius: 0;
    }
  }
}
</style>

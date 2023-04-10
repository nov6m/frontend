<template lang="pug">
.interactive-map(
  v-if="isNotEmptyArray(items)"
)
  v-container
    .interactive-map__cnt
      v-tabs.interactive-map__tabs(
        v-model="curTab"
        mode="secondary"
      )
        v-tab Генплан
        v-tab На карте
  hint-map(
    v-show="curTab === 0"
    :img="img"
    :items="items"
    :statuses="statuses"
    :complex-name="complex"
  )
  keep-alive
    y-map(
      v-if="curTab === 1"
      :items="items"
    )
</template>

<script>
import HintMap from './shared/components/hint-map'
import YMap from './shared/components/y-map'
import { isNotEmptyArray } from '@/core/utils/type'
import Api from '@/core/Api'
import { complexHousesMapQuery } from '@/query'

export default {
  name: 'InteractiveMap',
  components: { YMap, HintMap },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      curTab: 0,
      complex: '',
      img: '',
      items: [],
      statuses: {
        P: {
          title: 'В продаже',
          color: '#1BA943'
        },
        D: {
          title: 'Продажи приостановленны',
          color: '#ffffff'
        },
        closed: {
          title: 'дом сдан',
          color: '#FC1102'
        }
      }
    }
  },
  async fetch() {
    const { complex } = await Api.graphQL(complexHousesMapQuery, {
      id: this.id
    })
    if (complex) {
      this.img = complex.imageMapHouses
      this.complex = complex.name
      this.items = complex.houses.filter(
        (item) => item.coords && item.publicationStatus === 'P'
      )
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.interactive-map {
  &__cnt {
    position: relative;
  }

  &__tabs {
    position: absolute;
    top: 28px;
    left: 0;
    z-index: 8;
    @include below($tablet) {
      top: 9px;
    }
  }
}
</style>

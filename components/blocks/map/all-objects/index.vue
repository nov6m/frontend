<template lang="pug">
.all-objects
  v-container
    v-title.all-objects__title(
      v-if="fields.title"
    ) {{ fields.title }}
  client-only
    yandex-map.all-objects__wrapper(
      v-if="objects"
      :coords="[0, 0]"
      :zoom="15"
      :controls="['zoomControl']"
      :detailed-controls="{zoomControl: { position: { right: '30px', top: '200px' }, size: 'small' }}"
      :cluster-options="clusterOptions"
      :scroll-zoom="false"
      :options="{maxZoom: 18}"
      @map-was-initialized="initMap"
    )
      ymap-marker(
        v-for="mark in objects"
        :key="mark.id"
        :marker-id="mark.id"
        :coords="getCoordsFromString(mark.coords)"
        :clusterName="mark.complex"
        :hintContent="mark.houseNumber || ''"
        :icon="{color: 'night'}"
      )
        .all-objects__balloon( slot="balloon" )
          map-hint(
            :title="`Дом ${mark.houseNumber}`"
            :subtitle="`Срок сдачи ${getQuarterFromDate(mark.deliveryDate)} кв. ${(new Date(mark.deliveryDate)).getFullYear()} г`"
            :total="mark.apartmentCount"
            :href="mark.apartmentCount ? `/apartment?complex=${mark.complex}&house=${mark.complex}:${mark.address}` : `/apartment?complex=${mark.complex}`"
            btnText="Квартиры в продаже"
          )
</template>

<script>
import MapHint from '../interactive/shared/components/shared/components/shared/components/hint'
import Api from '@/core/Api'
import { mapObjectsQuery } from '@/query'
import { getCoordsFromString } from '@/core/utils/coords'
import { getQuarterFromDate } from '@/core/utils/date'

export default {
  name: 'AllObjects',
  components: { MapHint },
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
      yandexMap: null,
      objects: null
    }
  },
  async fetch() {
    const { allComplex } = await Api.graphQL(mapObjectsQuery)
    this.objects = []
    allComplex.forEach((el) => {
      this.objects = [
        ...this.objects,
        ...el.houses.map((house) => ({
          ...house,
          complex: el.name,
          icon: el.mapIcon
        }))
      ]
    })
    this.objects = this.objects.filter((el) => el.coords)
  },
  computed: {
    clusterOptions() {
      const cluster = {}
      if (this.objects) {
        this.objects.forEach((el) => {
          cluster[el.complex] = el.icon
            ? {
                clusterIconContentLayout:
                  '<div style="color: #FFFFFF; font-weight: bold;">{{ properties.geoObjects.length }}</div>',
                clusterIcons: [
                  { href: el.icon, size: [46, 46], offset: [-23, -23] }
                ]
              }
            : {}
        })
      }
      return cluster
    }
  },
  methods: {
    getQuarterFromDate,
    getCoordsFromString,
    setZoomMap() {
      setTimeout(() => {
        this.yandexMap.setBounds(this.yandexMap.geoObjects.getBounds(), {
          checkZoomRange: true,
          zoomMargin: 9,
          preciseZoom: true
        })
      }, 100)
    },
    initMap($event) {
      this.yandexMap = $event
      this.setZoomMap()
    }
  }
}
</script>

<style lang="scss" scoped>
.all-objects {
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 25px;
    }
  }
  &__wrapper {
    height: 540px;
  }
  &__balloon {
    &::v-deep(.hint__subtitle) {
      margin-bottom: 25px;
    }
    &::v-deep(.hint__title) {
      margin-bottom: 5px;
    }
    &::v-deep(.hint__content) {
      padding: 20px;
      box-shadow: none;
    }
    &::v-deep(.hint__close) {
      display: none;
    }
  }
}
</style>

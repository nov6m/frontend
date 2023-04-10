<template lang="pug">
client-only
  yandex-map.map-content__wrapper(
    :coords="coords"
    :zoom="15"
    :controls="['zoomControl']"
    :detailed-controls="{zoomControl: { position: { right: '30px', top: '200px' }, size: 'small' }}"
    :scroll-zoom="false"
    @map-was-initialized="initMap"
  )
    ymap-marker(
      v-for="mark in items"
      :key="mark.id"
      :marker-id="mark.id"
      :coords="mark.coords"
      :hintContent="mark.name || ''"
      :icon="{layout: 'default#image', imageSize: [68, 76], imageOffset: [-34, -38]}"
    )
</template>

<script>
import { getCenter, getCoordsFromString } from '@/core/utils/coords'

export default {
  name: 'YMap',
  props: {
    items: {
      type: Array,
      required: true
    },
    selected: {
      required: true
    }
  },
  data() {
    return {
      yandexMap: null
    }
  },
  computed: {
    coords() {
      if (this.selected) {
        return this.selected.coords
      }
      return getCenter(this.items)
    }
  },
  watch: {
    selected() {
      if (!this.selected) {
        this.$nextTick(() => {
          this.setZoomMap()
        })
      }
      this.yandexMap.setZoom(18, { duration: 1000 })
    }
  },
  methods: {
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
      this.$emit('init')
    }
  }
}
</script>

<style scoped></style>

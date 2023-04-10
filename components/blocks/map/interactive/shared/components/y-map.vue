<template lang="pug">
client-only
  yandex-map.y-map(
    :coords="curCenter"
    :zoom="curZoom"
    :controls="['zoomControl']"
    :detailed-controls="detailedControls"
    :scroll-zoom="false"
    :options="{maxZoom: 18}"
    @map-was-initialized="initMap"
  )
    ymap-marker(
      v-for="mark in items"
      :key="mark.id"
      :marker-id="mark.id"
      :coords="getCoordsFromString(mark.coords)",
      :hintContent="`${mark.id}` || ''",
    )
</template>

<script>
import { getCoordsFromString } from '@/core/utils/coords'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'YMap',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      curZoom: 15,
      curCenter: [0, 0]
    }
  },
  computed: {
    detailedControls() {
      return {
        zoomControl: {
          position: {
            right: '30px',
            top: '200px'
          },
          size: 'small'
        }
      }
    }
  },
  methods: {
    getCoordsFromString,
    initMap(inst) {
      if (isNotEmptyArray(this.items)) {
        setTimeout(() => {
          inst.setBounds(inst.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 9,
            preciseZoom: true
          })
        }, 100)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.y-map {
  height: 600px;
}
</style>

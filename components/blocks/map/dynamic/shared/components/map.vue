<template lang="pug">
.map-content
  client-only
    yandex-map.map-content__wrapper(
      :coords="coords"
      :zoom="zoom"
      :controls="['zoomControl']"
      :detailed-controls="detailedControls"
      :cluster-options="clusters"
      :scroll-zoom="false"
      @map-was-initialized="$emit('init', $event)"
    )
      ymap-marker(
        v-for="mark in marks"
        :key="mark.id"
        :marker-id="mark.id"
        :coords="getCoordsFromString(mark.coords)",
        :clusterName="mark.group.name",
        :hintContent="mark.name || ''",
        :icon="{layout: mark.layout, imageHref: getGroupsIcon(groups, mark.group.name), imageSize: getCoordsFromString(mark.imageSize), imageOffset: getCoordsFromString(mark.imageOffset)}"
      )
  slot(
    name="groups"
  )
</template>

<script>
import getClusters from './shared/utils/getClusters'
import { isNotEmptyArray } from '@/core/utils/type'
import { getCoordsFromString, getGroupsIcon } from '@/core/utils/coords'

export default {
  name: 'MapDynamicContent',
  props: {
    zoom: {
      type: Number,
      required: true
    },
    coords: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    groups: {
      type: Array,
      default() {
        return []
      }
    },
    cluster: {
      type: String,
      default: 'all'
    }
  },
  computed: {
    clusters() {
      return getClusters(this.groups)
    },
    marks() {
      if (isNotEmptyArray(this.items)) {
        return this.cluster === 'all'
          ? this.items
          : this.items.filter((item) => item?.group.name === this.cluster)
      }
      return []
    },
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
    getGroupsIcon,
    getCoordsFromString
  }
}
</script>

<style lang="scss" scoped>
.map-content {
  position: relative;
  &__wrapper {
    height: 100%;
    width: 100%;
  }
}
</style>

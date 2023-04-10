<template lang="pug">
.dynamic-map(
  v-if="isNotEmptyArray(coords)"
)
  v-container
    v-title.dynamic-map__title(
      v-if="fields.title"
    ) {{ fields.title }}
    .dynamic-map__content
      progress-bar.dynamic-map__top(
        :value="8"
        :label="fields.progressLabel"
      )
      sidebar.dynamic-map__side(
        :items="coords"
        :cluster="curCluster"
        @change="setNewCenter"
      )
      dynamic-map.dynamic-map__map(
        :coords="curCenter"
        :zoom="curZoom"
        :items="coords"
        :groups="groups"
        :cluster="curCluster"
        @init="initMap"
      )
        groups(
          slot="groups"
          v-model="curCluster"
          :items="groups"
        )
</template>

<script>
import progressBar from './shared/components/progress'
import groups from './shared/components/groups'
import dynamicMap from './shared/components/map'
import sidebar from './shared/components/sidebar'
import { getCoordsFromString } from '@/core/utils/coords'
import Api from '@/core/Api'
import { complexInfrastructuresQuery } from '@/query'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'DynamicMap',
  components: {
    progressBar,
    dynamicMap,
    groups,
    sidebar
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
      curZoom: 15,
      curCenter: [0, 0],
      curCluster: 'all',
      coords: [],
      groups: []
    }
  },
  async fetch() {
    const { complex, allInfrastructureGroups } = await Api.graphQL(
      complexInfrastructuresQuery,
      {
        id: this.id
      }
    )
    if (allInfrastructureGroups) {
      this.groups = allInfrastructureGroups
    }
    if (complex) {
      this.coords = complex.infrastructures
    }
  },
  methods: {
    isNotEmptyArray,
    initMap(inst) {
      if (isNotEmptyArray(this.coords)) {
        setTimeout(() => {
          inst.setBounds(inst.geoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 9,
            preciseZoom: true
          })
        }, 100)
      }
    },
    setNewCenter(newCoords) {
      this.curCenter = getCoordsFromString(newCoords)
      this.curZoom = 18
    }
  }
}
</script>

<style lang="scss" scoped>
.dynamic-map {
  &__title {
    margin-bottom: 35px;
    @include below($tablet) {
      margin-bottom: 25px;
    }
  }
  &__content {
    display: grid;
    grid-template-rows: 82px 430px;
    grid-template-columns: 350px auto;
    border: 1px solid theme(grey-light);
    border-radius: theme(ui-radius);
    overflow: hidden;
    @include below($notebook) {
      grid-template-columns: 300px auto;
    }
    @include below($tablet) {
      grid-template-columns: 1fr;
      grid-template-rows: 62px 425px 280px;
    }
  }
  &__side {
    border-top: 1px solid theme(grey-light);
    border-right: 1px solid theme(grey-light);
    @include below($tablet) {
      border: 1px solid theme(grey-light);
    }
  }
  &__top {
    grid-column: span 2;
    @include below($tablet) {
      grid-column: unset;
    }
  }
}
</style>

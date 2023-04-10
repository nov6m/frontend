<template lang="pug">
.parking
  block-header(
    :img="fields.img"
    :title="fields.title"
    :breadcrumbs="breadcrumbs"
  )
  v-container
    parking-filter.parking__filter(
      :complex.sync="complex"
      :house.sync="house"
      :view.sync="view"
      :complexes="complexes"
      :houses="houses"
      @update="updateData({complex: complex?.id, house: house?.id})"
    )
  template(v-if="image && view === 'scheme'")
    v-container
      block-statuses.parking__statuses(
        :items="statuses"
      )
      parking-content(
        :items="items"
        :image="image"
      )
  template( v-else-if="isNotEmptyArray(coords) && view === 'map'" )
    keep-alive
      v-container
        parking-map.parking__map(
          :coords="coords"
        )
  parking-empty.parking__empty(
    v-else
    :mode="complex && house ? 'selected' : 'empty'"
    @reset="resetData"
  )
</template>

<script>
import BlockHeader from '../../shared/components/block-header'
import BlockStatuses from '../../shared/components/block-statuses'
import { houseMapQuery } from '../../../../query'
import { isNotEmptyArray } from '../../../../core/utils/type'
import { getCoordsFromString } from '../../../../core/utils/coords'
import ParkingContent from './shared/parking-content'
import ParkingFilter from './shared/parking-filter'
import ParkingEmpty from './shared/parking-empty'
import ParkingMap from './shared/parking-map'
import Api from '@/core/Api'

export default {
  name: 'ParkingPlaces',
  components: {
    ParkingMap,
    ParkingEmpty,
    ParkingFilter,
    ParkingContent,
    BlockStatuses,
    BlockHeader
  },
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    },
    breadcrumbs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      view: 'scheme',
      coords: [],
      statuses: {
        booked: {
          title: 'Забронированно',
          color: '#F9B0B0'
        },
        free: {
          title: 'Свободно',
          color: '#E2F4DA'
        },
        sold: {
          title: 'Продано',
          color: '#FFFFFF'
        }
      },
      complex: '',
      house: '',
      complexes: [],
      houses: [],
      items: {},
      image: null
    }
  },
  async fetch() {
    await this.updateData({
      complex: this.$route.query.complex,
      house: this.$route.query.house
    })
  },
  computed: {
    modalStatus() {
      return this.$store.getters['modal/getModal']?.active?.status
    }
  },
  watch: {
    modalStatus() {
      if (!this.modalStatus) {
        this.updateData({ complex: this.complex?.id, house: this.house?.id })
      }
    }
  },
  methods: {
    isNotEmptyArray,
    async updateData(params) {
      const { complexes, houses, data } = await Api.getParking(params)
      this.complexes = complexes || []
      this.houses = houses || []
      if (this.view === 'map') {
        this.coords = null
        const { house } = await Api.graphQL(houseMapQuery, {
          id: this.house?.id
        })
        if (house.coords) {
          this.coords = getCoordsFromString(house.coords)
        }
      } else {
        this.image = data?.image || null
        this.items = data?.parking_spaces || {}
        if (params.complex) {
          this.complex =
            this.complexes.find((el) => el.id === +params.complex) || ''
        }
        if (params.house) {
          this.house = this.houses.find((el) => el.id === +params.house) || ''
        }
        if (process.client) {
          let url = ''
          if (this.complex) {
            url += `complex=${this.complex.id}`
          }
          if (this.house) {
            url += `&house=${this.house.id}`
          }
          if (url) {
            history.pushState(
              '',
              'data.seo.title',
              `${location.pathname}?${url}`
            )
          }
        }
      }
    },
    resetData() {
      this.complex = ''
      this.house = ''
      this.updateData({})
    }
  }
}
</script>

<style lang="scss" scoped>
.parking {
  &__statuses {
    margin: 50px 0 30px;
    @include below($tablet) {
      margin: 30px 0 20px;
    }
    @include below($mobileDef) {
      margin: 15px 0 10px;
    }
  }
  &__filter {
    margin-top: 25px;
    @include below($tablet) {
      margin-top: 10px;
    }
  }
  &__empty {
    margin-top: 25px;
  }
  &__map {
    margin: 40px 0;
  }
}
</style>

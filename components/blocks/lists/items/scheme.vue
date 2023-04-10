<template lang="pug">
.scheme-items
  block-header(
    :img="fields.img"
    :title="fields.title"
    :breadcrumbs="breadcrumbs"
  )
  v-container
    scheme-filter.scheme-items__filter(
      v-if="filter"
      :house.sync="filter.house"
      :complex="filter.complex"
      @update:complex="filter.complex = $event; filter.house = ''"
      :complexes="complexes"
      :houses="houses"
      :url="url"
    )
    scheme-result(
      :items="items"
    )
</template>

<script>
import BlockHeader from '../../shared/components/block-header'
import SchemeFilter from './shared/components/filter/scheme-filter'
import SchemeResult from './shared/components/result/scheme-result'
import Api from '@/core/Api'

export default {
  name: 'SchemeItems',
  components: {
    BlockHeader,
    SchemeResult,
    SchemeFilter
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
      filter: null,
      items: [],
      complexes: [],
      houses: []
    }
  },
  async fetch() {
    await this.updateData(
      { complex: this.$route.query.complex, house: this.$route.query.house },
      true
    )
  },
  computed: {
    url() {
      return `${
        this.filter.complex?.id ? `complex=${this.filter.complex?.id}` : ''
      }${this.filter.house?.id ? `&house=${this.filter.house?.id}` : ''}`
    }
  },
  watch: {
    filter: {
      handler() {
        this.updateData({
          complex: this.filter.complex?.id,
          house: this.filter.house?.id
        })
      },
      deep: true
    }
  },
  methods: {
    updateURL(url) {
      if (process.client) {
        history.pushState(
          '',
          'data.seo.title',
          `${location.pathname}?${url || ''}`
        )
      }
    },
    async updateData(params, init) {
      const { data, complexes, houses } = await Api.getSchema(params)
      this.items = data
      this.houses = houses
      if (init) {
        this.complexes = complexes
        this.filter = { house: '', complex: '' }
        if (params.complex) {
          this.filter.complex =
            complexes.find(
              (el) => el.id.toLowerCase() === params.complex.toLowerCase()
            ) || ''
          if (params.house) {
            this.filter.house =
              houses.find(
                (el) => el.id.toLowerCase() === params.house.toLowerCase()
              ) || ''
          }
        }
      }
      this.updateURL(this.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.scheme-items {
  &__filter {
    position: sticky;
    top: 75px;
    left: 0;
    background-color: theme(white-color);
    z-index: 10;
    @include below($notebook) {
      position: static;
    }
  }
}
</style>

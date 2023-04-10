<template lang="pug">
.calc-mortgage-list
  v-container
    v-title.calc-mortgage-list__title(
      v-if="fields.title"
      v-text="fields.title"
      small
    )
    .calc-mortgage-list__content
      form-calc(
        :fee.sync="fee"
        :year.sync="year"
        :complex.sync="complex"
        @update:complex="onUpdateComplex"
        :price.sync="price"
        :priceRange="priceRange"
        :complexList="complexList"
        @update="updateData({price, term: year * 12, min_initial: fee, complex: complex?.id || undefined})"
      )
      result(
        v-show="!loading"
        v-if="isNotEmptyArray(items)"
        :items="items"
        :selected-data="selectedData"
      )
      .calc-mortgage-list__loading
        v-loader(
          v-show="loading"
        )
</template>

<script>
import formCalc from './shared/components/form'
import result from './shared/components/result'
import { isNotEmptyArray } from '@/core/utils/type'
import Api from '@/core/Api'
import block from '@/core/mixins/block'

export default {
  name: 'FormCalcMortgageList',
  components: {
    formCalc,
    result
  },
  mixins: [block],
  data() {
    return {
      loading: false,
      items: [],
      priceRange: {
        min: 0,
        max: 0
      },
      complexList: [],
      complex: '',
      price: 4200000,
      year: 20,
      fee: 630000
    }
  },
  computed: {
    selectedData() {
      return {
        user_payment: this.price,
        user_term: this.year * 12,
        user_min_initial: this.fee,
        user_complex: this.complex?.id || undefined
      }
    }
  },
  async mounted() {
    await this.updateData(
      {
        price: this.price,
        term: this.year * 12,
        min_initial: this.fee,
        complex: this.complex?.id || undefined
      },
      true
    )
  },
  methods: {
    isNotEmptyArray,
    async onUpdateComplex() {
      const { price_range } = await Api.getMortgage({
        complex: this.complex?.id || undefined
      })
      const fixedMax = this.fixPrice(price_range.max)
      const fixedMin = this.fixPrice(price_range.min)
      this.priceRange = {
        max: fixedMax,
        min: fixedMin
      }
      if (this.price > fixedMax) {
        this.price = this.fixPrice(fixedMax)
      }
      if (this.price < fixedMin) {
        this.price = this.fixPrice(fixedMin)
      }
    },
    async updateData(params, initial) {
      this.loading = true
      const { price_range, complexes, data } = await Api.getMortgage(params)
      this.items = data
      if (initial) {
        const fixedMax = this.fixPrice(price_range.max)
        const fixedMin = this.fixPrice(price_range.min)
        this.priceRange = {
          max: fixedMax,
          min: fixedMin
        }
        this.complexList = complexes
        if (this.id) {
          this.complex = complexes.find((el) => el.id === params.complex)
        }
      }
      this.loading = false
    },
    fixPrice(price) {
      return (price / 1000).toFixed(0) * 1000
    }
  }
}
</script>

<style lang="scss" scoped>
.calc-mortgage-list {
  &__title {
    margin-bottom: 35px;
    @include below($tablet) {
      margin-bottom: 20px;
    }
  }
  &__content {
    display: grid;
    grid-template-columns: 330px auto;
    column-gap: 70px;
    @include below($desktopSml) {
      column-gap: 30px;
    }
    @include below($notebook) {
      grid-template-columns: 280px auto;
      column-gap: 20px;
    }
    @include below($tablet) {
      grid-template-columns: 1fr;
      row-gap: 50px;
    }
  }
  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

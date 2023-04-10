<template lang="pug">
.find-items-form
  .find-items-form__field
    .find-items-form__label Количество комнат
    .find-items-form__item
      v-text-checkbox.find-items-form__checkbox-item(
        v-for="(item, idx) in countItems"
        :key="idx"
        v-model="item.checked"
        @change="updateFilter"
      ) {{ item.name }}
  .find-items-form__field
    .find-items-form__label Площадь квартиры
    v-range.find-items-form__item(
      v-model="square"
      :max="maxSquare"
      :min="minSquare"
      :interval="0.1"
      postfix="м2"
      @change="updateFilter"
    )
  .find-items-form__field
    .find-items-form__label Цена
    v-range.find-items-form__item(
      v-model="price"
      :max="maxPrice"
      :min="minPrice"
      :interval="1"
      format="number"
      postfix="₽"
      @change="updateFilter"
    )
  .find-items-form__field
    .find-items-form__label Срок сдачи
    v-select.find-items-form__item(
      v-model="date"
      :options="dateItems"
      placeholder="Не имеет значения"
      track-by="key"
      label="name"
      @input="updateFilter"
    )
  v-btn.find-items-form__field.find-items-form__find(
    @click="goToFilter"
    :disabled="!count"
  ) Показать {{ count }} {{ wordByNumber(count, 'apartments') }}
  v-btn.form-find-items__field.find-items-form__reset(
    @click="initFilterData"
    mode="extra-light"
  ) Сбросить
</template>

<script>
import { mapMutations } from 'vuex'
import Api from '@/core/Api'
import { wordByNumber } from '@/core/utils/numberFormat'
import { complexNameQuery } from '@/query'

export default {
  name: 'FindItemsForm',
  props: {
    complexId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      count: 0,
      square: [0, 0],
      maxSquare: 100000000,
      minSquare: 0,
      price: [0, 0],
      maxPrice: 100000000,
      minPrice: 0,
      date: '',
      dateItems: [],
      countItems: [],
      link: '',
      complexName: null
    }
  },
  async fetch() {
    if (this.complexId) {
      const { complex } = await Api.graphQL(complexNameQuery, {
        id: this.complexId
      })
      this.complexName = complex.name
    }
    await this.initFilterData()
  },
  fetchOnServer: false,
  computed: {
    routeLink() {
      return `/apartment/?${this.link}`
    }
  },
  methods: {
    ...mapMutations({
      resetRequestData: 'filter/RESET_REQUEST_DATA'
    }),
    wordByNumber,
    async initFilterData() {
      const requestObj = {}
      if (this.complexName) {
        requestObj.complex = [this.complexName]
      }
      const data = await Api.getFilterData(1, requestObj)
      // ROOMS
      const roomsObj = data.filters.find((el) => el.name === 'rooms')
      this.countItems = roomsObj.values[0].values
      // SQUARE
      const squareObj = data.filters.find((el) => el.name === 'square')
      this.square = [squareObj.values.min, squareObj.values.max]
      this.maxSquare = squareObj.values.max
      this.minSquare = squareObj.values.min
      // PRICE
      const priceObj = data.filters.find((el) => el.name === 'price')
      this.price = [priceObj.values.min, priceObj.values.max]
      this.maxPrice = priceObj.values.max
      this.minPrice = priceObj.values.min
      // DATE
      const dateObj = data.filters.find((el) => el.name === 'delivery_date')
      this.dateItems = dateObj.values[0].values
      this.date = ''
      // COUNT
      this.count = data?.info?.cars_count || 0
      this.link = data?.info?.url
    },
    async updateFilter() {
      const requestObj = {
        price: this.price,
        square: this.square,
        rooms: this.countItems.filter((el) => el.checked).map((el) => el.key),
        delivery_date: this.date ? [this.date.key] : []
      }
      if (this.complexName) {
        requestObj.complex = [this.complexName]
      }
      const data = await Api.getFilterData(1, requestObj)
      this.link = data?.info?.url
      this.count = data?.info?.cars_count || 0
    },
    goToFilter() {
      this.resetRequestData()
      this.$router.push(this.routeLink)
    }
  }
}
</script>

<style lang="scss" scoped>
.find-items-form {
  display: grid;
  grid-template-columns: 0.22fr 0.2fr 0.26fr 0.16fr 0.16fr;
  align-items: end;
  gap: 20px;
  @include below($desktopDef) {
    column-gap: 40px;
    row-gap: 25px;
    grid-template-columns: 1fr 1fr;
  }
  @include below($tablet) {
    grid-template-columns: 1fr;
    column-gap: 20px;
    row-gap: 10px;
  }
  &__reset {
    display: none;
    @include below($desktopDef) {
      display: inline-flex;
    }
  }
  &__label {
    margin-bottom: 13px;
    font-size: 15px;
  }
  &__item {
    @include below($desktopDef) {
      display: block;
      width: 100%;
    }
  }
  &__checkbox-item {
    margin-right: 6px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

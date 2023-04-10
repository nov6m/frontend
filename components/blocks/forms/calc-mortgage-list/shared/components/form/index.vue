<template lang="pug">
.mortgage-list-form
  .mortgage-list-form__content
    .mortgage-list-form__title Параметры кредитования
    .mortgage-list-form__field
      .mortgage-list-form__label Стоимость жилья, руб
      v-input.mortgage-list-form__input(
        :value="formatPrice"
        readonly
        block
      )
      v-slider.mortgage-list-form__slider(
        :value="price"
        @input="$emit('update:price', $event)"
        :max="priceRange.max"
        :min="priceRange.min"
        :interval="1000"
        small
      )
    .mortgage-list-form__field
      .mortgage-list-form__label Жилой комплекс
      v-select.mortgage-list-form__input(
        :value="complex"
        @input="$emit('update:complex', $event)"
        :options="[{id: null, name: 'Любой'} ,...complexList]"
        label="name"
        track-by="id"
        placeholder="Не имеет значения"
        :searchable="false"
      )
    .mortgage-list-form__field
      .mortgage-list-form__label Первый взнос
      v-input.mortgage-list-form__input(
        :value="formatFee"
        readonly
        block
      )
      v-slider.mortgage-list-form__slider(
        :value="fee"
        @input="$emit('update:fee', $event)"
        :max="maxFee"
        :min="minFee"
        :interval="1000"
        small
      )
    .mortgage-list-form__field
      .mortgage-list-form__label Срок кредитования
      v-input.mortgage-list-form__input(
        :value="formatYear"
        readonly
        block
      )
      v-slider.mortgage-list-form__slider(
        :value="year"
        @input="$emit('update:year', $event)"
        :marks="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30]"
        :included="true"
        :min="1"
        :max="30"
        hideLabel
        small
      )
    .mortgage-list-form__field.mortgage-list-form__result
      .mortgage-list-form__label Сумма кредита
      .mortgage-list-form__value {{ creditAmount }} ₽
    v-btn.mortgage-list-form__field(
      @click="$emit('update')"
      block
      :disabled="disabledForm"
    ) Рассчитать ипотеку
    .mortgage-list-form__disclaimer Данный расчет приведен для общей информации и не является публичной офертой
</template>

<script>
import { ruFormat, wordByNumber } from '@/core/utils/numberFormat'
import { MAX_FEE_PERCENT, MIN_FEE_PERCENT } from '@/core/constants'

export default {
  name: 'MortgageListForm',
  props: {
    price: {
      type: Number,
      required: true
    },
    priceRange: {
      type: Object,
      default() {
        return { min: 0, max: 10000000 }
      }
    },
    complex: {
      type: [Object, String],
      required: true
    },
    complexList: {
      type: Array,
      default() {
        return []
      }
    },
    year: {
      type: Number,
      required: true
    },
    fee: {
      type: Number,
      required: true
    }
  },
  computed: {
    formatFee() {
      return ruFormat(this.fee) + ' ₽'
    },
    formatPrice() {
      return ruFormat(this.price) + ' ₽'
    },
    formatYear() {
      return this.year + ' ' + wordByNumber(this.year, 'beforeYear')
    },
    creditAmount() {
      const amount = this.price - this.fee
      if (amount <= 0) {
        return '-'
      }
      return ruFormat(amount)
    },
    maxFee() {
      return ((this.price * MAX_FEE_PERCENT) / 1000).toFixed(0) * 1000
    },
    minFee() {
      return ((this.price * MIN_FEE_PERCENT) / 1000).toFixed(0) * 1000
    },
    disabledForm() {
      return !this.priceRange.max || !this.priceRange.min
    }
  },
  watch: {
    maxFee() {
      if (this.maxFee < this.fee) {
        this.$emit('update:fee', this.maxFee)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mortgage-list-form {
  &__content {
    position: sticky;
    top: 100px;
    left: 0;
  }
  &__title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 28px;
  }
  &__field {
    margin-bottom: 20px;
    @include below($tablet) {
      margin-bottom: 10px;
    }
  }
  &__input {
    margin-top: 14px;
    @include below($tablet) {
      margin-top: 7px;
    }
  }
  &__label {
    font-size: 14px;
  }
  &__value {
    font-weight: 600;
    font-size: 24px;
    @include below($tablet) {
      font-size: 20px;
    }
  }
  &__result {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  &__disclaimer {
    font-size: 13px;
    text-align: center;
  }
  &__slider {
    margin: -8px 12px 0;
    &::v-deep(.vue-slider-rail) {
      background-color: transparent;
    }
  }
}
</style>

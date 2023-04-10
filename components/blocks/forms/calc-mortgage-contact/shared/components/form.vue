<template lang="pug">
.calc-mortgage-form
  h2.calc-mortgage-form__title(
    v-if="title"
  ) {{ title }}
  .calc-mortgage-form__description(
    v-if="description"
  ) {{ description }}
  .calc-mortgage-form__field
    .calc-mortgage-form__label Я хочу квартиру за
    .calc-mortgage-form__value {{ ruFormat(price) }} ₽
    v-slider.calc-mortgage-form__input(
      v-model="price"
      :max="mxPrice"
      :min="mnPrice"
      :interval="1000"
    )
  .calc-mortgage-form__field
    .calc-mortgage-form__label Первоначальный взнос
      span {{ feePercent.toFixed(0) }}%
    .calc-mortgage-form__value {{ ruFormat(fee) }} ₽
    v-slider.calc-mortgage-form__input(
      v-model="fee"
      :max="maxFee"
      :min="minFee"
      :interval="1000"
    )
  .calc-mortgage-form__field
    .calc-mortgage-form__label Срок
    .calc-mortgage-form__value {{ years }} лет
    v-slider.calc-mortgage-form__input(
      v-model="years"
      :max="mxYear"
      :min="mnYear"
    )
  .calc-mortgage-form__field
    v-btn(
      block
      @click="openModal"
    ) {{ btnText }}
  .calc-mortgage-form__disclaimer(
    v-if="disclaimer"
  ) {{ disclaimer }}
</template>

<script>
import { ruFormat } from '@/core/utils/numberFormat'
import { MAX_FEE_PERCENT, MIN_FEE_PERCENT } from '@/core/constants'

export default {
  name: 'CalcMortgageForm',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    disclaimer: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    minYear: {
      type: String,
      default: ''
    },
    maxYear: {
      type: String,
      default: ''
    },
    minPrice: {
      type: String,
      default: ''
    },
    maxPrice: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      price: 3000000,
      mnPrice: +this.minPrice || 2800000,
      mxPrice: +this.maxPrice || 10000000,
      fee: 300000,
      years: 10,
      mnYear: +this.minYear || 5,
      mxYear: +this.maxYear || 30
    }
  },
  computed: {
    feePercent() {
      return (this.fee / this.price) * 100
    },
    maxFee() {
      return +((this.price * MAX_FEE_PERCENT) / 1000).toFixed(0) * 1000
    },
    minFee() {
      return +((this.price * MIN_FEE_PERCENT) / 1000).toFixed(0) * 1000
    }
  },
  watch: {
    maxFee() {
      if (this.maxFee < this.fee) {
        this.fee = this.maxFee
      }
    }
  },
  methods: {
    ruFormat,
    openModal() {
      this.modalShow({
        code: 'mortgage',
        params: { subject: 'Заказ консультации по ипотеке' }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.calc-mortgage-form {
  background-color: theme(white-color);
  padding: 52px 42px;
  box-shadow: 0px 0px 30px rgba(140, 140, 140, 0.25);
  border-radius: theme(ui-radius);
  @include below($tablet) {
    padding: 35px 27px;
  }
  &__title {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 18px;
    @include below($notebook) {
      font-size: 22px;
    }
    @include below($tablet) {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
  &__description {
    font-size: 15px;
    color: theme(grey-dark);
    margin-bottom: 22px;
    @include below($tablet) {
      font-size: 12px;
      margin-bottom: 14px;
    }
  }
  &__disclaimer {
    color: theme(grey-dark);
    font-size: 14px;
  }
  &__field {
    margin-bottom: 15px;
  }
  &__label {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    line-height: 14px;
    span {
      font-size: 22px;
      opacity: 0.9;
    }
  }
  &__value {
    font-weight: 600;
    font-size: 18px;
    color: theme(black-dark);
    margin-bottom: 6px;
  }
}
</style>

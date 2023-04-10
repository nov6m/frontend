<template lang="pug">
.calc-mortgage-result
  .calc-mortgage-result__title Банковские предложения
  .calc-mortgage-result__table
    .calc-mortgage-result__thead
      .calc-mortgage-result__th Название банка
      .calc-mortgage-result__th Процентная ставка
      //.calc-mortgage-result__th Срок кредита
      .calc-mortgage-result__th Первый взнос
      .calc-mortgage-result__th Платеж в месяц
    .calc-mortgage-result__body
      component.calc-mortgage-result__item(
        v-for="(item, idx) in formattedItems"
        :key="idx"
        :is="item.url ? 'v-link' : 'div'"
        :to="item.url"
        external
        target="_blank"
        :class="{active: item.is_custom}"
        @click="item.url ? null : modalShow({code: 'mortgage',  params: {...item, ...selectedData, subject: 'Заказ консультации по ипотеке' }})"
      )
        .calc-mortgage-result__td.calc-mortgage-result__td--bold
          v-img.calc-mortgage-result__logo(
            v-if="item.icon"
            :src="item.icon"
            :alt="item.bank"
            contain
          )
          .calc-mortgage-result__td-text
            | {{ item.bank }}
            span {{ ruFormat(item.payment) }} ₽
        .calc-mortgage-result__td
          | от {{ item.bid }}%
        //.calc-mortgage-result__td
        //  | от {{ item.term % 12 === 0 ? `${item.term / 12} ${wordByNumber(item.term / 12, 'beforeYear')}` : `${item.term} мес` }}
        .calc-mortgage-result__td
          | {{ item.min_initial ? `${item.min_initial}%` : '-' }}
        .calc-mortgage-result__td
          | {{ ruFormat(item.payment) }} ₽
      .calc-mortgage-result__show-more(
        v-if="!visibleAll"
        @click="visibleAll = true"
      ) Показать еще {{ items.length - formattedItems.length }} предложения
        v-icon.calc-mortgage-result__show-more-icon(icon="arrow-right")
</template>

<script>
import { ruFormat, wordByNumber } from '@/core/utils/numberFormat'

export default {
  name: 'CalcMortgageResult',
  props: {
    items: {
      type: Array,
      required: true
    },
    selectedData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      visibleAll: false
    }
  },
  computed: {
    formattedItems() {
      if (this.items.length > 5 && !this.visibleAll) {
        return this.items.slice(0, 5)
      }
      return this.items
    }
  },
  methods: {
    ruFormat,
    wordByNumber
  }
}
</script>

<style lang="scss" scoped>
.calc-mortgage-result {
  &__title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 22px;
  }
  &__item {
    cursor: pointer;
    min-height: 80px;
  }
  &__thead,
  &__item {
    display: grid;
    grid-template-columns: 29% 22% 22% 27%;
    gap: 5px;
    @include below($notebook) {
      grid-template-columns: 35% 32% 32%;
    }
    @include below($mobileDef) {
      grid-template-columns: 1fr 1fr;
      row-gap: 10px;
    }
  }
  &__thead {
    @include below($notebook) {
      grid-template-columns: 1fr;
    }
  }
  &__thead {
    margin-bottom: 18px;
    padding: 0 22px;
    @include below($notebook) {
      padding: 0;
    }
    @include below($mobileDef) {
      display: none;
    }
  }
  &__logo {
    width: 36px;
    min-width: 36px;
    height: 36px;
    margin-right: 15px;
    border-radius: theme(ui-radius);
    overflow: hidden;
  }
  &__item {
    padding: 21px 22px;
    border: 1px solid theme(grey-light);
    border-radius: theme(ui-radius-small);
    margin-bottom: 10px;
    transition: background-color 0.2s ease;
    &:hover,
    &.active {
      background-color: theme(current-extra-light-color);
    }
    @include below($notebook) {
      padding: 20px 15px;
    }
    @include below($mobileDef) {
      padding: 10px 16px;
    }
  }
  &__th,
  &__td {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &:first-child {
      text-align: left;
      justify-content: flex-start;
      @include below($mobileDef) {
        grid-column: span 3;
      }
    }
    @include below($notebook) {
      &:last-child {
        display: none;
      }
    }
  }
  &__td {
    &:first-child {
      span {
        display: none;
        @include below($notebook) {
          display: block;
          margin-top: 4px;
          font-weight: 400;
        }
      }
    }
  }
  &__td,
  &__th {
    font-size: 15px;
    &--bold {
      font-weight: 600;
    }
    @include below($desktopSml) {
      font-size: 14px;
    }
  }
  &__th {
    @include below($notebook) {
      display: none;
      &:first-child {
        display: flex;
      }
    }
  }
  &__show-more {
    margin-top: 30px;
    text-align: center;
    color: theme(current-color);
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: color 0.2s ease;
    &:hover {
      color: theme(current-dark-color);
    }
    &-icon {
      transform: rotate(90deg);
      margin-left: 17px;
      width: 9px;
      height: 9px;
    }
  }
}
</style>

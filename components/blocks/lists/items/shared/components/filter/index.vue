<template lang="pug">
.filter(
  :class="{opened: active}"
)
  .filter__inner
    //- .filter__head
    //-   .filter__title Фильтр
    //-   .filter__close(
    //-     @click="closeFiler"
    //-   )
    //-     v-icon.filter__close-icon(
    //-       icon="arrow-right"
    //-     )
    //-     | Назад
    .filter__wrapper
      item.filter__item(
        v-for="(filter, i) in filters"
        :key="filter.id"
        :filter="filter"
        @update:filter="updateFilterByIndex({item: $event, index: i})"
        @update="updateData"
      )
    //- .filter__btns
    //-   v-btn.filter__btn.filter__btn--mobile(
    //-     block
    //-     @click="closeFiler"
    //-   ) Применить
    //-   v-btn.filter__btn(
    //-     mode="grey"
    //-     block
    //-     @click="reset"
    //-   ) Сбросить
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Item from './shared/components/item'
import CalcMortgageResult from '@/components/blocks/lists/items/index'
import { isLastOddElem } from '@/core/utils/numberFormat'
import { checkEqualityUrlByParam } from '@/core/utils/url'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'TheFilter',
  components: {
    Item
  },
  model: {
    prop: 'active',
    event: 'update:active'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curTab: 0,
      filters: [
        {
          id: '0',
          filter: []
        }
      ]
    }
  },
  // computed: {
  //   ...mapGetters({
  //     countCars: 'filter/countItems',
  //     tabs: 'filter/tabs',
  //     activeTab: 'filter/activeTab',
  //     filters: 'filter/filters'
  //   })
  // },
  methods: {
    checkEqualityUrlByParam,
    isNotEmptyArray,
    isLastOddElem,
    ...mapMutations({
      setActiveTab: 'filter/SET_ACTIVE_TAB',
      setRequestData: 'filter/SET_REQUEST_DATA',
      updateFilterByIndex: 'filter/UPDATE_FILTER_BY_INDEX',
      resetRequestData: 'filter/RESET_REQUEST_DATA'
    }),
    changeCurrentTab(tab) {
      this.setActiveTab(tab)
      this.resetRequestData()
      this.setRequestData({ type: tab.type })
      this.$router.push(`${this.$route.path}?view=cars&type=${tab.type}`)
    },
    reset() {
      this.resetRequestData()
      this.updateData()
    },
    closeFiler() {
      this.$emit('update:active', false)
    },
    updateData() {
      this.$emit('update')
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  background: theme(white-color);
  position: sticky;
  top: 90px;
  left: 0;
  z-index: 5;
  border: 1px solid theme(grey-light);
  border-radius: theme(ui-radius);
  height: calc(100vh - 120px);
  overflow: hidden;
  @include below($notebook) {
    position: fixed;
    bottom: 0;
    left: 0;
    top: unset;
    width: 100%;
    height: calc(100vh - 74px);
    transform: translateX(-100%);
    transition: 0.2s ease-in;
    z-index: 100;
    border: none;
    border-radius: 0;
  }

  &.opened {
    transform: translateX(0);
  }
  &__wrapper {
    padding: 30px 30px 0;
    @include below($notebook) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 45px;
      row-gap: 25px;
      padding-top: 15px;
      padding-bottom: 30px;
    }
    @include below($tablet) {
      grid-template-columns: 1fr;
      padding: 10px 24px 20px;
      row-gap: 15px;
    }
    @include below($mobileLrg) {
      padding: 10px 16px 20px;
    }
  }
  &__inner {
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    overflow-x: hidden;
    direction: ltr;
    scrollbar-color: #b2b2b2 #e4e4e4;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: #e4e4e4;
      border-radius: 50px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 50px;
      background: #b2b2b2;
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
    }
    @include below($notebook) {
      max-height: unset;
      position: relative;
      top: 0;
      z-index: 5;
      height: 100%;
      overflow-y: auto;
    }
  }

  &__head {
    display: none;
    @include below($notebook) {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      display: block;
      padding: 40px 30px 30px;
      background-color: theme(white-color);
      z-index: 11;
    }
    @include below($tablet) {
      padding: 30px 24px 20px;
    }
    @include below($mobileLrg) {
      padding: 20px 16px 10px;
    }
  }

  &__close {
    display: flex;
    align-items: center;
    color: theme(current-color);
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
  }
  &__close-icon {
    width: 10px;
    height: 12px;
    transform: rotate(180deg);
    margin-right: 16px;
  }
  &__title {
    margin-bottom: 17px;
    font-weight: 600;
    text-align: center;
    color: theme(grey-dark);
    @include below($tablet) {
      margin-bottom: 10px;
    }
  }
  &__item {
    padding-bottom: 20px;
    @include below($notebook) {
      padding-bottom: 0;
    }
  }
  &__btns {
    position: sticky;
    bottom: 0;
    left: 0;
    padding: 15px 30px 37px;
    background-color: theme(white-color);
    z-index: 7;
    @include below($notebook) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 45px;
    }
    @include below($tablet) {
      padding: 10px 24px 25px;
      column-gap: 20px;
    }
    @include below($mobileLrg) {
      padding: 10px 16px 20px;
      grid-template-columns: 1fr;
      column-gap: unset;
      row-gap: 5px;
    }
  }
  &__btn {
    &--mobile.v-btn {
      display: none;
      @include below($notebook) {
        display: flex;
      }
    }
  }
}
</style>

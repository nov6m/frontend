<template lang="pug">
.list-mortgage-promo(
  v-if="Object.keys(items).length && selectValue"
)
  v-container
    .list-mortgage-promo__head
      v-title.list-mortgage-promo__title(
        v-if="fields.title"
        v-text="fields.title"
      )
      v-description.list-mortgage-promo__descr(
        v-if="fields.description"
        v-text="fields.description"
      )
    .list-mortgage-promo__open(
      v-if="contentDisplay !== 'block'"
      @click="contentDisplay = 'block'"
    )
      | Развернуть
      v-icon.list-mortgage-promo__open-icon(
        icon="arrow-down"
      )
    .list-mortgage-promo__content(
      :style="{display: contentDisplay}"
    )
      v-select.list-mortgage-promo__select(
        v-model="selectValue"
        :options="tabs"
        placeholder="Все виды ипотеки"
        openDirection="bottom"
        :searchable="false"
        :allow-empty="false"
      )
      v-tabs.list-mortgage-promo__tabs(
        v-model="tab"
      )
        v-tab.list-mortgage-promo__tab(
          v-for="tab in tabs"
          :key="tab"
          @click="selectValue = tab"
        ) {{ tab }}
      .list-mortgage-promo__items
        card(
          v-for="(item, idx) in items[selectValue]"
          :key="idx"
          :img="item.image"
          :title="item.name"
          :description="item.text"
          :mark="item.mark"
          @click="openModal(item.form)"
        )
</template>

<script>
import card from './shared/components/card'
import Api from '../../../../core/Api'
import { isNotEmptyArray } from '../../../../core/utils/type'

export default {
  name: 'ListMortgagePromo',
  components: {
    card
  },
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      contentDisplay: '',
      tab: 0,
      selectValue: '',
      tabs: [],
      items: []
    }
  },
  async fetch() {
    const data = await Api.getFavorableMortgage()
    this.tabs = []
    this.items = data
    for (const dataKey in data) {
      this.tabs.push(dataKey)
    }
    this.selectValue = isNotEmptyArray(this.tabs) ? this.tabs[0] : ''
  },
  methods: {
    openModal(form) {
      this.modalShow({
        code: form?.code,
        buttonText: form?.btn_text,
        title: form?.name,
        subtitle: form?.sub_name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-mortgage-promo {
  &__title,
  &__descr {
    margin-bottom: 15px;
  }
  &__title {
    @include below($tablet) {
      text-align: center;
    }
  }
  &__head {
    @include below($tablet) {
      margin: 0 -10px;
      padding: 40px 10px 5px;
      min-height: 200px;
      background: url('@/assets/img/promo-mortgage.png') right bottom/cover
        no-repeat;
    }
  }
  &::v-deep(.list-mortgage-promo__tab) {
    margin-right: 17px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__tabs {
    margin-bottom: 26px;
    @include below($tablet) {
      display: none !important;
    }
  }
  &__content {
    @include below($tablet) {
      display: none;
      margin-top: 15px;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 26px;
    @include below($desktopSml) {
      grid-template-columns: repeat(3, 1fr);
    }
    @include below($notebook) {
      grid-template-columns: 1fr 1fr;
    }
    @include below($tablet) {
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 10px;
      gap: 13px;
    }
  }
  &__item {
    display: block;
    @include below($tablet) {
      width: 268px;
      min-width: 268px;
    }
  }
  &__select {
    width: 248px;
    display: none;
    margin-bottom: 20px;
    @include below($tablet) {
      display: block;
    }
  }
  &__open {
    display: none;
    margin-top: 15px;
    @include below($tablet) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-icon {
      width: 24px;
      height: 24px;
      color: theme(current-color);
      margin-top: 5px;
    }
  }
}
</style>

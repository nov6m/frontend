<template lang="pug">
.sales-map-sidebar
  template(
    v-if="selected && !isTablet"
  )
    .sales-map-sidebar__back(
      @click="$emit('update:selected', null)"
    )
      v-icon.sales-map-sidebar__back-icon(
        icon="arrow-right"
      )
      | Назад
    sidebar-content(
      :name="selected.name"
      :img="selected.image"
      :worktime="selected.workTime"
      :address="selected.address"
      :tel="selected.phone"
      :coords="getCoordsFromString(selected.coords)"
    )
  template(
    v-else-if="!selected || isTablet"
  )
    v-title.sales-map-sidebar__title(
      v-if="title"
      tag="h2"
    ) {{ title }}
    .sales-map-sidebar__items
      .sales-map-sidebar__item(
        v-for="(item, idx) in items"
        @click="$emit('update:selected', getChangeValue(item))"
        :class="{active: selected && selected.id === item.id}"
        :key="idx"
      )
        .sales-map-sidebar__wrap-head
          .sales-map-sidebar__head
            .sales-map-sidebar__name {{ item.name }}
            .sales-map-sidebar__address(
              v-if="item.address"
            ) {{ item.address }}
          v-icon.sales-map-sidebar__target(
            icon="arrow-down"
          )
        client-only
          slide-up-down(
            v-if="isTablet"
            :active="selected && selected.id === item.id"
          )
            sidebar-content(
              :name="item.name"
              :img="item.image"
              :worktime="item.workTime"
              :address="item.address"
              :tel="item.phone"
              :coords="getCoordsFromString(item.coords)"
            )
            y-map.sales-map-sidebar__map(
              :selected="selected"
              :items="items"
            )
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
import SidebarContent from './shared/components/sidebar-content'
import yMap from './map'
import size from '@/core/mixins/size'
import { getCoordsFromString } from '@/core/utils/coords'

export default {
  name: 'MapSalesSidebar',
  components: { SidebarContent, SlideUpDown, yMap },
  mixins: [size],
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      required: true
    },
    selected: {
      required: true
    }
  },
  methods: {
    getCoordsFromString,
    getChangeValue(item) {
      if (this.isTablet && this.selected && this.selected.id === item.id) {
        return null
      }
      return item
    }
  }
}
</script>

<style lang="scss" scoped>
.sales-map-sidebar {
  background: theme(white-color);
  padding: 50px 35px;
  display: flex;
  flex-direction: column;
  @include below($desktopSml) {
    padding: 35px 20px;
  }
  @include below($notebook) {
    padding: 20px 15px;
  }
  @include below($tablet) {
    padding: 23px 0;
  }
  &__title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 25px;
    @include below($notebook) {
      margin-bottom: 15px;
    }
  }
  &__item {
    padding: 18px 0;
    border-bottom: 1px solid #f1f1f1;
    cursor: pointer;
    &.active {
      @include below($tablet) {
        .sales-map-sidebar__address {
          display: none;
        }
        .sales-map-sidebar__target {
          transform: rotate(180deg);
        }
      }
    }
  }
  &__wrap-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__target {
    display: none;
    width: 20px;
    height: 20px;
    @include below($tablet) {
      display: block;
    }
  }
  &__address {
    font-size: 14px;
    color: theme(grey-dark);
    margin-top: 4px;
  }
  &__back {
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &-icon {
      margin-right: 16px;
      transform: rotate(180deg);
      color: theme(current-color);
      width: 14px;
      height: 14px;
    }
  }
  &__map {
    @include below($tablet) {
      height: 400px;
      margin-top: 25px;
    }
  }
}
</style>

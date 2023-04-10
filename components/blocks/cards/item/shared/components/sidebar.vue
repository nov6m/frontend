<template lang="pug">
.item-sidebar(
  :class="{opened: visibleAllParams}"
)
  v-title.item-sidebar__title(
    v-if="title"
    tag="h1"
  ) {{ title }}
  .item-sidebar__subtitle(v-if="subtitle" ) {{ subtitle }}
  .item-sidebar__tags(
    v-if="status"
  )
    .item-sidebar__tag {{ status }}
  ul.item-sidebar__list
    li.item-sidebar__item(
      v-for="(item, idx) in formatItems"
      :key="idx"
    )
      .item-sidebar__label {{ item.label }}
      .item-sidebar__value {{ item.value }}
    li.item-sidebar__more(
      v-if="isManyItems"
      @click="visibleAllParams = !visibleAllParams"
    ) {{ visibleAllParams ? 'Скрыть' : 'Все характеристики квартиры' }}
      v-icon.item-sidebar__more-icon(
        icon="arrow-right"
      )
</template>

<script>
import { isArray } from '@/core/utils/type'

export default {
  name: 'ItemSidebar',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    params: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visibleAllParams: false
    }
  },
  computed: {
    isManyItems() {
      return isArray(this.params) && this.params.length > 7
    },
    formatItems() {
      if (this.isManyItems) {
        return this.visibleAllParams ? this.params : this.params.slice(0, 7)
      }
      return this.params
    }
  }
}
</script>

<style lang="scss" scoped>
.item-sidebar {
  height: 100%;
  background: theme(white-color);
  border: 1px solid theme(grey-light);
  border-radius: theme(ui-radius-small);
  padding: 35px 35px 25px;
  @include below($desktopSml) {
    padding: 35px 25px 25px;
  }
  @include below($tablet) {
    padding: 25px 25px 20px;
  }
  @include below($mobileLrg) {
    padding: 25px 17px 15px;
  }
  &.opened {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: unset;
    z-index: 1;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    .item-sidebar {
      &__more-icon {
        transform: rotate(270deg);
      }
    }
  }
  &__subtitle {
    margin-top: 2px;
    font-weight: 600;
    font-size: 16px;
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 5px;
  }
  &__tag {
    text-transform: capitalize;
    background-color: theme(current-extra-light-color);
    border-radius: theme(ui-radius-small);
    font-weight: 600;
    font-size: 14px;
    color: theme(current-color);
    padding: 6px 11px;
  }
  &__item {
    padding: 15px 0 6px;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
  &__label,
  &__value {
    font-size: 15px;
  }
  &__value {
    color: theme(grey-dark);
  }
  &__more {
    margin-top: 10px;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
  }
  &__more-icon {
    margin-left: 15px;
    width: 12px;
    height: 12px;
    transform: rotate(90deg);
    transition: transform 0.15s ease;
  }
}
</style>

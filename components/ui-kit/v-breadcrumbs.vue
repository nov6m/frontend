<template lang="pug">
.v-breadcrumbs(
  v-if="Array.isArray(items) && items.length > 0"
)
  ul.v-breadcrumbs__list(
    itemscope
    itemtype="https://schema.org/BreadcrumbList"
  )
    li.v-breadcrumbs__item(
      v-for="(item,index) in items"
      v-if="item.url !== '-'"
      itemscope
      itemprop="itemListElement"
      itemtype="https://schema.org/ListItem"
    )
      meta(
        itemprop="position"
        :content="index"
      )
      nuxt-link.v-breadcrumbs__link(
        itemprop="item"
        :to="item.url || '/'"
      )
        span(
          itemprop="name"
        ) {{ applyModifiersToString(item.name) }}
</template>

<script>
import { applyModifiersToString } from '../../core/utils/tags'

export default {
  name: 'VBreadcrumbs',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    applyModifiersToString
  }
}
</script>

<style lang="scss" scoped>
.v-breadcrumbs {
  @include below($tablet) {
    overflow-x: auto;
    padding-bottom: 8px;
  }
  &__list {
    display: flex;
  }
  &__item {
    position: relative;
    padding-right: 32px;
    display: flex;
    font-weight: 600;
    font-size: 14px;
    &:last-child {
      padding-right: 0;
      opacity: 0.8;
      &:after {
        display: none;
      }
    }
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 14px;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 50%;
      transform: translateY(-50%);
    }
  }

  &__link {
    cursor: pointer;
    white-space: nowrap;
  }

  &__item:last-child &__link {
    pointer-events: none;
  }
}
</style>

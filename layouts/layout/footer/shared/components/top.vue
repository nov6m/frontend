<template lang="pug">
.layout-footer-top(
  v-if="isNotEmptyArray(Object.keys(socials)) || isNotEmptyArray(infoItems)"
)
  .layout-footer-top__socials(
    v-if="isNotEmptyArray(Object.keys(socials))"
  )
    v-link.layout-footer-top__social-item(
      v-for="(value, name, idx) in socials"
      :key="idx"
      :to="value"
      v-if="value"
      mode="link"
      external
    )
      v-icon.layout-footer-top__social-icon(
        :icon="name"
        mode="outline"
        rounded
      )
  .layout-footer-top__info(
    v-if="isNotEmptyArray(infoItems)"
  )
    .layout-footer-top__info-item(
      v-for="(item, idx) in infoItems"
      :key="idx"
    )
      .layout-footer-top__info-label(
        v-if="item.label"
      ) {{ item.label }}
      component.layout-footer-top__info-value(
        v-if="item.value"
        :is="item.href ? 'a' : 'div'"
        :href="item.href"
      ) {{ item.value }}
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'LayoutFooterTop',
  props: {
    socials: {
      type: Object,
      default () {
        return {}
      }
    },
    infoItems: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.layout-footer-top {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 25px 0;
  @include below($tablet) {
    padding: 20px 0;
  }
  @include below($mobileDef) {
    flex-direction: column;
    justify-content: center;
  }
  &__info, &__info-item {
    display: flex;
    align-items: center;
  }
  &__info-item {
    margin-left: 45px;
    @include below($tablet) {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    @include below($mobileDef) {
      margin-left: 0;
      margin-top: 10px;
    }
  }
  &__info-label {
    margin-right: 26px;
    font-size: 14px;
    color: theme(grey-dark);
    @include below($tablet) {
      margin-right: 0;
      margin-bottom: 5px;
    }
  }
  &__info-value {
    font-weight: 600;
    font-size: 20px;
  }
  &__social-item {
    margin-right: 15px;
    color: theme(grey-dark);
  }
  &__social-icon {
    width: 40px;
    height: 40px;
  }
}
</style>

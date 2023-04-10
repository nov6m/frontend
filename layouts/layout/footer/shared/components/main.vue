<template lang="pug">
.layout-footer-main
  .layout-footer-main__info
    v-img.layout-footer-main__logo(
      v-if="logo"
      :src="logo"
      contain
    )
    .layout-footer-main__info-item(
      v-if="address"
    )
      .layout-footer-main__info-label Юридический адрес:
      .layout-footer-main__info-value {{ address }}
    .layout-footer-main__info-item(
      v-if="phone"
    )
      .layout-footer-main__info-label Телефон:
      v-link.layout-footer-main__info-value(
        :to="`tel:${phone}`"
        external
      ) {{ phone }}
    .layout-footer-main__info-item(
      v-if="mail"
    )
      .layout-footer-main__info-label Свяжитесь с нами:
      v-link.layout-footer-main__info-value(
        :to="`mailto:${mail}`"
        external
      ) {{ mail }}
  nav.layout-footer-main__nav
    .layout-footer-main__nav-col(
      v-for="(col, idx) in nav"
      :key="idx"
      v-if="isNotEmptyArray(col.items)"
    )
      .layout-footer-main__label(
        v-if="col.label"
      ) {{ col.label }}
      v-link.layout-footer-main__nav-item(
        v-for="(item, i) in col.items"
        :key="i"
        :to="item.href"
        v-if="item.href"
        :external='item.external'
        target='_self'
      ) {{ item.label }}
  .layout-footer-main__addresses(
    v-if="isNotEmptyArray(addresses)"
  )
    .layout-footer-main__label График работы
    .layout-footer-main__address(
      v-for="(address, idx) in addresses"
      :key="idx"
    ) {{ address }}
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'LayoutFooterMain',
  props: {
    addresses: {
      type: Array,
      default() {
        return []
      }
    },
    nav: {
      type: Array,
      default() {
        return []
      }
    },
    phone: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    },
    mail: {
      type: String,
      default: ''
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.layout-footer-main {
  padding: 48px 0 5px;
  display: grid;
  grid-template-columns: 0.2fr 0.6fr 0.2fr;
  column-gap: 25px;
  @include below($tablet) {
    grid-template-columns: 1fr 1fr;
    row-gap: 25px;
  }
  &__label {
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 20px;
    @include below($mobileDef) {
      margin-bottom: 10px;
    }
  }
  &__address {
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 15px;
  }
  &__nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 70px;
    @include below($notebook) {
      grid-template-columns: 1fr 1fr;
      gap: 25px;
    }
    @include below($tablet) {
      grid-template-columns: 1fr;
    }
    @include below($mobileDef) {
      gap: 15px;
    }
  }
  &__nav-item {
    display: block;
    font-size: 14px;
    color: theme(grey-dark);
    margin-bottom: 12px;
    &:hover {
      text-decoration: underline;
    }
    @include below($mobileDef) {
      margin-bottom: 10px;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    @include below($tablet) {
      grid-row: span 2;
    }
  }
  &__logo {
    margin-bottom: 30px;
    max-height: 56px;
    object-position: left;
  }
  &__info-label {
    font-size: 14px;
    color: theme(grey);
    margin-bottom: 5px;
  }
  &__info-value {
    font-weight: 600;
    font-size: 15px;
  }
  &__info-item {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

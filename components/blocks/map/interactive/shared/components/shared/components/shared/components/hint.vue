<template lang="pug">
.hint(
  v-click-outside="() => { $emit('close') }"
)
  .hint__overlay(
    @click.stop="$emit('close')"
  )
  .hint__content
    v-icon.hint__close(
      icon="close"
      @click.stop="$emit('close')"
    )
    .hint__title(
      v-if="title"
    ) {{ title }}
    .hint__subtitle(
      v-if="subtitle"
    ) {{ subtitle }}
    .hint__text(
      v-if="total"
    ) {{ total }} {{ wordByNumber(total, 'apartment') }} в продаже
    .hint__items(
      v-if="isNotEmptyArray(items)"
    )
      .hint__item(
        v-for="(item, i) in items"
        :key="i"
      )
        v-link.hint__item-title(
          v-if="item.title"
          :to="item.href"
        ) {{ item.title }}
        .hint__item-subtitle(
          v-if="item.subtitle"
        ) {{ item.subtitle }}
    v-btn.hint__btn(
      v-if="href"
      mode="outline"
      block
      :to="href"
    ) {{ btnText }}
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'
import { wordByNumber } from '@/core/utils/numberFormat'

export default {
  name: 'MapHint',
  props: {
    title: {
      type: [String, Number],
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    total: {
      type: Number,
      default: 0
    },
    href: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    btnText: {
      type: String,
      default: 'Смотреть все'
    }
  },
  methods: {
    isNotEmptyArray,
    wordByNumber
  }
}
</script>

<style lang="scss" scoped>
.hint {
  @include below($notebook) {
    display: flex;
    align-items: flex-end;
  }
  &__overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    @include below($notebook) {
      display: block;
    }
  }
  &__content {
    padding: 30px;
    background-color: theme(white-color);
    border-radius: theme(ui-radius-large);
    color: #373737;
    min-width: 270px;
    font-weight: 600;
    cursor: default;
    box-shadow: 0 0 20px rgba(140, 140, 140, 0.35);
    @include below($desktopSml) {
      padding: 20px;
      min-width: 230px;
    }
    @include below($notebook) {
      padding-top: 30px;
      border-radius: 0;
      position: relative;
      width: 100%;
    }
  }
  &__title {
    font-weight: 700;
    font-size: 1.125rem;
    margin-bottom: 15px;
  }
  &__subtitle {
    font-size: 1rem;
    margin-bottom: 5px;
  }
  &__text {
    font-size: 0.813rem;
    color: theme(grey-dark);
    margin-bottom: 15px;
  }
  &__close {
    display: none;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 25px;
    right: 20px;
    cursor: pointer;
    @include below($notebook) {
      display: block;
    }
  }
  &__items {
    margin-bottom: 15px;
    @include below($notebook) {
      max-width: 50%;
    }
    @include below($mobileLrg) {
      max-width: 70%;
    }
    @include below($mobileLrg) {
      max-width: 100%;
    }
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    font-size: 14px;
  }
  &__item-subtitle {
    color: theme(grey-dark);
    font-weight: 400;
  }
  &__item-title {
    color: theme(current-color);
    transition: color 0.2s ease;
    &:hover {
      color: theme(current-dark-color);
    }
  }
}
</style>

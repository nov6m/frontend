<template lang="pug">
.sidebar-content
  .sidebar-content__head
    .sidebar-content__name {{ name }}
    v-img.sidebar-content__img(
      :src="img"
      :alt="name"
      cover
    )
    .sidebar-content__items
      v-link.sidebar-content__item(
        v-if="tel"
        :to="`tel:${tel}`"
        external
      )
        v-icon.sidebar-content__item-icon( icon="phone" )
        | {{ tel }}
      .sidebar-content__item(
        v-if="worktime"
      )
        v-icon.sidebar-content__item-icon( icon="time" )
        | {{ worktime }}
      .sidebar-content__item(
        v-if="address"
      )
        v-icon.sidebar-content__item-icon( icon="location" )
        | {{ address }}
  .sidebar-content__btm
    v-btn.sidebar-content__btn(
      @click="copyTextToClipboard(address); isCopied = true"
      mode="white"
      block
    ) {{ isCopied ? 'Адрес скопирован' : 'Скопировать адрес офиса'}}
    v-btn.sidebar-content__btn(
      :href="`https://yandex.ru/maps/?rtext=~${coords[0]},${coords[1]}`"
      target="_blank"
      mode="white"
      block
    ) Проложить маршрут
</template>

<script>
import { copyTextToClipboard } from '@/core/utils/copyToClipboard'
export default {
  name: 'SidebarContent',
  props: {
    name: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    worktime: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    tel: {
      type: String,
      default: ''
    },
    coords: {
      type: Array,
      default() {
        return [null, null]
      }
    }
  },
  data() {
    return {
      isCopied: false
    }
  },
  methods: {
    copyTextToClipboard
  }
}
</script>

<style lang="scss" scoped>
.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__head {
    margin-top: 40px;
    @include below($notebook) {
      margin-top: 20px;
    }
  }
  &__name {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 20px;
    @include below($notebook) {
      margin-bottom: 10px;
    }
    @include below($tablet) {
      display: none;
    }
  }
  &__img {
    width: 100%;
    border-radius: theme(ui-radius-small);
    overflow: hidden;
    height: 175px;
    margin-bottom: 25px;
    @include below($notebook) {
      height: 120px;
      margin-bottom: 10px;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    @include below($notebook) {
      margin-bottom: 6px;
    }
    &-icon {
      width: 24px;
      height: 24px;
      color: theme(current-color);
      margin-right: 10px;
    }
  }
  &__btm {
    margin-top: auto;
  }
  &__btn {
    margin-top: 4px;
  }
}
</style>

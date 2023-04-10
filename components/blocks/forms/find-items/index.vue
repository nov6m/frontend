<template lang="pug">
.form-find-items
  v-container
    .form-find-items__btns
      v-btn.form-find-items__btn(
        @click="activeMenu = true"
        mode="extra-light"
        block
      ) Выбрать квартиру
      v-btn.form-find-items__btn(
        :to="parkingURL"
        mode="extra-light"
        block
      ) Машиноместа
    .form-find-items__tabs(
      v-if="isNotEmptyArray(fields.links)"
    )
      v-link.form-find-items__tab.form-find-items__tab--active(
        underline
        active
      ) Квартиры
      v-link.form-find-items__tab(
        :to="parkingURL"
      ) Машиноместа
    .form-find-items__content(
      v-click-outside="close"
      :class="{active: activeMenu}"
    )
      .form-find-items__head
        .form-find-items__title Выбрать квартиру
        .form-find-items__close(
          @click="activeMenu = false"
        ) Закрыть
      form-find(
        :complex-id="id"
      )
</template>

<script>
import formFind from './shared/components/form'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'FormFindItems',
  components: {
    formFind
  },
  props: {
    fields: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      activeMenu: false
    }
  },
  computed: {
    parkingURL() {
      if (this.id) {
        return `/parking?complex=${this.id}`
      }
      return '/parking'
    }
  },
  methods: {
    isNotEmptyArray,
    close() {
      this.activeMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-find-items {
  &__content {
    @include below($desktopDef) {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: theme(white-color);
      transform: translateY(100%);
      padding: 36px 30px 55px;
      transition: transform 0.3s ease;
      box-shadow: 0 0 20px rgba(140, 140, 140, 0.35);
      z-index: 11;
      &.active {
        transform: translateY(0);
      }
    }
    @include below($tablet) {
      padding: 30px 16px;
      max-height: calc(100vh - 75px);
      overflow: auto;
    }
  }
  &__head {
    display: none;
    @include below($desktopDef) {
      display: block;
    }
  }
  &__tabs {
    margin-bottom: 33px;
  }
  &__tab {
    margin-right: 20px;
    @include below($desktopDef) {
      display: none;
    }
    &--active {
      color: theme(current-color);
      font-weight: 600;
    }
  }
  &__btns {
    display: none;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    @include below($desktopDef) {
      display: grid;
    }
    @include below($notebook) {
      gap: 25px;
    }
    @include below($tablet) {
      gap: 8px;
    }
    @include below($mobileDef) {
      grid-template-columns: 1fr;
    }
  }
  &__title {
    font-weight: 600;
    color: theme(grey-dark);
    margin-bottom: 18px;
    text-align: center;
  }
  &__close {
    text-align: right;
    font-weight: 600;
    color: theme(current-color);
    margin-bottom: 24px;
    cursor: pointer;
  }
}
</style>

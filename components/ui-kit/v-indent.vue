<template lang="pug">
component(
  :class="{[`v-indent v-indent__top--${top}`]: top, [`v-indent__bottom--${bottom}`]: bottom}"
  :is="tag"
)
  slot
</template>

<script>
export default {
  name: 'VIndent',
  props: {
    top: {
      type: String,
      default: ''
    },
    bottom: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'div'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-indent {
  &:empty {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  &__top {
    &--large {
      padding-top: 100px;
      @include below($notebook) {
        padding-top: 80px;
      }
      @include below($tablet) {
        padding-top: 60px;
      }
      @include below($mobileDef) {
        padding-top: 40px;
      }
    }
    &--default {
      padding-top: 50px;
      @include below($notebook) {
        padding-top: 40px;
      }
      @include below($tablet) {
        padding-top: 30px;
      }
      @include below($mobileDef) {
        padding-top: 20px;
      }
    }
    &--small {
      padding-top: 25px;
      @include below($notebook) {
        padding-top: 20px;
      }
      @include below($tablet) {
        padding-top: 15px;
      }
      @include below($mobileDef) {
        padding-top: 10px;
      }
    }
    &--x-small {
      padding-top: 10px;
      @include below($notebook) {
        padding-top: 8px;
      }
      @include below($tablet) {
        padding-top: 5px;
      }
      @include below($mobileDef) {
        padding-top: 2px;
      }
    }
  }
  &__bottom {
    &--large {
      padding-bottom: 100px;
      @include below($notebook) {
        padding-bottom: 80px;
      }
      @include below($tablet) {
        padding-bottom: 60px;
      }
      @include below($mobileDef) {
        padding-bottom: 40px;
      }
    }
    &--default {
      padding-bottom: 50px;
      @include below($notebook) {
        padding-bottom: 40px;
      }
      @include below($tablet) {
        padding-bottom: 30px;
      }
      @include below($mobileDef) {
        padding-bottom: 20px;
      }
    }
    &--small {
      padding-bottom: 25px;
      @include below($notebook) {
        padding-bottom: 20px;
      }
      @include below($tablet) {
        padding-bottom: 15px;
      }
      @include below($mobileDef) {
        padding-bottom: 10px;
      }
    }
    &--x-small {
      padding-bottom: 10px;
      @include below($notebook) {
        padding-bottom: 8px;
      }
      @include below($tablet) {
        padding-bottom: 5px;
      }
      @include below($mobileDef) {
        padding-bottom: 2px;
      }
    }
  }
}
</style>

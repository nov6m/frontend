<template lang="pug">
.slide-up-item(
  :class="{active}"
)
  .slide-up-item__head(
    @click="active = !active"
  )
    .slide-up-item__name {{ title }}
    v-icon.slide-up-item__icon(
      icon="plus"
    )
  slide-up-down.slide-up-item__text(
    :active="active"
  )
    v-text(v-html="text" )
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'

export default {
  name: 'SlideUpItem',
  components: {
    SlideUpDown
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: false
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-up-item {
  padding: 18px 0;
  border-bottom: 1px solid theme(grey-light);
  @include below($tablet) {
    padding: 8px 0;
  }
  &.active {
    .slide-up-item {
      &__icon {
        transform: rotate(45deg);
      }
    }
  }
  &__head {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__name {
    font-weight: 600;
    font-size: 18px;
    @include below($tablet) {
      font-size: 14px;
    }
  }
  &__icon {
    width: 22px;
    height: 22px;
    color: theme(current-color);
    transition: transform 0.2s ease;
    transform: rotate(180deg);
  }
  &__text {
    margin-top: 16px;
    @include below($tablet) {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>

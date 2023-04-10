<template lang="pug">
nuxt-link(
  v-if="to"
  :class="classes"
  :to="to"
  @click="$emit('click')"
)
  slot
div(
  v-else
  :class="classes"
  @click="$emit('click')"
)
  slot
</template>

<script>
export default {
  name: 'VTab',
  props: {
    to: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    classes() {
      return {
        'v-tab': true,
        active: this.active && !this.to,
        [this.mode]: this.mode
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-tab {
  cursor: pointer;
  &.combined {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 3px 12px;
    border: 1px solid theme(grey-light);
    font-weight: 400;
    font-size: 14px;
    &.active {
      border-top: 1px solid theme(current-color);
      border-bottom: 1px solid theme(current-color);
      background: theme(current-extra-light-color);
    }
    &:first-child {
      border-radius: theme(ui-radius-small) 0 0 theme(ui-radius-small);
      &.active {
        border-right-color: theme(grey-light);
        border-left: 1px solid theme(current-color);
      }
    }
    &:last-child {
      border-radius: 0 theme(ui-radius-small) theme(ui-radius-small) 0;
      &.active {
        border-right: 1px solid theme(current-color);
      }
    }
    &:not(:first-child) {
      border-left: none;
    }
  }
  &.default {
    padding: 13.5px 18px;
    border-radius: theme(ui-radius);
    border: 1px solid theme(grey-light);
    transition: all 0.25s ease;
    &.active {
      border-color: theme(current-color);
      background-color: theme(current-extra-light-color);
    }
    &:hover {
      color: theme(current-color);
      border-color: theme(current-color);
    }
  }
  &.underline {
    font-weight: 600;
    font-size: 15px;
    position: relative;
    color: theme(grey-dark);
    transition: color 0.25s ease;
    &.active {
      color: theme(current-color);
      &:after {
        content: '';
        position: absolute;
        bottom: -10px;
        width: 100%;
        left: 0;
        border-bottom: 1.5px solid theme(current-color);
      }
    }
    &:hover {
      color: theme(current-dark-color);
    }
  }
  &.secondary {
    padding: 10px 38px;
    font-weight: 600;
    font-size: 16px;
    color: theme(blue);
    border-radius: theme(ui-radius);
    &.active {
      color: theme(white-color);
      background-color: theme(blue);
    }
    @include below($tablet) {
      padding: 9px 17px;
    }
  }
}
</style>

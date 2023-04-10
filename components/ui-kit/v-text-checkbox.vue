<template lang="pug">
.v-text-checkbox(
  :class="{[mode]: mode, active: value, block, small, large}"
  @click="$emit('change', !value)"
)
  slot
</template>

<script>
export default {
  name: 'VTextCheckbox',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      default: 'default'
    },
    block: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-text-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5px 16px;
  height: 45px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 14px;
  &.block {
    display: flex;
  }
  &.small {
    height: 40px;
  }
  &.large {
    height: 50px;
  }
  &.default {
    border: 1px solid theme(grey-light);
    color: theme(grey-dark);
    border-radius: theme(ui-radius);
    &:hover {
      color: theme(current-color);
      border-color: theme(current-color);
    }
    &.active {
      background-color: theme(current-extra-light-color);
      color: theme(current-color);
      border-color: theme(current-color);
    }
  }
}
</style>

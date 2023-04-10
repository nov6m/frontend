<template lang="pug">
.v-icon(
  v-if="icon"
  :class="{[mode]: mode, rounded}"
  @click="$emit('click', $event)"
)
  svg-icon.v-icon__icon(
    :name="icon"
  )
</template>

<script>
export default {
  name: 'VSocialItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'default'
    },
    rounded: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &__icon {
    width: inherit;
    height: inherit;
    transition: all 0.25s ease;
  }
  &.rounded {
    border-radius: 50%;
  }
  &.outline {
    transition: all 0.25s ease;
    padding: 8px;
    border: 1px solid theme(grey-dark);
    &:hover {
      border: 1px solid theme(current-color);
      .v-icon__icon,
      &::v-deep(svg) {
        fill: theme(current-color);
        color: theme(current-color);
      }
    }
  }
}
</style>

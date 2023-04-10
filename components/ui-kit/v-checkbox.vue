<template lang="pug">
.v-checkbox(
  @click="$emit('change', !value)"
  :class="{error}"
)
  svg-icon.v-checkbox__icon(
    :name="curIcon"
  )
  .v-checkbox__label(
    v-if="hasLabel"
  )
    slot
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'VCheckbox',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    trueIcon: {
      type: String,
      default: ''
    },
    falseIcon: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    curIcon() {
      if (this.value) {
        return this.trueIcon || 'checked'
      }
      return this.falseIcon || 'unchecked'
    },
    hasLabel() {
      return isNotEmptyArray(this.$slots.default)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-checkbox {
  display: flex;
  align-items: center;
  &.error .v-checkbox__icon {
    border: 1px solid theme(current-dark-color);
    border-radius: 4px;
  }
  &__icon {
    color: theme(current-color);
    width: 24px;
    min-width: 24px;
    height: 24px;
    cursor: pointer;
  }
  &__label {
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>

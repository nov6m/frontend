<template lang="pug">
svg-icon.v-toggle(
  :name="curIcon"
  @click="$emit('change', !value)"
)
</template>

<script>
export default {
  name: 'VToggle',
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
    }
  },
  computed: {
    curIcon() {
      if (this.value) {
        return this.trueIcon || 'toggle-on'
      }
      return this.falseIcon || 'toggle-off'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-toggle {
  color: theme(current-color);
  width: 35px;
  min-width: 35px;
  height: 20px;
  cursor: pointer;
}
</style>

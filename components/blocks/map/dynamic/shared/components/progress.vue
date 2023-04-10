<template lang="pug">
.dynamic-map-progress
  v-circle-progress.dynamic-map-progress__progress(
    v-model="curValue"
    :stroke-width="16"
  )
    .dynamic-map-progress__progress-value(
      slot="value"
    )
      span {{ value }}
      |/10
  .dynamic-map-progress__label(
    v-if="label"
  ) {{ label }}
</template>

<script>
export default {
  name: 'DynamicMapProgress',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
  computed: {
    curValue() {
      return this.value * 10
    }
  }
}
</script>

<style lang="scss" scoped>
.dynamic-map-progress {
  background-color: theme(white-color);
  padding: 10px 22px;
  display: flex;
  align-items: center;
  &__progress {
    margin-right: 20px;
  }
  &__progress-value {
    font-weight: 400;
    span {
      font-weight: 600;
    }
  }
  &__label {
    font-size: 14px;
  }
}
</style>

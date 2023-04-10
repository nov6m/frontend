<template lang="pug">
.v-circle-progress
  svg.v-circle-progress__ring(
    :width="width"
    :height="height"
    viewBox="0 0 120 120"
  )
    circle.v-circle-progress__meter(
      :cx="width"
      :cy="height"
      :r="radius"
      :stroke-width="strokeWidth"
      :stroke="emptyColor"
    )
    circle.v-circle-progress__circle(
      :cx="width"
      :cy="height"
      :r="radius"
      :stroke-width="strokeWidth"
      :stroke="fillColor"
      :style="{ strokeDashoffset : dashoffset, strokeDasharray : circumference }"
    )
  span.v-circle-progress__value
    slot(
      name="value"
    ) {{ value }}
</template>

<script>
export default {
  name: 'VCircleProgress',
  props: {
    value: {
      type: Number,
      required: true
    },
    fillColor: {
      type: String,
      default: '#106026'
    },
    emptyColor: {
      type: String,
      default: '#D5D5D6'
    },
    strokeWidth: {
      type: Number,
      default: 16
    },
    width: {
      type: Number,
      default: 60
    },
    height: {
      type: Number,
      default: 60
    }
  },
  computed: {
    radius() {
      return this.width + 6 - this.strokeWidth
    },
    progress() {
      return this.value / 100
    },
    circumference() {
      return 2 * Math.PI * this.radius
    },
    dashoffset() {
      return this.circumference * (1 - this.progress)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-circle-progress {
  display: flex;
  align-items: center;
  border-radius: 50%;
  background-color: transparent;
  position: relative;
  &__value {
    font-weight: 600;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__ring {
    transform: rotate(-90deg);
  }
  &__meter,
  &__circle {
    fill: none;
  }
  &__circle {
    stroke-linecap: round;
  }
}
</style>

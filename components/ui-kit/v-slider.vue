<template lang="pug">
vue-slider.v-slider(
  v-model="curValue"
  :class="{small, hideLabel}"
  :max="max"
  :min="min"
  :interval="interval"
  :marks="marks"
  :included="included"
  :hide-label="true"
  tooltip="none"
  @drag-end="$emit('change', value)"
)
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'VSlider',
  components: {
    VueSlider
  },
  props: {
    value: {
      type: [String, Number, Array],
      required: true
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    interval: {
      type: Number,
      default: 1
    },
    small: {
      type: Boolean,
      default: false
    },
    included: {
      type: Boolean,
      default: false
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    marks: {
      default: undefined
    }
  },
  computed: {
    curValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-slider {
  height: 5px !important;
  &.hideLabel {
    &::v-deep(.vue-slider-mark) {
      display: none;
    }
  }
  &.small {
    height: 3px !important;
    &::v-deep(.vue-slider) {
      &-dot {
        width: 14px !important;
        height: 14px !important;
      }
    }
  }
  &::v-deep(.vue-slider) {
    &-rail {
      margin-top: -2px;
      background-color: theme(grey-light);
    }

    &-dot {
      width: 20px !important;
      height: 20px !important;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      transition: transform 0.15s ease-in !important;

      &:hover {
        transform: scale(1.15) translate(-50%, -45%) !important;
      }
    }

    &-dot-handle {
      border: 5px solid theme(current-color);
      background-color: theme(white-color);
    }

    &-process {
      background-color: theme(current-color);
    }
  }
}
</style>

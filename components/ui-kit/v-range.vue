<template lang="pug">
.v-range(
  :class="{block, focus}"
)
  .v-range__inputs
    .v-range__input.v-range__input--min
      span От
      input(
        type="text"
        readonly
        :value="minValue"
      )
    .v-range__input.v-range__input--max
      span До
      input(
        type="text"
        readonly
        :value="maxValue"
      )
  vue-slider(
    v-model="curValue"
    :max="max"
    :min="min"
    :interval="interval"
    :contained="false"
    tooltip="none"
    @drag-start="focus = true"
    @drag-end="$emit('change', curValue); focus = false"
  )
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
import { ruFormat } from '@/core/utils/numberFormat'

export default {
  name: 'VRange',
  components: {
    VueSlider
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    format: {
      type: String,
      default: ''
    },
    eventChange: {
      type: Boolean,
      default: false
    },
    postfix: {
      type: String,
      default: ''
    },
    interval: {
      type: [Number, String],
      default: 1
    },
    max: {
      type: [Number, String],
      default: 1000
    },
    min: {
      type: [Number, String],
      default: 0
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focus: false,
      changeEventValue: [...this.value]
    }
  },
  computed: {
    curValue: {
      get() {
        return this.eventChange ? this.changeEventValue : this.value
      },
      set(val) {
        this.eventChange
          ? (this.changeEventValue = val)
          : this.$emit('input', val)
      }
    },
    minValue() {
      return this.getFormat(this.curValue[0], this.format) + ' ' + this.postfix
    },
    maxValue() {
      return this.getFormat(this.curValue[1], this.format) + ' ' + this.postfix
    }
  },
  watch: {
    value(val) {
      if (this.eventChange) {
        this.changeEventValue = val
      }
    }
  },
  methods: {
    getFormat: (val, format = 'number') => {
      if (format === 'number') {
        return ruFormat(val)
      } else {
        return val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-range {
  display: inline-flex;
  flex-direction: column;
  padding-top: 10px;
  margin-bottom: -16px;
  &.focus {
    .v-range {
      &__input {
        border-color: theme(current-color);
      }
    }
  }
  &.block {
    display: block;
  }
  &__inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: -10px;
    user-select: none;
  }

  &__input {
    width: 100%;
    height: 45px;
    font-size: 15px;
    border-top: 1px solid theme(grey-light);
    border-bottom: 1px solid theme(grey-light);
    background-color: theme(white-color);
    display: flex;
    align-items: center;
    transition: border-color 0.25s ease;
    span {
      font-size: 14px;
      color: theme(current-color);
      margin-right: 6px;
    }
    input {
      height: 100%;
      width: 100%;
      font-size: 14px;
      color: theme(grey-dark);
      border: none;
      pointer-events: none;
    }
    &--max {
      padding: 5px 20px 5px 10px;
      text-align: right;
      border-top-right-radius: theme(ui-radius);
      border-bottom-right-radius: theme(ui-radius);
      border-right: 1px solid theme(grey-light);
      border-left: none;
    }

    &--min {
      padding: 5px 10px 5px 20px;
      position: relative;
      border-top-left-radius: theme(ui-radius);
      border-bottom-left-radius: theme(ui-radius);
      border-left: 1px solid theme(grey-light);
      border-right: none;
      &:after {
        content: '';
        position: absolute;
        right: 0;
        height: 26px;
        width: 1px;
        background-color: theme(grey-light);
        top: 10px;
      }
    }
  }
  &::v-deep(.vue-slider) {
    height: 2px !important;
    .vue-slider-rail {
      margin-top: -8px;
      background-color: transparent;
    }

    .vue-slider-dot {
      width: 14px !important;
      height: 14px !important;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      transition: transform 0.15s ease-in !important;

      &:hover {
        transform: scale(1.15) translate(-50%, -45%) !important;
      }
    }

    .vue-slider-dot-handle {
      border: 5px solid theme(current-color);
      background-color: theme(white-color);
    }

    .vue-slider-process {
      background-color: theme(current-color);
    }
  }
}
</style>

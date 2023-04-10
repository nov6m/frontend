<template lang="pug">
.hint-map-point(
  :style="styles"
  :class="{largeText: title.length > 3}"
  @click="$emit('open')"
) {{ title }}
  slot
</template>

<script>
import { idealTextColor } from '@/core/utils/color'

export default {
  name: 'HintMapPoint',
  props: {
    title: {
      type: [String, Number],
      default: ''
    },
    statusInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    position: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    styles() {
      return {
        background: this.statusInfo.color,
        color: idealTextColor(this.statusInfo.color),
        top: `${this.position.top}%`,
        left: `${this.position.left}%`,
        'z-index': this.active ? 24 : 3
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hint-map-point {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background-color: theme(white-color);
  width: 38px;
  height: 38px;
  text-align: center;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  &.largeText {
    font-size: 14px;
    @include below($notebook) {
      font-size: 12px;
    }
  }
  @include below($notebook) {
    width: 28px;
    height: 28px;
    font-size: 20px;
  }
}
</style>

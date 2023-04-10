<template lang="pug">
transition(
  name="fade"
)
  .slide-notify(
    v-if="value"
    @mousedown="$emit('input', false)"
  )
    .slide-notify__content
      v-icon.slide-notify__icon(
        icon="slide-pointer"
      )
      .slide-notify__label пролистывайте все варианты
</template>

<script>
export default {
  name: 'SlideNotify',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    timeout: {
      type: Number,
      default: 3000
    }
  },
  mounted() {
    setTimeout(() => {
      this.$emit('input', false)
    }, this.timeout)
  }
}
</script>

<style lang="scss" scoped>
.slide-notify {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  &__content {
    background: theme(white-color);
    box-shadow: 0 0 20px rgba(140, 140, 140, 0.25);
    border-radius: theme(ui-radius);
    width: 142px;
    padding: 12px;
    font-size: 12px;
    text-align: center;
  }
  &__icon {
    width: 48px;
    height: 48px;
    animation: slideNotify 2s infinite ease-in-out;
  }
}
@keyframes slideNotify {
  from,
  to {
    transform: translateX(-50%);
  }
  50% {
    transform: translateX(50%);
  }
}
</style>

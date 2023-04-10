<template lang="pug">
.scheme-floor(
  :style="`grid-template-columns: repeat(${count + 1}, 30px)`"
)
  .scheme-floor__number {{ floor }}
  slot
</template>

<script>
export default {
  name: 'SchemeFloor',
  props: {
    count: {
      type: Number,
      default: 0
    },
    floor: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.scheme-floor {
  display: grid;
  gap: 8px;
  &__number {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: theme(grey-dark);
  }
}
</style>

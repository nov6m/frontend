<template lang="pug">
.about-stat-item
  .about-stat-item__value(
    v-if="value"
  ) {{ value }}
  .about-stat-item__label(
    v-if="label"
  ) {{ label }}
</template>

<script>
export default {
  name: 'AboutStatItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.about-stat-item {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__value {
    font-size: 30px;
    font-weight: 700;
    color: theme(current-color);
    margin-bottom: 15px;
  }
  &__label {
    margin-top: auto;
    color: theme(grey-dark);
    font-size: 15px;
  }
}
</style>

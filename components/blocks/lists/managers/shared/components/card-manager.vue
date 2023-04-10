<template lang="pug">
.card-manager
  v-img.card-manager__img(
    v-if="img"
    :src="img"
    :alt="name"
    contain
  )
  .card-manager__text
    .card-manager__name(
      v-if="name"
    ) {{ name }}
    .card-manager__position(
      v-if="position"
    ) {{ position }}
</template>

<script>
export default {
  name: 'CardManager',
  props: {
    name: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card-manager {
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: center;
  &__img {
    width: 230px;
    min-width: 230px;
    height: 230px;
    border-radius: 50%;
    overflow: hidden;
    @include below($desktopSml) {
      width: 150px;
      min-width: 150px;
      height: 150px;
    }
  }
  &__text {
    text-align: center;
  }
  &__name {
    font-weight: 700;
    font-size: 16px;
  }
  &__position {
    font-size: 14px;
    margin-top: 5px;
    color: theme(grey-dark);
  }
}
</style>

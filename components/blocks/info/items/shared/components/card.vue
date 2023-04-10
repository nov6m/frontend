<template lang="pug">
.items-card
  v-img.items-card__bg(
    v-if="img"
    :src="img"
    cover
  )
  v-img.items-card__icon(
    v-if="icon"
    :src="icon"
    contain
  )
  .items-card__text(
    v-if="text"
  ) {{ text }}
</template>

<script>
export default {
  name: 'ItemsCard',
  props: {
    img: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.items-card {
  position: relative;
  overflow: hidden;
  height: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: theme(current-color);
  color: theme(white-color);
  font-weight: 600;
  @include below($mobileLrg) {
    padding: 15px;
  }
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__text,
  &__icon {
    position: relative;
    z-index: 1;
  }
  &__icon {
    width: 60px;
    height: 60px;
    margin-bottom: 16px;
  }
}
</style>

<template lang="pug">
.card-info(
  :class="{main}"
)
  .card-info__text
    .card-info__title(
      v-if="title"
    ) {{ title }}
    .card-info__label(
      v-if="label"
    ) {{ label }}
  v-img.card-info__img(
    v-if="img"
    :src="img"
    :alt="title"
    contain
  )
</template>

<script>
export default {
  name: 'CardInfo',
  props: {
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    main: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.card-info {
  height: 170px;
  border-radius: theme(ui-radius);
  background: #faf9fa;
  padding: 25px;
  display: flex;
  gap: 30px;
  justify-content: space-between;
  @include below($desktopSml) {
    gap: 14px;
    padding: 17px;
    height: 120px;
  }
  @include below($notebook) {
    height: 100%;
    flex-direction: column;
  }
  @include below($tablet) {
    padding: 20px;
  }
  @include below($mobileDef) {
    height: 133px;
    flex-direction: row;
    align-items: center;
  }
  &.main {
    background: theme(current-color);
    .card-info__title,
    .card-info__label {
      color: theme(white-color);
    }
  }
  &__title {
    font-weight: 600;
    font-size: 40px;
    color: theme(current-color);
    @include below($desktopSml) {
      font-size: 28px;
    }
  }
  &__label {
    font-weight: 600;
    margin-top: 5px;
    color: theme(grey-dark);
    @include below($desktopSml) {
      font-size: 13px;
    }
  }
  &__img {
    margin-top: auto;
    width: 60px;
    height: 60px;
    @include below($desktopSml) {
      height: 50px;
      width: 50px;
    }
    @include below($notebook) {
      margin-left: auto;
    }
    @include below($mobileDef) {
      margin-top: unset;
    }
  }
}
</style>

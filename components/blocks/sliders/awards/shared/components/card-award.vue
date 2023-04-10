<template lang="pug">
.card-award(
  :class="{[color]: color}"
)
  .card-award__year(
    v-if="year"
  ) {{ year }}
  .card-award__description(
    v-if="description"
  ) {{ description }}
  v-img.card-award__img(
    v-if="img"
    :src="img"
    :alt="year"
    contain
  )
</template>

<script>
export default {
  name: 'CardAward',
  props: {
    img: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'current'
    },
    year: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card-award {
  position: relative;
  border-radius: theme(ui-radius);
  overflow: hidden;
  padding: 25px;
  height: 400px;
  @include below($notebook) {
    padding: 17px;
    height: 274px;
  }
  @include below($mobileDef) {
    height: 320px;
  }
  &.current {
    background: theme(current-color);
    color: theme(white-color);
  }
  &.dark {
    background: theme(black-color);
    color: theme(white-color);
  }
  &.light {
    background: #eeeeee;
    color: theme(black-color);
  }
  &__year {
    font-weight: 600;
    font-size: 16px;
    @include below($notebook) {
      font-size: 14px;
    }
  }
  &__description {
    font-weight: 600;
    font-size: 16px;
    margin-top: 10px;
    @include below($notebook) {
      font-size: 14px;
      margin-top: 5px;
    }
    @include below($mobileDef) {
      font-size: 18px;
    }
  }
  &__img {
    position: absolute;
    bottom: 0;
    right: 0;
    max-height: 50%;
    max-width: 100%;
    border-radius: 10px 0 0 0;
  }
}
</style>

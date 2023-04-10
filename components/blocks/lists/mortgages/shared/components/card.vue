<template lang="pug">
.mortgage-card(
  @click="$emit('click')"
)
  .mortgage-card__img-wrap(
    v-if="img"
  )
    v-img.mortgage-card__img(
      :src="img"
      :alt="title"
      cover
    )
  .mortgage-card__title(
    v-if="title"
  ) {{ title }}
  .mortgage-card__description(
    v-if="description"
  ) {{ description }}
</template>

<script>
export default {
  name: 'MortgageCard',
  props: {
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    mark: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.mortgage-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  @include below($tablet) {
    min-width: 268px;
    max-width: 268px;
  }
  &:hover {
    .mortgage-card {
      &__img {
        transform: scale(1.05);
      }
      &__title {
        color: theme(current-color);
      }
    }
  }
  &__img-wrap {
    position: relative;
    overflow: hidden;
    margin-bottom: 18px;
    border-radius: theme(ui-radius);
    @include below($tablet) {
      margin-bottom: 10px;
    }
  }
  &__img {
    width: 100%;
    height: 200px;
    transition: transform 0.25s ease;
    @include below($mobileDef) {
      height: 160px;
    }
  }
  &__mark {
    position: absolute;
    bottom: 15px;
    left: 15px;
    border-radius: theme(ui-radius-small);
    border: 3px solid theme(white-color);
    padding: 9px 18px;
    color: theme(white-color);
    font-weight: 700;
    font-size: 18px;
    @include below($notebook) {
      font-size: 16px;
      padding: 6px 12px;
      bottom: 10px;
      left: 10px;
    }
    @include below($tablet) {
      font-size: 14px;
    }
  }
  &__title {
    font-size: 18px;
    margin-bottom: 10px;
    transition: color 0.25s ease;
  }
  &__description {
    margin-top: auto;
    font-size: 15px;
  }
}
</style>

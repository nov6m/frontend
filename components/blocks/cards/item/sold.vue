<template lang="pug">
.item-sold
  .item-sold__bg
  v-container.item-sold__container
    .item-sold__content
      h1.item-sold__title(
        v-if="fields.title"
        v-text="fields.title"
      )
      v-btn.item-sold__btn(
        v-if="fields.btnText && fields.link"
        :to="fields.link"
      ) {{ fields.btnText }}
</template>

<script>
export default {
  name: 'ApartmentSold',
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-sold {
  position: relative;
  height: 767px;
  @include below($mobileLrg) {
    height: 600px;
  }
  &__bg {
    width: 100%;
    height: 100%;
    background-position: 60% bottom;
    background-image: url('@/assets/img/sold-404.png');
    background-repeat: no-repeat;
    background-size: cover;
    @include below($notebook) {
      background-position: 50% bottom;
    }
    @include below($tablet) {
      background-image: url('@/assets/img/sold-404-mobile.png');
    }
  }
  &__container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @include below($tablet) {
      justify-content: flex-start;
      align-items: flex-start;
      padding-top: 100px;
    }
  }
  &__content {
    width: 50%;
    @include below($tablet) {
      width: 80%;
    }
    @include below($mobileDef) {
      width: 100%;
    }
  }
  &__title {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 25px;
    max-width: 336px;
    @include below($mobileLrg) {
      font-size: 20px;
    }
  }
}
</style>

<template lang="pug">
.card-mortgage-small(
  @click="openModal"
)
  .card-mortgage-small__head
    .card-mortgage-small__title(
      v-if="title"
    ) {{ title }}
    span(
      v-if="mark"
    ) {{ mark }}
  .card-mortgage-small__btn
    v-icon.card-mortgage-small__btn-icon(
      icon="arrow-right"
    )
  v-img.card-mortgage-small__img(
    v-if="img"
    :src="img"
    :alt="title"
    contain
  )
</template>

<script>
export default {
  name: 'CardMortgageSmall',
  props: {
    title: {
      type: String,
      default: ''
    },
    mark: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    modal: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    openModal() {
      this.modalShow({
        title: this.modal.name,
        subtitle: this.modal.subName,
        buttonText: this.modal.btnText,
        code: this.modal.code
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-mortgage-small {
  position: relative;
  padding: 20px 20px 16px 20px;
  background: theme(white-color);
  border: 1px solid theme(grey-light);
  border-radius: theme(ui-radius);
  overflow: hidden;
  height: 170px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    .card-mortgage-small {
      &__title {
        color: theme(current-color);
      }
      &__btn {
        opacity: 1;
      }
    }
  }
  @include below($desktopSml) {
    padding: 15px 15px 10px 15px;
  }
  @include below($notebook) {
    height: 175px;
    padding: 20px 20px 16px 20px;
  }
  @include below($tablet) {
    height: 145px;
    padding: 17px 17px 12px 17px;
  }
  &__head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    @include below($desktopSml) {
      font-size: 12px;
    }
    @include below($notebook) {
      font-size: 16px;
    }
    @include below($tablet) {
      font-size: 14px;
    }
    span {
      white-space: nowrap;
    }
  }
  &__title {
    transition: color 0.2s ease;
  }
  &__img {
    position: absolute;
    right: 0;
    bottom: 0;
    max-height: 60%;
    max-width: 70%;
  }
  &__btn {
    opacity: 0;
    width: 40px;
    height: 40px;
    background-color: theme(current-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
    @include below($tablet) {
      display: none;
    }
    &-icon {
      width: 10px;
      height: 10px;
      color: theme(white-color);
    }
  }
}
</style>

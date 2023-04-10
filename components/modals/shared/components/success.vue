<template lang="pug">
.successModal
  v-icon.successModal__close(
    icon="close"
    @click="$emit('closePopup')"
  )
  v-icon.successModal__icon(
    icon="success"
  )
  .successModal__text(v-html="'Ваша заявка отправлена!\\n Спасибо!'" )
</template>

<script>
import ticket from '@/core/mixins/ticket'

export default {
  name: 'SuccessModal',
  mixins: [ticket]
}
</script>

<style lang="scss" scoped>
.successModal {
  height: 417px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 50px 40px 40px;
  position: relative;
  @include below($tablet) {
    padding: 30px 20px;
  }
  &__close {
    position: absolute;
    width: 15px;
    height: 15px;
    color: theme(grey-dark);
    top: 22px;
    right: 22px;
    cursor: pointer;
    @include below($tablet) {
      top: 12px;
      right: 12px;
    }
  }
  &__text {
    color: theme(green);
    font-size: 17px;
    white-space: pre-line;
    line-height: 1.5;
  }
  &__icon {
    width: 70px;
    height: 70px;
    margin-bottom: 23px;
  }
}
</style>

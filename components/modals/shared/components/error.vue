<template lang="pug">
.errorModal
  v-icon.errorModal__close(
    icon="close"
    @click="$emit('closePopup')"
  )
  v-icon.errorModal__icon(
    icon="error"
  )
  .errorModal__text Ошибка
  .errorModal__subtext Попробуйте ещё раз или позвоните по номеру
    v-link.errorModal__link(
      :to="`tel:${$store.getters['settings/getReceptionPhone']}`"
      external
    ) {{ $store.getters['settings/getReceptionPhone'] }}
</template>

<script>
import ticket from '@/core/mixins/ticket'

export default {
  name: 'ErrorModal',
  mixins: [ticket]
}
</script>

<style lang="scss" scoped>
.errorModal {
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
    color: theme(current-color);
    font-size: 17px;
    font-weight: 700;
  }
  &__icon {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
  &__subtext {
    font-weight: 600;
    font-size: 15px;
    max-width: 80%;
    margin: 3px auto 0;
    line-height: 1.3;
  }
  &__link {
    margin-left: 5px;
    font-weight: 700;
  }
}
</style>

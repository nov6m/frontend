<template lang="pug">
.smsModal
  v-icon.smsModal__close(
    icon="close"
    @click="$emit('closePopup')"
  )
  .smsModal__text
    p - Проверьте номер телефона. Если нашли ошибку, вернитесь на предыдущую страницу и ещё раз заполните все поля с уже правильным номером
    br
    p - Убедитесь, что у вас есть связь. Если сигнал слабый или его нет совсем, сообщения и звонки могут не дойти
    br
    p - Если номер верный и связь есть, позвоните нам по номеру&nbsp;
      v-link(
        v-if="$store.getters['settings/getSalePhone']"
        :to="`tel:${$store.getters['settings/getSalePhone']}`"
        mode="link"
        external
      ) {{ $store.getters["settings/getSalePhone"] }}.&nbsp;
      | Мы поможем разобраться
</template>

<script>
export default {
  name: 'SmsModal'
}
</script>

<style lang="scss" scoped>
.smsModal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
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
    font-size: 15px;
    white-space: pre-line;
    line-height: 18px;
  }
}
</style>

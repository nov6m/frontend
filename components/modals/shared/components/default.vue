<template lang="pug">
.defaultModal
  v-icon.defaultModal__close(
    icon="close"
    @click="$emit('closePopup')"
  )
  v-title.defaultModal__title(
    :class="{hasSubtitle: $attrs.subtitle}"
  ) {{ getValue('title', 'Заполните заявку, и мы перезвоним Вам в ближайшее время') }}
  .defaultModal__subtitle(
    v-if="$attrs.subtitle"
    v-html="getValue('subtitle')"
  )
  form.defaultModal__form
    v-input.defaultModal__field(
      placeholder="Ваше имя"
      v-model="form.name"
      :error="$v.form.name.$dirty && $v.form.name.$invalid ? 'Поле обязательно' : ''"
      block
    )
    v-input.defaultModal__field(
      placeholder="+7 (999) 999 99-99"
      v-model="form.phone"
      mask="+7 (###) ### ##-##"
      :error="$v.form.phone.$dirty && $v.form.phone.$invalid ? 'Поле обязательно' : ''"
      block
    )
    v-disclaimer.defaultModal__disclaimer(
      :btn="getValue('buttonText', 'Заказать звонок')"
      policy="/policy"
    ) {{ getValue('buttonText', 'Заказать звонок') }}
    v-btn.defaultModal__btn(
      @click="formHandler"
      :disabled="disabledBtn"
      block
    ) {{ getValue('buttonText', 'Заказать звонок') }}
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import ticket from '@/core/mixins/ticket'
export default {
  name: 'DefaultModal',
  mixins: [ticket],
  data() {
    return {
      form: {
        name: '',
        phone: '',
        code: this.getValue('code', 'service'),
        parking: this.getValue('parking', undefined)
      },
      disabledBtn: false
    }
  },
  validations: {
    form: {
      phone: { required, minLength: minLength(18) },
      name: { required }
    }
  },
  methods: {
    async formHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$v.$reset()
      this.disabledBtn = true
      await this.sendTicket({
        ...this.form,
        subject: 'Заказ консультации',
        ...(this.$attrs.params || {})
      })
      this.disabledBtn = false
    }
  }
}
</script>

<style lang="scss" scoped>
.defaultModal {
  padding: 50px 40px 40px;
  position: relative;
  @include below($tablet) {
    padding: 30px 20px;
  }
  &__title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 25px;
    text-align: center;
    &.hasSubtitle {
      margin-bottom: 10px;
    }
    @include below($tablet) {
      margin-bottom: 15px;
      font-size: 18px;
    }
  }
  &__subtitle {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
    @include below($tablet) {
      font-size: 14px;
    }
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
  &__field {
    margin-bottom: 10px;
  }
  &__disclaimer {
    margin-top: 5px;
    margin-bottom: 25px;
  }
}
</style>

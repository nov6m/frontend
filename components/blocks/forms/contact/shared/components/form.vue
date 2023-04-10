<template lang="pug">
.contact-form
  h2.contact-form__title(
    v-if="title"
  ) {{ title }}
  .contact-form__description(
    v-if="description"
  ) {{ description }}
  v-input.contact-form__field(
    v-model="form.name"
    placeholder="Ваше имя*"
    :error="$v.form.name.$dirty && $v.form.name.$invalid ? 'Поле обязательно' : ''"
    block
    large
  )
  v-input.contact-form__field(
    v-model="form.phone"
    placeholder="Ваш телефон*"
    mask="+7 (###) #### ##-##"
    :error="$v.form.phone.$dirty && $v.form.phone.$invalid ? 'Поле обязательно' : ''"
    block
    large
  )
  v-disclaimer.contact-form__field(
    :btn="btnText"
  )
  .contact-form__btn
    v-btn(
      block
      @click="formHandler"
    ) {{ btnText }}
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import ticket from '@/core/mixins/ticket'

export default {
  name: 'CalcMortgageForm',
  mixins: [ticket],
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    }
  },
  validations: {
    form: {
      phone: { required, minLength: minLength(18) },
      name: { required }
    }
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        code: this.getValue('code', 'service')
      },
      disabledBtn: false
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
        subject: 'Заказ консультации по ипотеке'
      })
      this.disabledBtn = false
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-form {
  background-color: theme(white-color);
  padding: 52px 42px;
  box-shadow: 0px 0px 30px rgba(140, 140, 140, 0.25);
  border-radius: theme(ui-radius);
  @include below($tablet) {
    padding: 30px 20px;
  }
  &__title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 18px;
    text-align: center;
    @include below($tablet) {
      font-size: 18px;
    }
  }
  &__description {
    font-size: 15px;
    color: theme(grey-dark);
    margin-bottom: 22px;
  }
  &__field {
    margin-bottom: 15px;
    &--flex {
      display: flex;
    }
  }
  &__btn {
    margin-top: 20px;
  }
  &__check {
    margin-right: 20px;
    @include below($mobileDef) {
      margin-right: 10px;
    }
  }
}
</style>

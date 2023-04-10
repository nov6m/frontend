<template lang="pug">
.offer-form
  .offer-form__wrap
    .offer-form__title(
      v-if="title"
      v-text="title"
    )
    .offer-form__subtitle(
      v-if="subtitle"
      v-text="subtitle"
    )
    form.offer-form__content
      v-input.offer-form__field(
        v-model="form.name"
        placeholder="Ваше имя*"
        :error="$v.form.name.$dirty && $v.form.name.$invalid ? 'Поле обязательно' : ''"
        block
        small
      )
      v-input.offer-form__field(
        v-model="form.phone"
        placeholder="Ваш телефон*"
        mask="+7 (###) #### ##-##"
        :error="$v.form.phone.$dirty && $v.form.phone.$invalid ? 'Поле обязательно' : ''"
        block
        small
      )
      v-btn.offer-form__btn(
        small
        @click='formHandler'
        block
      ) {{ btnText || 'Отправить' }}
      v-disclaimer.offer-form__disclaimer(
        :disclaimer-text="disclaimer"
        :btn="btnText || 'Отправить'"
      )
</template>

<script>
import ticket from '../../../../../../core/mixins/ticket'
import { minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'OfferForm',
  mixins: [ticket],
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    disclaimer: {
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
        phone: ''
      }
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
        subject: 'Заявка по спецпредложению'
      })
      this.disabledBtn = false
    }
  }
}
</script>

<style lang="scss" scoped>
.offer-form {
  @include below($tablet) {
    display: flex;
    justify-content: center;
  }
  &__wrap {
    background: #ffffff;
    box-shadow: 0 0 20px rgba(140, 140, 140, 0.2);
    border-radius: theme(ui-radius);
    padding: 40px 33px 55px;
    @include below($desktopSml) {
      padding: 27px 22px 33px;
    }
    @include below($notebook) {
      padding: 25px 17px 20px;
    }
    @include below($tablet) {
      max-width: 300px;
    }
    @include below($mobileSml) {
      max-width: 100%;
    }
  }
  &__title {
    font-weight: 600;
    font-size: 22px;
    text-align: center;
    @include below($desktopSml) {
      font-size: 16px;
    }
  }
  &__subtitle {
    margin-top: 8px;
    font-size: 15px;
    text-align: center;
    @include below($desktopSml) {
      font-size: 13px;
    }
  }
  &__content {
    margin-top: 12px;
  }
  &__field {
    margin-bottom: 6px;
  }
  &__btn {
    margin: 6px 0;
  }
}
</style>

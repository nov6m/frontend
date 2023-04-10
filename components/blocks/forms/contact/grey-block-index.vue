<template lang="pug">
.grey-block-contact
  v-container
    .grey-block-contact__wrapper
      .grey-block-contact__head
        v-title.grey-block-contact__title(
          v-if="fields.title"
          v-text="fields.title"
          tag="h2"
        )
        .grey-block-contact__subtitle(
          v-if="fields.subtitle"
          v-text="fields.subtitle"
        )
      .grey-block-contact__content
        .grey-block-contact__fields
          v-input.grey-block-contact__field(
            v-model="form.name"
            placeholder="Ваше имя*"
            :error="$v.form.name.$dirty && $v.form.name.$invalid ? 'Поле обязательно' : ''"
            block
            large
          )
          v-input.grey-block-contact__field(
            v-model="form.phone"
            placeholder="Ваш телефон*"
            :error="$v.form.phone.$dirty && $v.form.phone.$invalid ? 'Поле обязательно' : ''"
            mask="+7 (###) #### ##-##"
            block
            large
          )
          v-btn.grey-block-contact__btn(
            large
            block
            @click="formHandler"
          ) {{ fields.btnText }}
        v-disclaimer.grey-block-contact__disclaimer(
          :disclaimer-text="fields.disclaimer"
          :btn="fields.btnText"
        )
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import ticket from '@/core/mixins/ticket'

export default {
  name: 'GreyBlockIndex',
  mixins: [ticket],
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
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
      await this.sendTicket(this.form)
      this.disabledBtn = false
    }
  }
}
</script>

<style lang="scss" scoped>
.grey-block-contact {
  &__wrapper {
    background: theme(light);
    border-radius: theme(ui-radius);
    padding: 65px;
    display: grid;
    grid-template-columns: 310px auto;
    gap: 60px;
    align-items: center;
    @include below($desktopSml) {
      padding: 50px 30px;
      gap: 20px;
    }
    @include below($notebook) {
      grid-template-columns: 1fr;
    }
    @include below($tablet) {
      padding: 35px 22px;
    }
  }
  &__subtitle {
    margin-top: 8px;
  }
  &__fields {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    @include below($tablet) {
      grid-template-columns: 1fr 1fr;
    }
    @include below($mobileLrg) {
      grid-template-columns: 1fr;
    }
  }
  &__disclaimer {
    margin-top: 15px;
  }
}
</style>

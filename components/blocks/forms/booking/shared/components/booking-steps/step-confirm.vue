<template>
  <section class="step-confirm">
    <div class="step-confirm__inner">
      <div class="step-confirm__actions" @click="previous">
        <svg-icon class="step-confirm__arrow-icon" name="arrow-swiper-nav" />

        <p>Вернутся назад</p>
      </div>

      <div class="step-confirm__content">
        <v-title class="step-confirm__title" small>
          Мы отправили код на номер
          {{ String(formData?.phone).replace(/\s/g, '&nbsp;') }}. <br />
          Введите его в поле ниже
        </v-title>

        <form class="step-confirm__form">
          <div class="step-confirm__form-field">
            <v-input
              v-model="form.smsCode"
              mask="######"
              placeholder="Код из СМС"
              :error="error"
            />
          </div>

          <div class="step-confirm__from-actions">
            <v-btn
              block
              :disabled="getFormStatus"
              @click="formHandler"
              v-text="'Подтвердить'"
            />
          </div>
        </form>

        <div class="step-confirm__footer">
          <div class="step-confirm__update">
            <p
              class="step-confirm__update-message"
              :class="{ disabled: duration }"
              @click="
                saveFormData({})
                duration = 120
              "
            >
              <svg-icon class="step-confirm__update-code" name="update" />
              Выслать код повторно
            </p>
            <v-countdown v-if="duration" :duration.sync="duration" />
          </div>
          <div class="step-confirm__link" @click="modalShow({ name: 'sms' })">
            Не приходит SMS?
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import Api from '@/core/Api'

export default {
  name: 'StepConfirm',

  inject: ['saveFormData', 'nextStep', 'previousStep', 'bookTicket'],
  props: {
    formData: {
      type: Object,
      required: true
    },
    smsToken: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        smsCode: ''
      },
      error: '',
      duration: 120
    }
  },

  validations: {
    form: {
      smsCode: { required, minLength: minLength(6) }
    }
  },

  computed: {
    getFormStatus() {
      return this.$v.$invalid
    }
  },

  methods: {
    previous() {
      this.previousStep('confirm')
    },

    async formHandler() {
      this.error = ''
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.$v.$reset()
      const data = await Api.checkSMSCode({
        token: this.smsToken,
        code: this.form.smsCode
      })
      if (data) {
        await this.bookTicket()
        this.nextStep()
      } else {
        this.error = 'Неверный код'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.step-confirm {
  max-width: 530px;

  &__inner {
    display: flex;
    flex-direction: column;
  }

  &__title {
    padding-inline: 30px;
    text-align: center;

    @include below($desktopDef) {
      font-size: 16px !important;
      padding-inline: 10px !important;
    }
  }

  &__arrow-icon {
    width: 13px;
    height: 13px;
    transform: rotate(180deg);
    color: theme(grey-dark);
  }

  &__update {
    display: flex;
    align-items: center;
    margin-top: 26px;
    justify-content: center;
    gap: 15px;
  }

  &__update-code {
    width: 20px;
    height: 20px;
  }

  &__update-message {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    color: theme(current-color);
    cursor: pointer;
    transform: color 0.2s ease;
    &:hover {
      color: theme(current-dark-color);
    }
    &.disabled {
      color: theme(grey);
      pointer-events: none;
    }
    @include below($notebook) {
      font-size: 14px;
    }
  }

  &__content {
    margin-top: 13.5px;
    align-items: center;
  }

  &__actions {
    padding: 2px;
    width: max-content;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;

    display: flex;
    color: theme(grey-dark);

    align-items: center;
    gap: 10px;
  }

  &__from-actions > * {
    width: 100%;
  }

  &__link {
    margin: 16px 10px 0;
    font-weight: 600;
    font-size: 15px;
    display: block;
    text-align: center;
    color: theme(current-color);
    transition: 0.2s ease;
    cursor: pointer;

    @include below($mobileLrg) {
      font-size: 14px;
    }

    &:hover {
      color: theme(current-dark-color);
    }
  }

  &__form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 16px;
    align-items: center;
    gap: 14px;

    @include below($mobileDef) {
      grid-template-columns: 1fr;
      width: max-content;
      margin: 23px auto 0;
    }
  }
}
</style>

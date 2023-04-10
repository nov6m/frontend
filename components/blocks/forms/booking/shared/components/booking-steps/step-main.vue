<template>
  <section class="step-main">
    <div class="step-main__content">
      <form class="step-main__form">
        <div class="step-main__form-header">
          <v-title class="step-main__form-title" v-text="'Данные покупателя'" />
        </div>

        <div class="step-main__form-field">
          <v-input
            v-model="form.surname"
            block
            placeholder="Фамилия"
            :error="
              $v.form.surname.$dirty && $v.form.surname.$invalid
                ? 'Поле обязательно'
                : ''
            "
          />
        </div>

        <div class="step-main__form-field">
          <v-input
            v-model="form.name"
            block
            :error="
              $v.form.name.$dirty && $v.form.name.$invalid
                ? 'Поле обязательно'
                : ''
            "
            placeholder="Имя"
          />
        </div>

        <div class="step-main__form-field">
          <v-input
            v-model="form.patronymic"
            block
            :error="
              $v.form.patronymic.$dirty && $v.form.patronymic.$invalid
                ? 'Поле обязательно'
                : ''
            "
            placeholder="Отчество"
          />
        </div>

        <div class="step-main__form-field">
          <v-input
            v-model="form.birthday"
            block
            mask="##-##-####"
            :error="
              $v.form.birthday.$dirty && $v.form.birthday.$invalid
                ? 'Поле обязательно'
                : ''
            "
            placeholder="Дата рождения"
          />
        </div>

        <div class="step-main__form-field">
          <v-input
            v-model="form.phone"
            mask="+7 (###) ### ##-##"
            block
            :error="
              $v.form.phone.$dirty && $v.form.phone.$invalid
                ? 'Поле обязательно'
                : ''
            "
            placeholder="Введите телефон"
          />
        </div>

        <v-btn
          class="step-main__form-actions"
          :disabled="getFormStatus"
          @click="formHandler"
        >
          Продолжить
        </v-btn>
      </form>

      <div class="step-main__object">
        <v-title class="step-main__object-title" small>
          {{ productInfo.name }}
        </v-title>

        <v-img
          v-if="productInfo.image"
          class="step-main__object-image"
          :src="productInfo.image"
          :alt="productInfo.name"
          contain
        />

        <v-text tag="h2">
          Цена:
          <span class="step-main__object-price">
            {{ productInfo.price }}
          </span>
        </v-text>
      </div>

      <div class="step-main__alert">
        <v-alert icon-name="outline_attention">
          <template #alert-message>
            <p>
              {{ wordbook.alert }}
            </p>
          </template>
        </v-alert>
      </div>
    </div>
  </section>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import apartment from '@/core/mixins/apartment'
import { ruFormat } from '@/core/utils/numberFormat'

export default {
  name: 'StepMain',
  mixins: [apartment],

  inject: ['saveFormData', 'nextStep'],

  props: {
    productInfo: {
      type: Object,
      default: () => ({})
    },
    wordbook: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      form: {
        surname: '',
        name: '',
        patronymic: '',
        phone: '',
        birthday: ''
      }
    }
  },

  validations: {
    form: {
      surname: { required },
      name: { required },
      patronymic: { required },
      phone: { required, minLength: minLength(18) },
      birthday: { required, minLength: minLength(10) }
    }
  },

  computed: {
    getFormStatus() {
      return this.$v.$invalid
    }
  },

  methods: {
    ruFormat,
    formHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.$v.$reset()

      const { surname, name, patronymic, ...fromData } = this.form
      this.saveFormData({
        name: `${surname} ${name} ${patronymic}`,
        ...fromData
      })

      this.nextStep()
    }
  }
}
</script>

<style scoped lang="scss">
.step-main {
  max-width: 902px;

  &__form-title {
    font-size: 24px;
  }

  &__form-header {
    margin-bottom: 20px;
  }

  &__content {
    display: grid;
    grid-template-areas: 'A B' 'C C';

    @include below($notebook) {
      gap: 10px;
    }

    @include below($mobileDef) {
      gap: 45px;
      grid-template-areas: 'B' 'C' 'A';
    }
  }

  &__alert {
    grid-area: C;

    @include above($mobileDef) {
      margin-top: 30px;
    }
  }

  &__object-title {
    @include below($notebook) {
      font-size: 16px !important;
    }
  }

  &__object-image {
    max-width: 194px;
    height: 216px;
  }

  &__object-price {
    font-size: 20px;
    font-weight: 600;
    line-height: 27px;
  }

  &__object {
    grid-area: B;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    @include above($mobileDef) {
      margin-top: 44px;
    }
  }

  &__form-field {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 20px;
    }
  }

  &__form {
    grid-area: A;
    display: flex;
    flex-direction: column;
  }
}
</style>

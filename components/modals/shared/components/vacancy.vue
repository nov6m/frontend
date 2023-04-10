<template lang="pug">
.vacancyModal
  v-icon.vacancyModal__close(
    icon="close"
    @click="$emit('closePopup')"
  )
  v-title.vacancyModal__title {{ getValue('title', 'Заполните заявку, и мы перезвоним Вам в ближайшее время') }}
  form.vacancyModal__form
    v-input.vacancyModal__field(
      placeholder="Введите имя*"
      v-model="form.name"
      :error="$v.form.name.$dirty && $v.form.name.$invalid ? 'Поле обязательно' : ''"
      block
    )
    v-input.vacancyModal__field(
      placeholder="Введите телефон*"
      v-model="form.phone"
      mask="+7 (###) ### ##-##"
      :error="$v.form.phone.$dirty && $v.form.phone.$invalid ? 'Поле обязательно' : ''"
      block
    )
    v-input.vacancyModal__field(
      placeholder="Откуда вас забрать?*"
      v-model="form.from"
      :error="$v.form.phone.$dirty && $v.form.phone.$invalid ? 'Поле обязательно' : ''"
      block
    )
    v-input.vacancyModal__field(
      placeholder="Подъезд"
      v-model="form.entrance"
      block
    )
    v-input.vacancyModal__field(
      placeholder="Этаж"
      v-model="form.floor"
      block
    )
    v-input.vacancyModal__field(
      placeholder="Квартира"
      v-model="form.apartment"
      block
    )
    v-input.vacancyModal__field(
      placeholder="Куда вас отвезти?*"
      v-model="form.to"
      :error="$v.form.phone.$dirty && $v.form.phone.$invalid ? 'Поле обязательно' : ''"
      block
    )
    v-input.vacancyModal__field(
      placeholder="Дата*"
      v-model="form.date"
      :error="$v.form.phone.$dirty && $v.form.phone.$invalid ? 'Поле обязательно' : ''"
      block
    )
    v-input.vacancyModal__field(
      placeholder="Время"
      v-model="form.time"
      block
    )
    v-textarea.vacancyModal__field(
      placeholder="Сообщение"
      v-model="form.text"
      block
      :rows="10"
    )
    v-disclaimer.vacancyModal__disclaimer(
      :btn="getValue('buttonText', 'Заказать звонок')"
      policy="/policy"
    ) {{ getValue('buttonText', 'Заказать звонок') }}
    v-btn.vacancyModal__btn(
      @click="formHandler"
      :disabled="disabledBtn"
      block
    ) {{ getValue('buttonText', 'Заказать звонок') }}
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'
import Api from '@/core/Api'
import ticket from '@/core/mixins/ticket'
export default {
  name: 'DefaultModal',
  mixins: [ticket],
  data() {
    return {
      form: {
        name: '',
        phone: '',
        from: '',
        entrance: '',
        floor: '',
        apartment: '',
        to: '',
        date: '',
        time: '',
        text: '',
        code: this.getValue('code', 'service')
      },
      vacancyItems: [],
      disabledBtn: false
    }
  },
  validations: {
    form: {
      phone: { required, minLength: minLength(18) },
      name: { required }
    }
  },
  async created() {
    if (this.getValue('vacancy', '')) {
      this.form.vacancy = this.getValue('vacancy', '')
    }
    const { vacancy } = await Api.getFilterVacancy()
    const items = vacancy.data[0].values.map((el) => el.name)
    this.vacancyItems = [...items, 'Другая']
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
        subject: `Отклик на вакансию ${this.getValue('vacancy')}`
      })
      this.disabledBtn = false
    }
  }
}
</script>

<style lang="scss" scoped>
.vacancyModal {
  padding: 50px 40px 40px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  @include below($tablet) {
    padding: 30px 20px;
  }
  &__title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 25px;
    text-align: center;
    @include below($tablet) {
      margin-bottom: 15px;
      font-size: 18px;
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
    &::v-deep(.multiselect__tags) {
      padding-left: 30px;
    }
  }
  &__disclaimer {
    margin-top: 5px;
    margin-bottom: 25px;
  }
  &__file {
    width: 215px;
  }
}
</style>

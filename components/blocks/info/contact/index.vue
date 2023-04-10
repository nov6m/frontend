<template lang="pug">
.contact-info
  v-container
    v-title.contact-info__title(
      v-if="fields.title"
      tag="h1"
    ) {{ fields.title }}
    v-description.contact-info__description(
      v-if="fields.description"
    ) {{ fields.description }}
    .contact-info__content
      .contact-info__item.contact-info__item--main
        h3.contact-info__item-title Главный офис
        .contact-info__elements
          .contact-info__element
            .contact-info__element-label Приемная
            v-link.contact-info__element-value(
              :to="`tel:+7(999) 000 00 00`"
              mode="link"
              external
            ) +7(999) 000 00 00
          .contact-info__element
            .contact-info__element-label Почта
            v-link.contact-info__element-value(
              :to="`mailto:test@test.ru`"
              mode="link"
              external
            ) test@test.ru
          .contact-info__element
            .contact-info__element-label Часы работы
            .contact-info__element-value пн-вс: с 0:00 до 23:59
          .contact-info__element
            .contact-info__element-label Адрес
            .contact-info__element-value г. Оренбург, ул. Советская, 1а
      //- .contact-info__items
      //-   .contact-info__item.contact-info__item--form
      //-     h3.contact-info__item-title У Вас остались вопросы?
      //-     .contact-info__item-subtitle Оставьте свои контакты и наш менеджер свяжется с вами в ближайшее время!
      //-     v-btn.contact-info__item-btn(
      //-       @click="modalShow"
      //-       small
      //-     ) Оставить заявку
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'ContactInfo',
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    socials() {
      return this.$store.getters['settings/getSocials']
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.contact-info {
  padding: 25px 0;
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 15px;
    }
  }
  &__description {
    margin-bottom: 10px;
  }
  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    @include below($notebook) {
      gap: 14px;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
    @include below($notebook) {
      gap: 11px;
    }
    @include below($tablet) {
      grid-template-columns: 1fr;
      gap: 14px;
    }
  }
  &__item {
    height: 180px;
    border-radius: theme(ui-radius);
    background: #f7f7f7;
    padding: 32px;
    @include below($notebook) {
      padding: 22px;
      height: unset;
    }
    &--main {
      background: url('@/assets/img/main-contact.png') right center/cover
        no-repeat;
      .contact-info__element:last-child {
        grid-column: span 2;
      }
    }
    &--secondary {
      background: url('@/assets/img/secondary-contact.png') center center/cover
        no-repeat;
    }
    &--form {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-title {
      font-weight: 600;
      font-size: 20px;
      @include below($notebook) {
        font-size: 16px;
      }
    }
    &-subtitle {
      font-weight: 400;
      font-size: 14px;
      margin-top: 8px;
      @include below($notebook) {
        font-size: 13px;
      }
    }
    &-btn {
      margin-top: auto;
      @include below($tablet) {
        margin-top: 15px;
      }
    }
  }
  &__elements {
    margin-top: 22px;
    display: flex;
    justify-content: space-between;
    gap: 15px;
    @include below($desktopSml) {
      flex-wrap: wrap;
    }
    @include below($tablet) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  &__element {
    max-width: 190px;
    &-label {
      color: theme(grey-dark);
      font-size: 15px;
      margin-bottom: 8px;
      @include below($desktopSml) {
        margin-bottom: 5px;
        font-size: 12px;
      }
    }
    &-value {
      font-size: 18px;
      @include below($desktopSml) {
        margin-bottom: 5px;
        font-size: 14px;
      }
    }
    &-social-item {
      margin-right: 15px;
      color: theme(grey-dark);
    }
    &-social-icon {
      width: 32px;
      height: 32px;
    }
  }
}
</style>

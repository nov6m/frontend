<template lang="pug">
.alternative-about
  v-container
    .alternative-about__content
      .alternative-about__head
        h1.alternative-about__title(
          v-if="fields.title"
        ) {{ fields.title }}
        .alternative-about__subtitle(
          v-if="fields.subtitle"
        ) {{ fields.subtitle }}
      .alternative-about__text(
        v-if="fields.text"
      ) {{ fields.text }}
    .alternative-about__items(
      v-if="isNotEmptyArray(fields.items)"
    )
      card-info(
        v-for="(item, idx) in fields.items"
        :key="idx"
        :title="item.title"
        :label="item.label"
        :img="item.img"
        :main="item.main"
      )
</template>

<script>
import CardInfo from './shared/components/card-info'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'AlternativeAbout',
  components: { CardInfo },
  props: {
    fields: {
      type: Object,
      default() {
        return {
          title: 'МедТакси',
          subtitle: 'О компании МедТакси',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          items: [
            {
              title: 'Работаем официально',
              label: 'Заключаем договор на перевозку, выдаем квитанцию на оплату/чек'
            },
            {
              title: 'Работаем официально',
              label: 'Заключаем договор на перевозку, выдаем квитанцию на оплату/чек'
            },
            {
              title: 'Работаем официально',
              label: 'Заключаем договор на перевозку, выдаем квитанцию на оплату/чек'
            },
            {
              title: 'Работаем официально',
              label: 'Заключаем договор на перевозку, выдаем квитанцию на оплату/чек'
            },
            {
              title: 'Работаем официально',
              label: 'Заключаем договор на перевозку, выдаем квитанцию на оплату/чек'
            },
            {
              title: 'Работаем официально',
              label: 'Заключаем договор на перевозку, выдаем квитанцию на оплату/чек'
            }
          ]
        }
      }
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.alternative-about {
  padding: 50px 0;
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 35px;
    @include below($tablet) {
      grid-template-columns: 1fr;
      gap: 25px;
    }
  }
  &__title {
    font-weight: 700;
    font-size: 45px;
    @include below($desktopSml) {
      font-size: 38px;
    }
  }
  &__subtitle {
    margin-top: 5px;
    font-size: 20px;
    @include below($desktopSml) {
      font-size: 16px;
    }
  }
  &__text {
    line-height: 24px;
    @include below($desktopSml) {
      font-size: 15px;
    }
  }
  &__items {
    margin-top: 55px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 26px;
    @include below($desktopSml) {
      gap: 20px;
    }
    @include below($tablet) {
      margin-top: 40px;
      grid-template-columns: 1fr 1fr;
    }
    @include below($mobileDef) {
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }
}
</style>

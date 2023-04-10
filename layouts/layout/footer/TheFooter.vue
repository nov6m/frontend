<template lang="pug">
footer.layout-footer
  v-container
    footer-top.layout-footer__top(
      :socials="socials"
      :info-items="infoItems"
    )
  v-divider
  v-container
    footer-main.layout-footer__main(
      :addresses="addresses"
      :nav="nav"
      :logo="$store.getters['settings/getLogo']"
      :address="'г. Оренбург, ул. Советская, 1а'"
      :phone="'+7(999) 000 00 00'"
      :mail="'test@test.ru'"
    )
    //- footer-bottom.layout-footer__bottom
</template>

<script>
import footerTop from './shared/components/top'
import footerBottom from './shared/components/bottom'
import footerMain from './shared/components/main'
import { complexMenuItemsQuery } from '@/query'
import Api from '@/core/Api'
export default {
  name: 'TheFooter',
  components: {
    footerTop,
    footerBottom,
    footerMain
  },
  data() {
    return {
      complex: []
    }
  },
  async fetch() {
    const { allComplex } = await Api.graphQL(complexMenuItemsQuery)
    if (allComplex) {
      this.complex = allComplex
    }
  },
  fetchOnServer: false,
  computed: {
    nav() {
      return [
        {
          label: 'Разделы сайта',
          items: [
            {
              label: 'Главная',
              href: '/'
            },
            {
              label: 'Контакты',
              href: '/contact'
            },
            {
              label: 'Услуги',
              href: '/services'
            },
            {
              label: 'О компании',
              href: '/about'
            },
            {
              label: 'Статьи',
              href: '/articles'
            }
          ]
        },
        {
          label: 'Жилые комплексы',
          items: this.complex.map((el) => {
            return {
              label: el.name,
              href: el.url
            }
          })
        }
      ]
    },
    addresses() {
      return ['пн-вс: с 0:00 до 23:59']
    },
    socials() {
      return this.$store.getters['settings/getSocials']
    },
    infoItems() {
      return [
        {
          label: 'Контактный телефон: +7(999) 000 00 00'
          // value: this.$store.getters['settings/getSalePhone'],
          // href: `tel:${this.$store.getters['settings/getSalePhone']}`
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-footer {
  background-color: theme(light);
}
</style>

<template lang="pug">
.offers-list
  v-container
    v-title.offers-list__title(
      v-if="fields.title"
      v-text="fields.title"
    )
    .offers-list__items(
      v-if="isNotEmptyArray(fields.items)"
    )
      offers-card.offers-list__item(
        v-for="item in fields.items"
        :key="item.id"
        :name="item.name"
        :complex="item?.complex?.name"
        :color="item.color"
        :img="item.previewImage"
        :href="item.url"
        :date="item.date"
      )
</template>

<script>
import OffersCard from './shared/components/card'
import { isNotEmptyArray } from '@/core/utils/type'
import block from '@/core/mixins/block'

export default {
  name: 'OffersList',
  props: {
    fields: {
      type: Object,
      default() {
        return {
          title: 'Новости',
          items: [
            {
              id: '1',
              name: 'Новый транспорт',
              complex: {
                name: 'Мы расширили наш автопарт новыми ТС'
              },
              color: '#2fa860',
              previewImage: 'https://s15.stc.yc.kpcdn.net/share/i/12/10878731/wr-960.webp',
              url: '/news',
              date: '01.01.1999'
            },
            {
              id: '2',
              name: 'Новый транспорт',
              complex: {
                name: 'Мы расширили наш автопарт новыми ТС'
              },
              color: '#2fa860',
              previewImage: 'https://s15.stc.yc.kpcdn.net/share/i/12/10878731/wr-960.webp',
              url: '/news',
              date: '01.01.1999'
            },
            {
              id: '3',
              name: 'Новый транспорт',
              complex: {
                name: 'Мы расширили наш автопарт новыми ТС'
              },
              color: '#2fa860',
              previewImage: 'https://s15.stc.yc.kpcdn.net/share/i/12/10878731/wr-960.webp',
              url: '/news',
              date: '01.01.1999'
            },
            {
              id: '4',
              name: 'Новый транспорт',
              complex: {
                name: 'Мы расширили наш автопарт новыми ТС'
              },
              color: '#2fa860',
              previewImage: 'https://s15.stc.yc.kpcdn.net/share/i/12/10878731/wr-960.webp',
              url: '/news',
              date: '01.01.1999'
            },
            {
              id: '5',
              name: 'Новый транспорт',
              complex: {
                name: 'Мы расширили наш автопарт новыми ТС'
              },
              color: '#2fa860',
              previewImage: 'https://s15.stc.yc.kpcdn.net/share/i/12/10878731/wr-960.webp',
              url: '/news',
              date: '01.01.1999'
            }
          ]
        }
      }
    }
  },
  components: { 
    OffersCard
  },
  mixins: [block],
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.offers-list {
  padding: 50px 0;
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 25px;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    @include below($notebook) {
      grid-template-columns: 1fr 1fr;
      gap: 23px;
    }
    @include below($mobileLrg) {
      grid-template-columns: 1fr;
    }
  }
}
</style>

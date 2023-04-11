<template>
  <div class="page" :data-route="$route.fullPath">
    <ServicesList />
    <ServicesList :fields="fields" />
    <AlternativePromoBanner />
  </div>
</template>

<script>
import AlternativePromoBanner from '@/components/blocks/banners/promo/alternative'
import ServicesList from '@/components/blocks/lists/vacancy/index'

export default {
  name: 'IndexPage',
  components: {
    AlternativePromoBanner,
    ServicesList
  },
  data() {
    return {
      fields: {
        showButton: false,
        city: false,
        title: 'Дополнительные услуги',
        items: [
          {
            key: '1',
            experience: '',
            description: 'Поставим вам капельницу во время перевозки',
            category: '1000 р.',
            city: '',
            rate: '',
            name: 'Капельница'
          },
          {
            key: '2',
            experience: '',
            description: 'Арендуем инвалидное кресло на время перевозки',
            category: '500 р.',
            city: '',
            rate: '',
            name: 'Инвалидное кресло'
          }
        ],
        filters: {}
      } 
    }
  }
}
</script>

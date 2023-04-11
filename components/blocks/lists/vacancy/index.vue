<template lang="pug">
.vacancy
  v-container
    v-title.vacancy__title(
      v-if="fields.title"
    ) {{ fields.title }}
      services-filter(
      v-if="Object.entries(fields.filters).length !== 0"
      :filters="fields.filters"
      @update:filter="fields.filters = $event"
      @click:find="updateData"
    )
    .vacancy__items(
      v-if="isNotEmptyArray(fields.items)"
    )
      services-head(:city="fields.city")
      services-card.vacancy__item(
        v-for="item in updateData(fields.items)"
        :key="item.key"
        :experience="item.experience"
        :text="item.description"
        :category="item.category"
        :city="item.city"
        :rate="item.rate"
        :name="item.name"
        :show-button="fields.showButton"
      )
    .vacancy__not-found( v-else ) Услуг по выбранным параметрам не найдено
</template>

<script>
import ServicesFilter from './shared/components/vacancy-filter'
import ServicesCard from './shared/components/vacancy-card'
import ServicesHead from './shared/components/vacancy-head'
import { isNotEmptyArray } from '@/core/utils/type'
import Api from '@/core/Api'

export default {
  name: 'ServicesList',
  components: { ServicesHead, ServicesCard, ServicesFilter },
  props: {
    fields: {
      type: Object,
      default() {
        return {
          title: 'Наши услуги',
          items: [
            {
              key: '1',
              experience: '',
              description: 'Доставим вас от квартиры до выбранного места',
              category: '1000 р.',
              city: 'Оренбург',
              rate: '',
              name: 'Перевозка в один конец'
            },
            {
              key: '2',
              experience: '',
              description: 'Доставим вас от квартиры до выбранного места',
              category: '900 р.',
              city: 'Орск',
              rate: '',
              name: 'Перевозка в один конец'
            },
            {
              key: '3',
              experience: '',
              description: 'Доставим вас от квартиры до выбранного места и затем назад',
              category: '3000 р.',
              city: 'Оренбург',
              rate: '',
              name: 'Перевозка туда обратно'
            },
            {
              key: '4',
              experience: '',
              description: 'Доставим вас от квартиры до выбранного места и затем назад',
              category: '2500 р.',
              city: 'Гай',
              rate: '',
              name: 'Перевозка в один конец'
            },
            {
              key: '5',
              experience: '',
              description: 'Доставим вас от квартиры до выбранного места',
              category: '1000 р.',
              city: 'Саракташ',
              rate: '',
              name: 'Перевозка в один конец'
            }
          ],
          filters: {
            city: '',
            cityItems: [
              {
                key: '1',
                name: 'Оренбург'
              },
              {
                key: '2',
                name: 'Орск'
              },
              {
                key: '3',
                name: 'Гай'
              },
              {
                key: '4',
                name: 'Саракташ'
              }
            ],
            category: '',
            categoryItems: [
              {
                key: '1',
                name: 'Перевозка в один конец'
              },
              {
                key: '4',
                name: 'Перевозка туда обратно'
              }
            ]
          }
        }
      }
    }
  },
  methods: {
    isNotEmptyArray,
    updateData(data) {
      const formData = {
        city: [],
        category: []
      }
      if (this.fields.filters.category && this.fields.filters.category.name !== 'Все') {
        formData.category.push(this.fields.filters.category)
      }
      if (this.fields.filters.city && this.fields.filters.city.name !== 'Все') {
        formData.city.push(this.fields.filters.city)
      }
      if ((formData.city.length === 0 && formData.category.length === 0)) {
        return data
      }
      const notReactiveData = JSON.parse(JSON.stringify(data))
      return notReactiveData.filter(el => ((formData.city.length !== 0 && el.city === formData.city[0].name) && (formData.category.length !== 0 && el.name === formData.category[0].name)) || (formData.city.length !== 0 && el.city === formData.city[0].name && formData.category.length === 0) || (formData.category.length !== 0 && formData.city.length === 0 && el.name === formData.category[0].name))
    }
  }
}
</script>

<style lang="scss" scoped>
.vacancy {
  padding: 25px 0;
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 25px;
    }
  }
  &__items {
    margin-top: 32px;
    @include below($mobileLrg) {
      margin-top: 18px;
    }
  }
  &__item {
    margin-bottom: 12px;
  }
  &__not-found {
    font-size: 18px;
    font-weight: 600;
    margin-top: 25px;
  }
}
</style>

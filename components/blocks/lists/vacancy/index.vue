<template lang="pug">
.vacancy
  v-container
    v-title.vacancy__title(
      v-if="fields.title"
    ) {{ fields.title }}
    vacancy-filter(
      v-if="Object.entries(fields.filters).length !== 0"
      :filters="fields.filters"
      @update:filter="fields.filters = $event"
    )
    .vacancy__items(
      v-if="isNotEmptyArray(fields.items)"
    )
      vacancy-head(:city="fields.city")
      vacancy-card.vacancy__item(
        v-for="item in fields.items"
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
import VacancyFilter from './shared/components/vacancy-filter'
import VacancyCard from './shared/components/vacancy-card'
import VacancyHead from './shared/components/vacancy-head'
import { isNotEmptyArray } from '@/core/utils/type'
import Api from '@/core/Api'

export default {
  name: 'VacancyList',
  components: { VacancyHead, VacancyCard, VacancyFilter },
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
              key: '1',
              experience: '',
              description: 'Доставим вас от квартиры до выбранного места',
              category: '900 р.',
              city: 'Орск',
              rate: '',
              name: 'Перевозка в один конец'
            },
            {
              key: '1',
              experience: '',
              description: 'Доставим вас от квартиры до выбранного места и затем назад',
              category: '3000 р.',
              city: 'Оренбург',
              rate: '',
              name: 'Перевозка туда обратно'
            },
            {
              key: '1',
              experience: '',
              description: 'Доставим вас от квартиры до выбранного места и затем назад',
              category: '2500 р.',
              city: 'Гай',
              rate: '',
              name: 'Перевозка в один конец'
            },
            {
              key: '1',
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
                key: '4',
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
  async fetch() {
    await this.updateData()
  },
  methods: {
    isNotEmptyArray,
    async updateData() {
      const formData = {
        city: [],
        category: []
      }
      if (this.filters.city?.key) {
        formData.city.push(this.filters.city.key)
      }
      if (this.filters.category?.key) {
        formData.category.push(this.filters.category.key)
      }
      const { vacancy, filters } = await Api.getFilterVacancy(formData)
      if (vacancy) {
        this.items = vacancy.data[0].values
      }
      if (isNotEmptyArray(filters)) {
        filters.forEach((el) => {
          if (el.name in this.filters) {
            this.filters[el.name + 'Items'] = el.values[0].values
          }
        })
      }
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

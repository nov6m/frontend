<template lang="pug">
.managers(
  v-if="isNotEmptyArray(fields.items)"
)
  v-container
    v-title.managers__title(
      v-if="fields.title"
    ) {{ fields.title }}
    .managers__items
      card-reviews(
        v-for="(item, idx) in items"
        :key="idx"
        :img="item.img"
        :name="item.name"
        :position="item.position"
      )
    .managers__open(
      v-if="!display"
      @click="display = true; items = fields.items"
    )
      | Развернуть
      v-icon.managers__open-icon(
        icon="arrow-down"
      )
</template>

<script>
import CardReviews from './shared/components/card-manager'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'ReviewsList',
  components: { CardReviews },
  props: {
    fields: {
      type: Object,
      default() {
        return {
          title: 'Отзывы о нас',
          items: [
            {
              img: 'https://ob-kassa.ru/content/front/buhoskol_tmp1/images/reviews-icon.jpg',
              name: 'Петя Петров',
              position: 'Хорошая компания и конкурсы интересные. Хорошая компания и конкурсы интересные. Хорошая компания и конкурсы интересные. Хорошая компания и конкурсы интересные.Хорошая компания и конкурсы интересные'
            },
            {
              img: 'https://ob-kassa.ru/content/front/buhoskol_tmp1/images/reviews-icon.jpg',
              name: 'Петя Петров',
              position: 'Хорошая компания и конкурсы интересные'
            },
            {
              img: 'https://ob-kassa.ru/content/front/buhoskol_tmp1/images/reviews-icon.jpg',
              name: 'Петя Петров',
              position: 'Хорошая компания и конкурсы интересные'
            },
            {
              img: 'https://ob-kassa.ru/content/front/buhoskol_tmp1/images/reviews-icon.jpg',
              name: 'Петя Петров',
              position: 'Хорошая компания и конкурсы интересные'
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      display: false,
      items: []
    }
  },
  mounted() {
    this.items = [...this.fields.items]
    if (window.innerWidth <= 768) {
      this.items = this.items.slice(0, 4)
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.managers {
  background: theme(light);
  padding: 60px 0;
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 25px;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    @include below($desktopSml) {
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }
    @include below($tablet) {
      grid-template-columns: 1fr 1fr;
    }
    @include below($mobileDef) {
      grid-template-columns: 1fr;
    }
  }
  &__open {
    margin-top: 30px;
    display: none;
    cursor: pointer;
    @include below($tablet) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-icon {
      width: 24px;
      height: 24px;
      color: theme(current-color);
      margin-top: 5px;
    }
  }
}
</style>

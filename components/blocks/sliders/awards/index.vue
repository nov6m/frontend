<template lang="pug">
.awards-slider(
  v-if="isNotEmptyArray(fields.items)"
)
  v-container
    .awards-slider__content
      v-title.awards-slider__title(
        v-if="fields.title"
      ) {{ fields.title }}
      v-swiper.awards-slider__slider(
        :options="swiperOption"
      )
        v-swiper-slide(
          v-for="(item, idx) in fields.items"
          :key="idx+Date.now()"
        )
          card-award(
            :img="item.img"
            :year="item.year"
            :description="item.description"
            :color="item.color"
          )
      v-swiper-navigation.awards-slider__nav(
        target="sliders-awards"
        position="top"
      )
</template>

<script>
import CardAward from './shared/components/card-award'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'AwardsSlider',
  components: { CardAward },
  props: {
    fields: {
      type: Object,
      default() {
        return {
          title: 'Наша истороия',
          items: [
            {
              img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
              year: 2023,
              description: 'Мы открылись во всех городах России'
            },
            {
              img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
              year: 2023,
              description: 'Мы открылись во всех городах России'
            },
            {
              img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
              year: 2023,
              description: 'Мы открылись во всех городах России'
            },
            {
              img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
              year: 2023,
              description: 'Мы открылись во всех городах России'
            },
            {
              img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
              year: 2023,
              description: 'Мы открылись во всех городах России'
            },
            {
              img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
              year: 2023,
              description: 'Мы открылись во всех городах России'
            },
            {
              img: 'https://ksmrus.ru/pic/userfile/images/Кардиолог.jpg',
              year: 2023,
              description: 'Мы открылись во всех городах России'
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: false,
        navigation: {
          nextEl: '.sliders-awards-next',
          prevEl: '.sliders-awards-prev'
        },
        breakpoints: {
          480: {
            slidesPerView: 2,
            spaceBetween: 14
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 14
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 26
          }
        }
      },
      items: []
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.awards-slider {
  &__title {
    margin-bottom: 25px;
    @include below($notebook) {
      margin-bottom: 15px;
    }
  }
  &__content {
    position: relative;
  }
  &__nav {
    position: absolute;
    top: 0;
    right: 0;
    &.swiper__nav {
      @include below($tablet) {
        display: none;
      }
    }
  }
}
</style>

<template lang="pug">
.slider-build-progress(
  v-if="isNotEmptyArray(items)"
)
  v-container
    .slider-build-progress__cnt
      v-title.slider-build-progress__title(
        v-if="fields.title"
        v-text="fields.title"
      )
      v-description.slider-build-progress__descr(
        v-if="fields.description"
        v-text="fields.description"
      )
      Photoswipe(auto)
        v-swiper.slider-build-progress__content(
          :options="swiperOption"
        )
          v-swiper-slide(
            v-for="item in items"
            :key="item.id"
            v-if="item.image"
            v-pswp="item.image"
          )
            v-img.slider-build-progress__img(
              :src="item.image"
              :alt="fields.title"
              cover
            )
            .slider-build-progress__label(
              v-if="item.date"
            ) {{ getMonthNameFromDate(item.date) }} {{ (new Date(item.date)).getFullYear() }} года
        v-swiper-navigation.slider-build-progress__nav(
          target="sliders-build"
          position="top"
        )
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'
import { complexStepBuildingQuery } from '@/query'
import { getMonthNameFromDate } from '@/core/utils/date'
import Api from '@/core/Api'
export default {
  name: 'SliderBuildProgress',
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 10,
        loop: false,
        autoHeight: true,
        navigation: {
          nextEl: '.sliders-build-next',
          prevEl: '.sliders-build-prev'
        },
        breakpoints: {
          768: {
            slidesPerView: 3
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15
          }
        }
      },
      items: []
    }
  },
  async fetch() {
    const { complex } = await Api.graphQL(complexStepBuildingQuery, {
      id: this.id
    })
    if (complex) {
      this.items = complex.progress
    }
  },
  methods: {
    getMonthNameFromDate,
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.slider-build-progress {
  &__cnt {
    position: relative;
  }
  &__title,
  &__descr {
    margin-bottom: 20px;
    @include below($tablet) {
      margin-bottom: 10px;
    }
  }
  &__nav {
    position: absolute;
    top: 0;
    right: 0;
  }
  &__img {
    width: 100%;
    height: 100%;
    border-radius: theme(ui-radius);
  }
  &__label {
    font-size: 20px;
    margin-top: 20px;
    @include below($desktopSml) {
      margin-top: 13px;
    }
    @include below($tablet) {
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
</style>

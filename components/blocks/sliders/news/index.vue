<template lang="pug">
.slider-news(
  v-if="isNotEmptyArray(items)"
)
  v-container
    .slider-news__cnt
      v-title.slider-news__title(
        v-if="fields.title"
        v-text="fields.title"
      )
      v-description.slider-news__descr(
        v-if="fields.description"
        v-text="fields.description"
      )
      v-swiper.slider-news__content(
        :options="SWIPER_OPTIONS"
      )
        v-swiper-slide(
          v-for="item in items"
          :key="item.id"
        )
          card-news.slider-news__item(
            :title="item.name"
            :description="item.shortDescription"
            :date="item.publicationDate"
            :to="item.url"
          )
      v-swiper-navigation.slider-news__nav(
        target="sliders-news"
        position="top"
      )
      .slider-news__btm(
        v-if="fields.btnText && fields.link"
      )
        v-btn(
          mode="outline"
          :to="fields.link"
        ) {{ fields.btnText }}
  </template>

<script>
import CardNews from '@/components/blocks/shared/components/card-news'
import { isNotEmptyArray } from '@/core/utils/type'
import { SWIPER_OPTIONS } from './constants'
import block from '@/core/mixins/block'

export default {
  name: 'SliderNews',
  components: {
    CardNews
  },
  mixins: [block],
  data() {
    return {
      SWIPER_OPTIONS
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.slider-news {
  &__cnt {
    position: relative;
  }
  &__title,
  &__descr {
    margin-bottom: 20px;
  }
  &__nav {
    position: absolute;
    top: 0;
    right: 0;
  }
  &__item {
    height: 100%;
  }
  &__btm {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    @include below($tablet) {
      margin-top: 10px;
    }
  }
}
</style>

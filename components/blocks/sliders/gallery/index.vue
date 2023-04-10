<template lang="pug">
.slider-gallery(
  v-if="isNotEmptyArray(items)"
)
  v-container
    .slider-gallery__cnt
      v-title.slider-gallery__title(
        v-if="fields.title"
        v-text="fields.title"
      )
      v-description.slider-gallery__descr(
        v-if="fields.description"
        v-text="fields.description"
      )
      Photoswipe(auto)
        v-swiper.slider-gallery__content(
          :options="swiperOption"
        )
          v-swiper-slide(
            v-for="item in items"
            :key="item.id"
            v-if="item.image"
            v-pswp="item.image"
          )
            v-img.slider-gallery__img(
              :src="item.image"
              :alt="fields.title"
              cover
            )
      v-swiper-navigation.slider-gallery__nav(
        target="sliders-gallery"
        position="top"
      )
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'
import Api from '@/core/Api'
import { complexGalleryQuery } from '@/query'
export default {
  name: 'SliderGallery',
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
        spaceBetween: 12,
        loop: false,
        autoHeight: true,
        navigation: {
          nextEl: '.sliders-gallery-next',
          prevEl: '.sliders-gallery-prev'
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 15
          }
        }
      },
      items: []
    }
  },
  async fetch() {
    const { complex } = await Api.graphQL(complexGalleryQuery, {
      id: this.id
    })
    if (complex) {
      this.items = complex.gallery
    }
  },
  fetchOnServer: false,
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.slider-gallery {
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
}
</style>

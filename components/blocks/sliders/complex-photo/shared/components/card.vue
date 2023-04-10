<template lang="pug">
.complex-photo-card
  v-swiper.complex-photo-card__slider(
    :options="swiperOption"
  )
    v-swiper-slide.complex-photo-card__slide(
      v-for="item in slides"
      :key="item"
    )
      v-img.complex-photo-card__img(
        :src="item"
        cover
      )
  .complex-photo-card__wrapper
    v-container.complex-photo-card__container
      .complex-photo-card__tags
        .complex-photo-card__tag(
          v-for="(item, idx) in tags"
          :key="idx"
        ) {{ item }}
      .complex-photo-card__text
        .complex-photo-card__title(
          v-if="title"
        ) {{ title }}
        .complex-photo-card__subtitle(
          v-if="subtitle"
        ) {{ subtitle }}
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'ComplexPhotoCard',
  props: {
    slides: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          delay: 5000
        },
        loop: true,
        speed: 1000
      }
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.complex-photo-card {
  width: 100%;
  position: relative;
  height: 730px;
  @include below($tablet) {
    height: 590px;
  }
  &__img {
    width: 100%;
    height: 100%;
  }
  &__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  &__container {
    padding-top: 100px;
    padding-bottom: 25px;
    height: 55%;
    display: flex;
    flex-direction: column;
    @include below($desktopDef) {
      height: unset;
    }
    @include below($desktopSml) {
      padding-top: 80px;
    }
    @include below($tablet) {
      padding-top: 60px;
    }
  }
  &__slide {
    padding: 0;
    height: 730px;
    @include below($tablet) {
      height: 590px;
    }
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
    max-width: 40%;
    @include below($notebook) {
      max-width: 100%;
    }
  }
  &__tag {
    padding: 10px 15px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: theme(ui-radius-small);
    font-weight: 600;
    font-size: 14px;
    color: theme(white-color);
    margin-right: 16px;
    margin-bottom: 16px;
    @include below($notebook) {
      margin-right: 8px;
    }
    @include below($tablet) {
      padding: 8px 12px;
    }
  }
  &__text {
    margin-top: auto;
    max-width: 50%;
    color: theme(white-color);
    @include below($desktopSml) {
      max-width: 100%;
    }
  }
  &__title {
    font-weight: 400;
    font-size: 52px;
    margin-bottom: 20px;
    @include below($desktopDef) {
      margin-top: 80px;
    }
    @include below($tablet) {
      margin-top: 40px;
      font-size: 42px;
    }
  }
  &__subtitle {
    font-weight: 600;
    font-size: 18px;
    @include below($tablet) {
      font-size: 16px;
    }
  }
}
</style>

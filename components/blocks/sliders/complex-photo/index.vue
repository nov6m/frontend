<template lang="pug">
.slider-complex-photo
  v-container
    .slider-complex-photo__breadcrumbs-wrap
      v-breadcrumbs.slider-complex-photo__breadcrumbs(
        :items="breadcrumbs"
      )
  card(
    :slides="slides"
    :title="title"
    :subtitle="subtitle"
    :tags="tags"
  )
</template>

<script>
import card from './shared/components/card'
import Api from '@/core/Api'
import { complexBannerInfoQuery } from '@/query'
import { wordByNumber } from '@/core/utils/numberFormat'

export default {
  name: 'SliderComplexPhoto',
  components: {
    card
  },
  props: {
    breadcrumbs: {
      type: Array,
      default() {
        return []
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
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        speed: 1000,
        autoHeight: true,
        navigation: {
          nextEl: '.sliders-complex-next',
          prevEl: '.sliders-complex-prev'
        }
      },
      slides: '',
      tags: [],
      title: '',
      subtitle: ''
    }
  },
  async fetch() {
    const { complex } = await Api.graphQL(complexBannerInfoQuery, {
      id: this.id
    })
    if (complex) {
      this.slides = complex.sliders.map((el) => el.image)
      this.title = complex.name
      this.subtitle = complex.subName
      if (complex.countApartments) {
        this.tags.push(
          `${complex.countApartments} ${wordByNumber(
            complex.countApartments,
            'offer'
          )} от застройщика`
        )
      }
      if (complex.minPrice) {
        this.tags.push(`от ${(complex.minPrice / 1000000).toFixed(1)} млн ₽`)
      }
      this.tags = [...this.tags, ...complex.tags]
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-complex-photo {
  &__breadcrumbs {
    position: absolute;
    top: 25px;
    left: 0;
    color: theme(white-color);
    z-index: 2;
    max-width: 100%;
  }
  &__breadcrumbs-wrap {
    position: relative;
    z-index: 3;
  }
  &__item {
    padding: 0;
  }
  &__nav {
    &::v-deep(.swiper__button.default) {
      color: theme(white-color);
      border-color: theme(white-color);
    }
    @include below($tablet) {
      display: none;
    }
  }
}
</style>

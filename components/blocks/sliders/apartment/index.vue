<template lang="pug">
.slider-apartment(
  v-if="isNotEmptyArray(items)"
)
  v-container
    .slider-apartment__cnt
      v-title.slider-apartment__title(
        v-if="fields.title"
        v-text="fields.title"
      )
      v-description.slider-apartment__descr(
        v-if="fields.description"
        v-text="fields.description"
      )
      v-swiper.slider-apartment__content(
        :options="swiperOption"
      )
        v-swiper-slide(
          v-for="item in items"
          :key="item.id"
        )
          card-promo.slider-news__link(
            :id="item.id"
            :href="item.url"
            :img="item.layoutImage"
            :name="getApartmentName(item.rooms, item.isStudio, item.square, item.floor, item.house.countFloors)"
            :price="item.price"
            :complex="item.house.complex.name"
            :mortgage="item.minMortgage"
            :color="item.house.complex.color"
          )
      v-swiper-navigation.slider-apartment__nav(
        target="sliders-apartment"
        position="top"
      )
      .slider-apartment__btm(
        v-if="fields.btnText && fields.link"
      )
        v-btn.slider-apartment__btn(
          :to="fields.link"
        ) {{ fields.btnText }}
</template>

<script>
import cardPromo from '@/components/blocks/shared/components/card-promo'
import { isNotEmptyArray } from '@/core/utils/type'
import Api from '@/core/Api'
import { apartmentsListByComplexQuery, similarApartmentsQuery } from '@/query'
import apartment from '@/core/mixins/apartment'

export default {
  name: 'SliderApartment',
  components: {
    cardPromo
  },
  mixins: [apartment],
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
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        navigation: {
          nextEl: '.sliders-apartment-next',
          prevEl: '.sliders-apartment-prev'
        },
        breakpoints: {
          568: {
            slidesPerView: 2,
            spaceBetween: 14
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 14
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20
          }
        }
      },
      items: []
    }
  },
  async fetch() {
    await this.getPopularApartments()
  },
  methods: {
    isNotEmptyArray,
    async getPopularApartments() {
      const data = await Api.graphQL(
        this.fields.pageApartment
          ? similarApartmentsQuery
          : apartmentsListByComplexQuery,
        {
          id: this.id,
          excludePk: this.fields.pageApartment ? this.id : 0
        }
      )
      this.items = data.popularApartmentByComplex || data.similarApartments
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-apartment {
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
    &.swiper__nav {
      @include below($tablet) {
        display: none;
      }
    }
  }
  &__link {
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
  &__btn.v-btn {
    @include below($mobileDef) {
      display: flex;
      width: 100%;
    }
  }
}
</style>

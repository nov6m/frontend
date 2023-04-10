<template lang="pug">
.scheme-result
  template(
    v-if="isNotEmptyArray(items)"
  )
    scheme-card(
      v-model="activeCard"
      :id="curId"
    )
    slide-notify(
      v-model="activeNotify"
    )
    scheme-descr
    component.scheme-result__content(
      :is="isTablet ? 'div' : 'v-swiper'"
      :options="swiperOption"
    )
      v-swiper-slide(
        v-for="(item, idx) in items"
        :key="idx"
      )
        .scheme-result__item
          .scheme-result__item-label(
            v-if="item.label"
          ) {{ item.label }}
          scheme-floor.scheme-result__item-row(
            v-for="(floor, floorIdx) in getReversedArray(item.floors)"
            :key="floorIdx"
            :count="floor.length"
            :floor="item.floors.length - floorIdx"
          )
            scheme-cell(
              v-for="(flat, flatIdx) in floor"
              :key="flatIdx"
              :status="flat.status"
              :text="flat.rooms === 1 && flat.is_studio ? 'Ст' : flat.rooms"
              :active="activeCard && curId === flat.id"
              @click="flat.status !== 'sold' ? openItemInfo(flat.id) : null"
            )
  template( v-else )
    .scheme-result__not-found
      .scheme-result__not-found-title Выберите интересующий Вас Жилой комплекс и номер дома
</template>

<script>
import SchemeDescr from './shared/components/scheme-descr'
import SchemeFloor from './shared/components/shared/components/scheme-floor'
import SchemeCell from './shared/components/shared/components/scheme-cell'
import SlideNotify from './shared/components/shared/components/slide-notify'
import SchemeCard from './shared/components/scheme-card'
import size from '@/core/mixins/size'
import { isNotEmptyArray } from '@/core/utils/type'
import { getReversedArray } from '@/core/utils/array'

export default {
  name: 'SchemeResult',
  components: { SchemeCard, SlideNotify, SchemeCell, SchemeFloor, SchemeDescr },
  mixins: [size],
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 36
      },
      activeNotify: true,
      activeCard: false,
      curId: null
    }
  },
  methods: {
    isNotEmptyArray,
    getReversedArray,
    openItemInfo(id) {
      this.curId = id
      this.activeCard = true
    }
  }
}
</script>

<style lang="scss" scoped>
.scheme-result {
  position: relative;
  padding: 25px 0 50px;
  overflow: hidden;
  @include below($tablet) {
    padding-top: 10px;
  }
  &__content {
    margin-top: 50px;
    @include below($tablet) {
      margin-top: 20px;
      display: flex;
      overflow: auto;
      gap: 36px;
    }
  }
  &__item {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    &-label {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 35px;
      @include below($notebook) {
        margin-bottom: 10px;
      }
    }
    &-row {
      &:not(&:last-child) {
        margin-bottom: 8px;
      }
    }
  }
  &__not-found {
    background: url('@/assets/img/scheme-not-found.png') left center/cover
      no-repeat;
    min-height: 460px;
    &-title {
      font-weight: 600;
      font-size: 18px;
    }
  }
}
</style>

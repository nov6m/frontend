<template lang="pug">
.scheme-card(
  :class="{active:value}"
  v-click-outside="() => { $emit('input', false) }"
)
  v-loader.scheme-card__loader( v-if="!apartment" )
  template(v-else)
    .scheme-card__head
      .scheme-card__head-title Квартира №{{ apartment.apartmentNumber }}
      .scheme-card__head-control
        v-icon.scheme-card__favorite(
          :class="{active: hasInFavorite(id)}"
          :icon="hasInFavorite(id) ? 'heart-filled' : 'heart'"
          @click="hasInFavorite(id) ? removeFavorite(id) : addFavorite({id})"
        )
        v-icon.scheme-card__close(
          icon="close"
          @click="$emit('input', false)"
        )
    .scheme-card__tags
      .scheme-card__tag(
        :style="{background: apartment.complexColor, color: idealTextColor(apartment.complexColor)}"
      ) {{ apartment.complexName }}
      .scheme-card__tag(
        v-if="isNotEmptyArray(apartment.complexTags)"
      ) {{ apartment.complexTags[0] }}
    .scheme-card__title {{ apartment.getWordsNumberOfRooms() }} {{ apartment.square }}, {{ apartment.floor }} этаж
    .scheme-card__subtitle(
      v-if="apartment.houseAddress"
    ) {{ apartment.houseAddress }}
    .scheme-card__img-wrap(
      :class="{lock: isBooked}"
    )
      v-img.scheme-card__img(
        :src="apartment.image"
        :alt="`Квартира №${apartment.apartmentNumber}`"
        contain
      )
      v-icon.scheme-card__lock-icon( v-if="isBooked" icon="lock" )
    .scheme-card__price
      .scheme-card__price-label Стоимость
      .scheme-card__price-value {{ apartment.price }}
        span
          span или&nbsp;
          | {{ apartment.pricePerSquare }}
    .scheme-card__btns
      template(
        v-if="isBooked"
      )
        .scheme-card__booked(
        ) Сообщить, если снимут бронь
        v-btn.scheme-card__btn( small block @click="modalShow" ) Связаться со мной
      template( v-else )
        v-btn.scheme-card__btn( small block :to="{path: '/booking', query: {id: id, type: 'apartment'}}" ) Забронировать
        v-btn.scheme-card__btn(
          mode="outline"
          small
          block
          :to="apartment.url"
        ) Подробнее
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'
import { idealTextColor } from '@/core/utils/color'
import favorite from '@/core/mixins/favorite'

export default {
  name: 'SchemeCard',
  mixins: [favorite],
  props: {
    value: {
      type: Boolean,
      required: true
    },
    id: {
      required: true
    }
  },
  computed: {
    isBooked() {
      return this.apartment?.bookingStatus === 'квартира забронирована'
    }
  },
  methods: {
    isNotEmptyArray,
    idealTextColor
  }
}
</script>

<style lang="scss" scoped>
.scheme-card {
  position: fixed;
  top: 75px;
  right: 0;
  width: 445px;
  padding: 40px;
  background: theme(white-color);
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
  height: calc(100vh - 76px);
  z-index: 12;
  transform: translateX(100%);
  transition: transform 0.4s ease;
  display: flex;
  flex-direction: column;
  overflow: auto;
  @include below($mobileLrg) {
    width: 100%;
    padding: 28px;
  }
  &.active {
    transform: translateX(0);
  }
  &__img {
    height: 215px;
    max-width: 100%;
  }
  &__favorite {
    &.active {
      color: theme(current-color);
    }
  }
  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  &__tags {
    margin-top: 16px;
    display: flex;
    gap: 8px;
  }
  &__tag {
    border-radius: theme(ui-radius-small);
    height: 25px;
    font-weight: 600;
    font-size: 14px;
    background: theme(current-extra-light-color);
    color: theme(current-color);
    display: flex;
    align-items: center;
    padding: 3px 12px;
  }
  &__title {
    margin-top: 15px;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 4px;
  }
  &__subtitle {
    font-size: 14px;
    color: theme(grey-dark);
  }
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-title {
      font-weight: 600;
      font-size: 20px;
    }
    &-control {
      display: flex;
      gap: 20px;
    }
  }
  &__favorite,
  &__close {
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: theme(grey-dark);
    @include below($mobileDef) {
      width: 20px;
      height: 20px;
    }
  }
  &__price {
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    &-label {
      font-size: 18px;
      color: theme(grey-dark);
    }
    &-value {
      text-align: left;
      font-weight: 600;
      font-size: 20px;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      gap: 4px;
      > span {
        font-size: 14px;
        font-weight: 400;
        color: theme(grey-dark);
        > span {
          color: theme(current-color);
        }
      }
    }
  }
  &__btns {
    display: flex;
    flex-direction: column;
    gap: 5px;
    @include below($tablet) {
      margin-top: auto;
    }
  }
  &__booked {
    font-weight: 600;
    font-size: 14px;
    padding: 14px;
    text-align: center;
  }
  &__img-wrap {
    margin-top: 30px;
    position: relative;
    display: flex;
    justify-content: center;

    &.lock .scheme-card__img {
      opacity: 0.4;
    }
  }
  &__lock-icon {
    width: 24px;
    height: 24px;
    color: theme(grey-dark);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}
</style>

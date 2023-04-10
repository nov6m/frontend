<template lang="pug">
.result-card
  component.result-card__img-wrap(
    :is="item.booking_status === 2 ? 'div' : 'v-link'"
    :to="item.url"
    :style="{visibility: item.layout_image ? 'visible' : 'hidden'}"
    @mouseenter="visibleLockInfo = true"
    @mouseleave="visibleLockInfo = false"
    :class="{lock: item.booking_status === 2}"
    @click="item.booking_status === 2 ? openImage() : null"
  )
    v-img.result-card__img(
      v-if="item.layout_image"
      :src="item.layout_image"
      contain
    )
    .result-card__lock(
      v-if="item.booking_status === 2"
    )
      lock-info.result-card__lock-info(
        title="Квартира забронирована"
        subtitle="Сообщить, если освободиться"
        btn-text="Связаться со мной"
        v-model="visibleLockInfo"
      )
      v-icon.result-card__lock-icon(
        icon="lock"
      )
  main.result-card__main
    .result-card__top
      .result-card__name
        component(
          :to="item.url"
          :is="item.booking_status === 2 ? 'div' : 'v-link'"
          @click="item.booking_status === 2 ? openImage() : null"
        )
          v-title.result-card__title(
            tag="h3"
            small
          ) {{ getNameRooms(item.rooms, item.isStudio) }} {{ item.square }} м2
        .result-card__mark(
          v-if="isNotEmptyArray(item.tags)"
        ) {{ item.tags[0] }}
      .result-card__address {{ item.street }}
    .result-card__btm
      .result-card__btm-item
        .result-card__btm-label ЖК
        .result-card__btm-value {{ item.complex }}
      .result-card__btm-item
        .result-card__btm-label Этаж
        .result-card__btm-value {{ item.floor }} из {{ item.house?.countFloors }}
      .result-card__btm-item
        .result-card__btm-label Ключи
        .result-card__btm-value {{ getQuarterFromDate(item.delivery_date) }} квартал {{ (new Date(item.delivery_date)).getFullYear() }} года
  .result-card__control
    .result-card__price-info
      .result-card__price {{ ruFormat(item.price) }} ₽
        .result-card__price-alt
          span или
          | {{ ruFormat(getPricePerSquare(item.price, item.square)) }} ₽ за м2
      v-icon.result-card__favorite(
        v-if="item.booking_status !== 2"
        :class="{active: hasInFavorite(item.id)}"
        :icon="hasInFavorite(item.id) ? 'heart-filled' : 'heart'"
        @click="hasInFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item, {notify: true})"
      )
    .result-card__btns
      .result-card__lock-text(v-if="item.booking_status === 2" ) Сообщить, если снимут бронь
      v-btn.result-card__btn(
        @click="item.booking_status === 2 ? modalShow({ params: { subject: `Запрос по забронированной квартире  (id:${item.id}) в ЖК ${item.complex}` }}) : $router.push({path: '/booking', query: {id: item.id, type: 'apartment'}})"
        block
        small
      ) {{ item.booking_status === 2 ? 'Связаться со мной' : 'Забронировать' }}
      v-btn.result-card__btn(
        v-if="item.booking_status !== 2"
        @click="modalShow({ params: { subject: `Заказ консультации по квартире (id:${item.id}) в ЖК ${item.complex}` }})"
        mode="outline"
        block
        small
      ) Консультация
</template>

<script>
import LockInfo from './shared/components/lock-info'
import favorite from '@/core/mixins/favorite'
import { ruFormat, getPricePerSquare } from '@/core/utils/numberFormat'
import { getQuarterFromDate } from '@/core/utils/date'
import { getNameRooms } from '@/core/utils/tags'
import { isNotEmptyArray } from '@/core/utils/type'
export default {
  name: 'ResultCard',
  components: {
    LockInfo
  },
  mixins: [favorite],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      visibleLockInfo: false,
      lock: true
    }
  },
  methods: {
    isNotEmptyArray,
    getNameRooms,
    getQuarterFromDate,
    ruFormat,
    getPricePerSquare,
    openImage() {
      this.$Pswp.open({
        items: [{ src: this.item.layout_image }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.result-card {
  position: relative;
  padding: 18px 35px;
  border-radius: theme(ui-radius);
  background-color: theme(white-color);
  border: 1px solid theme(grey-light);
  display: grid;
  grid-template-columns: 160px auto 200px;
  column-gap: 30px;
  @include below($desktopSml) {
    padding: 12px 25px;
    column-gap: 15px;
    grid-template-columns: 140px auto 170px;
  }
  @include below($tablet) {
    grid-template-columns: 1fr;
    padding: 12px 20px;
    height: 100%;
  }
  @include below($mobileDef) {
    padding: 12px 15px;
  }
  &__img-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &.lock {
      .result-card__img {
        opacity: 0.7;
      }
    }
    @include below($tablet) {
      margin-bottom: 20px;
    }
  }
  &__lock-icon {
    width: 30px;
    height: 30px;
    color: theme(grey-dark);
  }
  &__lock {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 6;
  }
  &__img {
    width: 100%;
    max-height: 140px;
  }
  &__name {
    display: flex;
    align-items: center;
    cursor: pointer;
    @include below($desktopSml) {
      flex-direction: column;
      align-items: flex-start;
    }
    @include below($mobileLrg) {
      flex-direction: row;
      align-items: center;
    }
    @include below($mobileDef) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__mark {
    padding: 4px 9.5px;
    font-weight: 600;
    font-size: 13px;
    background-color: theme(current-extra-light-color);
    color: theme(current-color);
    border-radius: theme(ui-radius-small);
    margin-left: 15px;
    @include below($desktopSml) {
      margin-left: 0;
      margin-top: 5px;
    }
    @include below($mobileLrg) {
      margin-top: 0;
      margin-left: 8px;
    }
    @include below($mobileDef) {
      margin-left: 0;
      margin-top: 5px;
    }
  }
  &__address {
    margin-top: 7px;
    color: theme(grey-dark);
    font-size: 14px;
  }
  &__btm {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @include below($desktopSml) {
      gap: 47px;
    }
    @include below($notebook) {
      gap: 15px;
    }
    @include below($tablet) {
      margin-top: 25px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    @include below($mobileLrg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  &__btm-label {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 7px;
  }
  &__btm-value {
    font-size: 15px;
    color: theme(grey-dark);
  }
  &__control {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__btn {
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__price-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    @include below($tablet) {
      margin: 25px 0 10px;
    }
  }
  &__price {
    font-weight: 600;
    font-size: 20px;
  }
  &__price-alt {
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    color: theme(grey);
    span {
      color: theme(current-color);
      margin-right: 5px;
    }
  }
  &__favorite {
    width: 24px;
    height: 24px;
    color: theme(grey-light);
    cursor: pointer;
    transition: color 0.15s ease;
    &.active {
      color: theme(current-color);
      &:hover {
        color: theme(current-dark-color);
      }
    }
    &:hover {
      color: theme(current-color);
    }
    @include below($tablet) {
      position: absolute;
      top: 17px;
      right: 17px;
    }
  }
  &__lock-info {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, calc(-100% - 20px));
    z-index: 2;
  }
  &__lock-text {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>

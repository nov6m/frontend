<template lang="pug">
.item-main
  .item-main__content
    .item-main__project(
      v-if="complexName"
    ) {{ complexName }}
    //.item-main__head
    //  b 15 человек
    //  | интересовались этой квартирой за последние
    //  span 24 ч
    keep-alive
      .item-main__map.item-main__img(
        v-if="curImg === 'map' && coords[0] && coords[1]"
      )
        client-only
          yandex-map.item-main__map-wrapper(
            :coords="coords"
            :zoom="17"
            :controls="['zoomControl']"
            :scroll-zoom="false"
          )
            ymap-marker(
              :coords="coords"
              markerId="1"
            )
      Photoswipe.item-main__img-wrap( v-else auto )
        v-img.item-main__img(
          :src="curImg"
          contain
          v-pswp="curImg"
        )
    v-tabs.item-main__tabs(
      v-model="tab"
      mode="underline"
    )
      v-tab.item-main__tab(
        v-if="image"
        @click="curImg = image"
      ) Планировка
      //v-tab.item-main__tab(
      //  @click="curImg = 'https://sidingvin.ru/wp-content/uploads/8/2/c/82c8591eaf17ae1e9ac9cea901317878.jpeg'"
      //) В секции
      v-tab.item-main__tab(
        v-if="planImage"
        @click="curImg = planImage"
      ) На этаже
      v-tab.item-main__tab(
        v-show="coords[0] && coords[1]"
        @click="curImg = 'map'"
      ) На карте
</template>

<script>
export default {
  name: 'ItemMain',
  props: {
    complexName: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    planImage: {
      type: String,
      default: ''
    },
    coords: {
      type: Array,
      default() {
        return [null, null]
      }
    }
  },
  data() {
    return {
      tab: 0,
      curImg: this.image
    }
  }
}
</script>

<style lang="scss" scoped>
.item-main {
  height: 100%;
  background: theme(white-color);
  border: 1px solid theme(grey-light);
  border-radius: theme(ui-radius-small);
  padding: 30px 30px 80px;
  @include below($desktopSml) {
    padding: 90px 25px 80px;
  }
  @include below($tablet) {
    padding: 80px 25px 60px;
  }
  @include below($mobileLrg) {
    padding: 60px 17px 60px;
  }
  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include below($desktopSml) {
      height: 100%;
      position: static;
    }
  }
  &__project {
    font-size: 14px;
    border-radius: theme(ui-radius);
    border: 1px solid theme(current-color);
    color: theme(current-color);
    padding: 6px 12px;
    position: absolute;
    top: 0;
    left: 0;
    @include below($desktopSml) {
      top: 30px;
      left: 25px;
    }
    @include below($mobileLrg) {
      top: 20px;
      left: 20px;
    }
  }
  &__head {
    margin-top: 7px;
    font-size: 14px;
    position: relative;
    padding-left: 15px;
    b,
    span {
      font-weight: 600;
      margin: 0 5px;
    }
    span {
      color: theme(current-color);
    }
    &:before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: theme(current-color);
      border-radius: 50%;
    }
  }
  &__img {
    margin: 40px 0 80px;
    max-height: 400px;
    width: 100%;
    @include below($desktopSml) {
      max-height: 325px;
    }
    @include below($tablet) {
      margin: 30px 0 50px;
    }
  }
  &__tabs.v-tabs.underline {
    margin-top: auto;
    @include below($tablet) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 25px;
      column-gap: 20px;
      width: 100%;
    }
  }
  &::v-deep(.v-tab) {
    margin: 0 22.5px 20px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    @include below($desktopSml) {
      margin-left: 15px;
      margin-right: 15px;
    }
    @include below($tablet) {
      margin: 0;
      text-align: center;
    }
  }
  &__map-wrapper,
  &__map {
    height: 325px;
    width: 100%;
    border-radius: theme(ui-radius);
    overflow: hidden;
  }
}
</style>

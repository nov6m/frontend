<template lang="pug">
.info-cards(
  v-if="isNotEmptyArray(items)"
)
  v-container
    v-title.info-cards__title(
      v-if="fields.title"
      v-text="fields.title"
    )
    .info-cards__items
      .info-cards__item(
        v-for="item in items"
        :key="item.id"
      )
        v-img.info-cards__img(
          :src="item.image"
          :alt="item.name"
          cover
        )
        .info-cards__text(
          v-if="item.name"
          v-text="item.name"
        )
    .info-cards__wrap-btns
      v-btn(
        v-if="fields.btnText"
        :to="fields.href"
      ) {{ fields.btnText }}
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'
import block from '@/core/mixins/block'

export default {
  name: 'InfoCards',
  mixins: [block],
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.info-cards {
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 20px;
    }
  }
  &__wrap-btns {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    @include below($tablet) {
      margin-top: 25px;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
    @include below($desktopSml) {
      gap: 17px;
    }
    @include below($notebook) {
      gap: 15px;
    }
    @include below($notebook) {
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    @include below($mobileDef) {
      gap: 12px;
    }
  }
  &__item {
    position: relative;
    height: 310px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: theme(ui-radius);
    overflow: hidden;
    @include below($desktopSml) {
      height: 211px;
      padding: 20px;
    }
    @include below($notebook) {
      height: 156px;
      padding: 15px;
    }
    @include below($mobileDef) {
      height: 128px;
      padding: 10px;
    }
    &:after {
      content: '';
      position: absolute;
      background: linear-gradient(
        179.95deg,
        rgba(0, 0, 0, 0) 0.05%,
        #000000 176.98%
      );
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__text {
    position: relative;
    z-index: 2;
    color: theme(white-color);
    font-weight: 600;
    font-size: 18px;
    @include below($notebook) {
      font-size: 16px;
    }
    @include below($mobileDef) {
      font-size: 14px;
    }
  }
}
</style>

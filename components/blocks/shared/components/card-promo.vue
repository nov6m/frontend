<template lang="pug">
component.result-card-promo(
  :is="removedFavorite ? 'div' : 'v-link'"
  :to="href || '/'"
)
  transition( name="fade" )
    .result-card-promo__favorite-dialog-wrap(
      v-show="removedFavorite"
    )
      .result-card-promo__favorite-dialog
        .result-card-promo__favorite-dialog-title Вы удалили квартиру из избранного
        .result-card-promo__favorite-dialog-help Восстановить?
        .result-card-promo__favorite-dialog-actions
          v-btn.result-card-promo__favorite-dialog-action(
            mode="outline"
            small
            block
            @click="removeFavorite(id); lazyFavoriteRemoveCallback(id)"
          ) Нет
          v-btn.result-card-promo__favorite-dialog-action(
            block
            small
            @click="removedFavorite = false"
          ) Да
  .result-card-promo__head
    .result-card-promo__mark(
      v-if="complex"
      :style="`background: ${color || 'var(--current-color)'}; color: ${idealTextColor(color || 'var(--current-color)')}`"
    ) {{ complex }}
    .result-card-promo__favorite-wrap(
      @click.prevent.stop="onClickFavorite"
    )
      v-icon.result-card-promo__favorite(
        :class="{active: hasInFavorite(id)}"
        :icon="hasInFavorite(id) ? 'heart-filled' : 'heart'"
      )
  v-img.result-card-promo__img(
    v-if="img"
    :src="img"
    contain
  )
  .result-card-promo__name {{ name }}
  .result-card-promo__btm(
    :class="{onlyPrice: !mortgage}"
  )
    .result-card-promo__mortgage(
      v-if="mortgage"
    )
      span в ипотеку
      span от {{ ruFormat(mortgage) }} ₽/мес.
    .result-card-promo__price(
      v-if="price"
    )
      | {{ ruFormat(price) }} ₽
      span(
        v-if="oldPrice"
      ) {{ ruFormat(oldPrice) }} ₽
</template>

<script>
import { ruFormat } from '@/core/utils/numberFormat'
import favorite from '@/core/mixins/favorite'
import { idealTextColor } from '@/core/utils/color'

export default {
  name: 'ResultCardPromo',
  mixins: [favorite],
  props: {
    id: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: '/'
    },
    mortgage: {
      type: [String, Number],
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    oldPrice: {
      type: String,
      default: ''
    },
    complex: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#CC163F'
    },
    lazyFavorite: {
      type: Boolean,
      default: false
    },
    lazyFavoriteRemoveCallback: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      removedFavorite: false
    }
  },
  methods: {
    ruFormat,
    idealTextColor,
    activateRemovedFavorite() {
      this.removedFavorite = true
    },
    addFavoriteHandler() {
      this.addFavorite({ id: this.id })
    },
    onClickFavorite() {
      if (!this.hasInFavorite(this.id)) {
        this.addFavoriteHandler()
        return
      }
      if (!this.lazyFavorite) {
        this.removeFavorite(this.id)
        return
      }
      this.activateRemovedFavorite()
    }
  }
}
</script>

<style lang="scss" scoped>
.result-card-promo {
  position: relative;
  height: 100%;
  border-radius: theme(ui-radius);
  border: 1px solid theme(grey-light);
  padding: 23px 30px 35px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @include below($desktopSml) {
    padding: 16px 20px 14px;
  }
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &__mark {
    padding: 3.5px 12px;
    border-radius: theme(ui-radius-small);
    font-size: 14px;
    @include below($desktopSml) {
      padding: 3.5px 8px;
      font-size: 10px;
    }
  }
  &__favorite-wrap {
    width: 24px;
    height: 24px;
    @include below($desktopSml) {
      width: 20px;
      height: 20px;
    }
  }
  &__favorite {
    width: 100%;
    height: 100%;
    color: theme(grey-light);
    cursor: pointer;
    &:hover {
      color: theme(current-color);
    }
    &.active {
      color: theme(current-color);
      &:hover {
        color: theme(current-dark-color);
      }
    }
  }
  &__img {
    height: 215px;
    max-width: 100%;
    margin-bottom: 35px;
    @include below($desktopSml) {
      height: 150px;
    }
  }
  &__name {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 24px;
    @include below($desktopSml) {
      margin-bottom: 13px;
      font-size: 16px;
    }
  }
  &__btm {
    margin-top: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    align-items: center;
    &.onlyPrice {
      grid-template-columns: 1fr;
      .result-card-promo__price {
        text-align: left;
      }
    }
  }
  &__mortgage {
    display: flex;
    flex-direction: column;
    color: theme(current-color);
    font-size: 12px;
  }
  &__price {
    white-space: nowrap;
    font-weight: 600;
    font-size: 20px;
    color: theme(current-color);
    display: flex;
    flex-direction: column;
    text-align: right;
    span {
      text-decoration-line: line-through;
      color: theme(grey-dark);
      font-size: 14px;
      font-weight: 400;
    }
    @include below($desktopSml) {
      font-size: 18px;
    }
  }
  &__favorite-dialog-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    z-index: 2;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      z-index: 1;
    }
  }
  &__favorite-dialog {
    position: relative;
    background: theme(white-color);
    box-shadow: 0 0 20px rgba(140, 140, 140, 0.25);
    border-radius: theme(ui-radius);
    width: 100%;
    z-index: 2;
    padding: 30px 22.5px 25px;
  }
  &__favorite-dialog-title {
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
  }
  &__favorite-dialog-help {
    color: theme(current-color);
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    margin-bottom: 15px;
  }
  &__favorite-dialog-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>

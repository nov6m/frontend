<template lang="pug">
.item-control
  .item-control__price-label Стоимость квартиры
  .item-control__content
    .item-control__price
      span.item-control__cur-price(
        v-if="price"
      ) {{ price }}
      span.item-control__old-price(
        v-if="oldPrice"
      ) {{ ruFormat(oldPrice) }} ₽
    .item-control__btns
      v-btn.item-control__btn.item-control__btn--phone(
        v-if="$store.getters['settings/getSalePhone']"
        :href="`tel:${$store.getters['settings/getSalePhone']}`"
        mode="outline"
      )
        v-icon.item-control__btn-icon(
          icon="phone"
        )
      v-btn.item-control__btn(
        :mode="hasInFavorite(id) ? 'default' : 'outline'"
        @click="hasInFavorite(id) ? removeFavorite(id) : addFavorite({id})"
      )
        v-icon.item-control__btn-icon(
          icon="heart"
        )
      client-only
        v-share(
          v-model="activeShare"
          :url="getCurrentHref()"
        )
          v-btn.item-control__btn(
            :mode="activeShare ? 'default' : 'outline'"
            @click="activeShare = true"
          )
            v-icon.item-control__btn-icon(
              icon="share"
            )
  .item-control__contact-btns
    v-btn.item-control__contact-btn(
      block
      large
      @click="$router.push({path: '/booking', query: {id: id, type: 'apartment'}})"
    ) Забронировать
    v-btn.item-control__contact-btn(
      v-if="btnText"
      mode="outline"
      block
      large
      @click="modalShow({ params: { subject: `Заказ консультации по квартире (id:${id})` }})"
    ) {{ btnText }}
</template>

<script>
import favorite from '@/core/mixins/favorite'
import { ruFormat } from '@/core/utils/numberFormat'
import { getCurrentHref } from '@/core/utils/url'

export default {
  name: 'ItemControl',
  mixins: [favorite],
  props: {
    id: {
      type: Number,
      default: 0
    },
    price: {
      type: String,
      default: ''
    },
    oldPrice: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    modal: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      activeShare: false
    }
  },
  methods: {
    getCurrentHref,
    ruFormat
  }
}
</script>

<style lang="scss" scoped>
.item-control {
  height: 100%;
  padding: 25px 35px 40px;
  display: flex;
  flex-direction: column;
  background: theme(white-color);
  border: 1px solid theme(grey-light);
  border-radius: theme(ui-radius-small);
  @include below($desktopSml) {
    padding: 25px 25px 30px;
  }
  @include below($tablet) {
    padding: 25px 25px 30px;
  }
  @include below($mobileLrg) {
    padding: 25px 17px 25px;
  }
  &__content {
    margin: 5px 0 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    @include below($mobileDef) {
      grid-template-columns: 1fr;
      row-gap: 18px;
    }
  }
  &__price-label {
    color: theme(grey-dark);
  }
  &__contact-btn {
    margin-top: auto;
  }
  &__price {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__cur-price {
    font-weight: 600;
    font-size: 26px;
  }
  &__old-price {
    margin-top: auto;
    font-size: 14px;
    color: theme(grey-dark);
    text-decoration-line: line-through;
  }
  &__btn-icon {
    width: 24px;
    height: 21px;
  }
  &__btns {
    display: flex;
    justify-content: flex-end;
    @include below($mobileDef) {
      justify-content: flex-start;
    }
  }
  &__btn {
    &--phone {
      @include above($notebook) {
        display: none;
      }
    }
  }
  &__btn.v-btn {
    width: 45px;
    padding: 5px;
    margin-left: 5px;
  }
  &__contact-btns {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
  }
}
</style>

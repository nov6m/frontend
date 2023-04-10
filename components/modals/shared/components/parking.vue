<template lang="pug">
.parking
  v-icon.parking__close( icon="close" @click="$emit('closePopup')" )
  v-img.parking__img(
    :src="require('@/assets/img/parking-place.png')"
    alt="parking"
  )
  .parking__title Машиноместо № {{ getValue('parking').place }}
  .parking__param
    .parking__param-label Площадь:
    .parking__param-value {{ getValue('parking').square }} м2
  .parking__param(
    v-if="getValue('parking').status === 'free'"
  )
    .parking__param-label Цена:
    .parking__param-value {{ ruFormat(getValue('parking').price) }} ₽
  .parking__help( v-else ) Сообщить, если снимут бронь
  v-btn.parking__btn(
    small
    block
    @click="openModal"
  ) {{ getValue('parking').status === 'free' ? 'Забронировать' : 'Связаться со мной' }}
</template>

<script>
import { ruFormat } from '@/core/utils/numberFormat'
import ticket from '@/core/mixins/ticket'

export default {
  name: 'ParkingModal',
  mixins: [ticket],
  methods: {
    ruFormat,
    openModal() {
      if (this.getValue('parking').status === 'free') {
        this.$router.push({
          path: '/booking',
          query: {
            id: this.getValue('parking')?.id,
            type: 'parking'
          }
        })
      } else {
        this.modalShow({
          name: 'default',
          parking: this.getValue('parking')?.id,
          code: 'free-place'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.parking {
  position: relative;
  width: 260px;
  padding: 40px 20px 20px;
  box-shadow: 0 0 30px rgba(140, 140, 140, 0.25);
  &__title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
  }
  &__img {
    margin-bottom: 10px;
  }
  &__param {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 15px;
    }
    &-value {
      color: theme(grey-dark);
    }
  }
  &__help {
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    margin-bottom: 10px;
  }
  &__close {
    position: absolute;
    top: 10px;
    right: 20px;
    width: 16px;
    height: 18px;
    cursor: pointer;
    color: theme(grey-dark);
  }
}
</style>

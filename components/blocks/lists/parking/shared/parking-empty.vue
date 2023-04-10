<template lang="pug">
.parking-empty
  v-container
    .parking-empty__title {{ mode === 'empty' ? 'Выберите интересующий Вас Жилой комплекс и номер дома' : 'К сожалению, по вашему запросу ничего не найдено' }}
    template( v-if="mode === 'selected'" )
      .parking-empty__subtitle Попробуйте изменить параметры поиска
      v-btn.parking-empty__btn( @click="$emit('reset')" ) Сбросить фильтр
</template>

<script>
export default {
  name: 'ParkingEmpty',
  props: {
    mode: {
      type: String,
      default: 'empty'
    }
  }
}
</script>

<style lang="scss" scoped>
.parking-empty {
  height: 420px;
  background: url('@/assets/img/parking.png') center left/cover no-repeat;
  @include below($tablet) {
    background-position: center 50%;
  }
  &__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  &__subtitle {
    color: theme(grey-dark);
    margin-bottom: 25px;
    font-size: 14px;
  }
}
</style>

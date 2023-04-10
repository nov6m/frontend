<template lang="pug">
.not-found-result
  .not-found-result__content
    .not-found-result__title К сожалению, по вашему запросу ничего не найдено
    .not-found-result__desc Попробуйте изменить параметры поиска
    v-btn.not-found-result__btn(
      @click="reset"
    ) Сбросить фильтр
</template>

<script>
export default {
  name: 'NotFoundResult',
  methods: {
    reset() {
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found-result {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  @include below($notebook) {
    min-height: 50vh;
    align-items: flex-start;
    padding-top: 80px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 500px;
  }
  &__title {
    font-weight: 600;
    font-size: 26px;
    @include below($desktopSml) {
      font-size: 26px;
    }
    @include below($notebook) {
      font-size: 24px;
    }
    @include below($tablet) {
      font-size: 20px;
    }
  }
  &__desc {
    font-size: 14px;
    margin-top: 10px;
    color: theme(grey-dark);
    margin-bottom: 25px;
  }
}
</style>

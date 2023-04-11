<template lang="pug">
.vacancy-head
  .vacancy-head__item Услуга
  .vacancy-head__item Стоимость
  .vacancy-head__item(v-if="city") Город
</template>

<script>
export default {
  name: 'ServicesHead',
  props: {
    city: {
      type: Boolean,
      default() {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vacancy-head {
  display: grid;
  color: theme(grey-dark);
  grid-template-columns: 2fr 1fr 1fr 1fr 0.3fr;
  padding: 8px 18px 8px 0;
  @include below($notebook) {
    font-size: 14px;
  }
  @include below($tablet) {
    grid-template-columns: 2fr 1fr 0.6fr 0.6fr 0.3fr;
  }
  @include below($mobileLrg) {
    display: none;
  }
}
</style>

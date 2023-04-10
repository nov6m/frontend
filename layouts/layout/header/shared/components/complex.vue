<template lang="pug">
.complex-header
  .complex-header__name Осенний лист
  .complex-header__menu
    nav.complex-header__nav
      v-link.complex-header__nav-item О проекте
      v-link.complex-header__nav-item Инфраструктура
      v-link.complex-header__nav-item Расположение
    v-btn.complex-header__btn(
      small
    ) Выбрать квартиру
</template>

<script>
export default {
  name: 'ComplexHeader'
}
</script>

<style lang="scss" scoped>
.complex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  &__name {
    font-weight: 600;
    font-size: 18px;
  }
  &__menu {
    display: flex;
    align-items: center;
  }
  &__nav {
    display: flex;
    align-items: center;
  }
  &__nav-item {
    margin-right: 48px;
    font-size: 14px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__btn {
    margin-left: 30px;
  }
}
</style>

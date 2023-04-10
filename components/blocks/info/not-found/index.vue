<template lang="pug">
v-container
  .not-found
    .not-found__code
      span 404
      v-img.not-found__img(
        :src="require('@/assets/img/404.png')"
      )
    .not-found__title Возможно Вы искали что-то другое
    .not-found__subtitle По вашему запросу ничего не найдено
    .not-found__links
      v-link.not-found__link(
        to="/"
      ) Главная страница
      v-link.not-found__link(
        to="/apartment"
      ) Квартиры в продаже
      v-link.not-found__link(
        to="/offers"
      ) Акции
      //v-link.not-found__link(
      //  to="/"
      //) Проекты
      v-link.not-found__link(
        to="/about"
      ) О компании
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
  text-align: center;
  &__code {
    position: relative;
    bottom: -60px;
    @include below($mobileLrg) {
      bottom: -30px;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, calc(-50% - 50px));
      color: theme(white-color);
      font-weight: 800;
      font-size: 150px;
      @include below($tablet) {
        font-size: 100px;
      }
      @include below($mobileLrg) {
        font-size: 75px;
        transform: translate(-50%, calc(-50% - 30px));
      }
    }
  }
  &__img {
    display: block;
    margin: 0 auto;
    @include below($tablet) {
      width: 100%;
      height: 100%;
    }
  }
  &__title {
    font-weight: 700;
    font-size: 28px;
    margin-bottom: 10px;
    @include below($tablet) {
      font-size: 20px;
    }
    @include below($mobileLrg) {
      font-size: 16px;
    }
  }
  &__subtitle {
    margin-bottom: 50px;
    font-size: 18px;
    @include below($tablet) {
      margin-bottom: 35px;
    }
    @include below($mobileLrg) {
      font-size: 14px;
    }
  }
  &__links {
    display: flex;
    justify-content: center;
    @include below($tablet) {
      flex-wrap: wrap;
    }
  }
  &__link {
    margin: 0 10px;
    font-weight: 600;
    font-size: 15px;
    color: theme(current-color);
    transition: 0.2s ease;
    @include below($tablet) {
      margin: 0 5px 10px;
    }
    @include below($mobileLrg) {
      font-size: 14px;
    }
    &:hover {
      color: theme(current-dark-color);
    }
  }
}
</style>

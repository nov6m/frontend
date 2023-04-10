<template lang="pug">
.empty-favorite
  .empty-favorite__content
    v-title.empty-favorite__title(tag="h1") В избранном пусто
    .empty-favorite__text
      | Чтобы добавить понравившуюся
      br
      span
        | квартиру в избранное, нажмите на
        v-icon.empty-favorite__icon(icon="heart")
        | в&nbsp;списке&nbsp;квартир.
    v-btn(to="/apartment") Выбрать квартиру
  .empty-favorite__img
</template>

<script>
export default {
  name: 'EmptyFavorite'
}
</script>

<style lang="scss" scoped>
.empty-favorite {
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include below($notebook) {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    height: unset;
    padding-top: 30px;
  }
  &__img {
    height: 100%;
    width: 417px;
    background: url('@/assets/img/empty-favorite.png') center center/contain
      no-repeat;
    @include below($notebook) {
      margin-top: 60px;
      width: 100%;
      height: 320px;
      background: url('@/assets/img/m-empty-favorite.png') center left/contain
        no-repeat;
    }
    @include below($tablet) {
      margin-top: 30px;
    }
    @include below($mobileLrg) {
      height: 250px;
    }
    @include below($mobileDef) {
      height: 180px;
    }
  }
  &__title {
    margin-bottom: 16px;
    @include below($notebook) {
      margin-bottom: 10px;
    }
  }
  &__text {
    font-size: 16px;
    margin-bottom: 28px;
    @include below($notebook) {
      margin-bottom: 14px;
    }
    @include below($tablet) {
      font-size: 14px;
    }
    span {
      display: flex;
      align-items: center;
      @include below($notebook) {
        flex-wrap: wrap;
      }
    }
  }
  &__icon {
    width: 23px;
    height: 23px;
    color: theme(current-color);
    margin: 0 5px;
  }
}
</style>

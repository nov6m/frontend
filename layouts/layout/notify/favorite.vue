<template lang="pug">
transition(
  name="fade"
)
  .notify-favorite(
    v-if="activeNotify"
  )
    v-container
      .notify-favorite__wrapper
        .notify-favorite__main
          v-img.notify-favorite__img(
            v-if="notify.img"
            :src="notify.img"
            :alt="notify.title"
            contain
          )
          .notify-favorite__text
            .notify-favorite__title
              span(
                v-if="notify.title"
              ) {{ notify.title }}
              .notify-favorite__status добавленна в избранное
            .notify-favorite__subtitle(
              v-if="notify.subtitle"
            ) {{ notify.subtitle }}
        .notify-favorite__control
          v-btn.notify-favorite__btn(
            to="/favorite"
            small
          ) Смотреть избранное
          v-icon.notify-favorite__close(
            @click="disableNotify"
            icon="close"
          )
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'NotifyFavorite',
  computed: {
    ...mapGetters({
      notify: 'favorite/notify',
      activeNotify: 'favorite/activeNotify'
    })
  },
  methods: {
    ...mapMutations({
      disableNotify: 'favorite/disableNotify'
    })
  }
}
</script>

<style lang="scss" scoped>
.notify-favorite {
  position: fixed;
  top: 20px;
  width: 100%;
  left: 0;
  z-index: 120;
  &__wrapper {
    position: relative;
    padding: 18px 30px;
    background-color: theme(white-color);
    box-shadow: 0 0 30px rgba(140, 140, 140, 0.25);
    border: 1px solid theme(grey-light);
    border-radius: theme(ui-radius);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    @include below($notebook) {
      padding: 16px 25px;
      height: unset;
    }
    @include below($mobileLrg) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 12px 15px;
    }
  }
  &__img {
    height: 100%;
    max-width: 100%;
    margin-right: 30px;
    @include below($notebook) {
      margin-right: 20px;
      max-height: 65px;
    }
    @include below($mobileDef) {
      display: none;
    }
  }
  &__main {
    @include below($mobileDef) {
      padding-right: 20px;
    }
  }
  &__main, &__control {
    display: flex;
    align-items: center;
    height: 100%;
    @include below($mobileDef) {
      width: 100%;
    }
  }
  &__close {
    width: 16px;
    height: 16px;
    margin-left: 30px;
    cursor: pointer;
    @include below($notebook) {
      margin-left: 15px;
    }
    @include below($mobileLrg) {
      position: absolute;
      right: 18px;
      top: 15px;
    }
  }
  &__title {
    display: flex;
    align-items: center;
    @include below($tablet) {
      flex-direction: column;
      align-items: flex-start;
    }
    > span {
      font-weight: 600;
      font-size: 20px;
      @include below($notebook) {
        font-size: 16px;
      }
    }
  }
  &__status {
    margin-left: 22px;
    color: theme(current-color);
    font-weight: 600;
    @include below($notebook) {
      margin-left: 16px;
      font-size: 14px;
    }
    @include below($tablet) {
      margin-bottom: 5px;
      margin-left: 0;
    }
    @include below($mobileDef) {
      margin-bottom: 0;
    }
  }
  &__subtitle {
    margin-top: 2px;
    font-size: 14px;
    color: theme(grey-dark);
    @include below($notebook) {
      font-size: 12px;
    }
  }
  &__btn {
    @include below($mobileDef) {
      margin-top: 8px;
      width: 100%;
    }
  }
}
</style>

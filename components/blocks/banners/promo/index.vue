<template lang="pug">
.promo-container
  .promo-banner(
    :style="`background: url(https://chel.miloserdie.pro/files/originals/med-servis.jpg) center bottom/cover no-repeat`"
  )
    v-container
      v-breadcrumbs.promo-banner__breadcrumbs(
        :items="breadcrumbs"
      )
      .promo-banner__container
        .promo-banner__wrap
          v-title.promo-banner__title(
            v-if="fields.title"
            v-text="fields.title"
            tag="h1"
          )
          .promo-banner__subtitle(
            v-if="fields.subtitle"
            v-text="fields.subtitle"
          )
          v-btn.promo-banner__btn(
            v-if="fields.btnText"
            :to="fields.link || ''"
            @click="modalShow(fields.modal)"
          ) {{ fields.btnText }}
      .promo-background(
        :style="{opacity: '0.4'}"
      )
</template>

<script>
export default {
  name: 'PromoBanner',
  props: {
    fields: {
      type: Object,
      default() {
        return {
          title: 'Осуществляем транспортировку по Оренбургу, Оренбургской области и России',
          subtitle: 'ПЕРЕВОЗКИ ЛЕЖАЧИХ БОЛЬНЫХ И ЛИЦ С ОГРАНИЧЕННЫМИ ФИЗИЧЕСКИМИ ВОЗМОЖНОСТЯМИ',
          btnText: 'Заказать перевозку'
        }
      }
    },
    breadcrumbs: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.promo-banner {
  &__container {
    height: 590px;
    display: flex;
    align-items: center;
    padding: 40px 0;
    @include below($tablet) {
      height: 440px;
    }
  }
  &__wrap {
    margin-top: -25px;
    max-width: 588px;
  }
  &__title {
    color: #FFF;
    z-index: 20;
  }
  &__subtitle {
    margin-top: 15px;
    line-height: 17px;
    @include below($tablet) {
      font-size: 14px;
    }
    color: #FFF;
  }
  &__btn {
    margin-top: 28px;
  }
  &__breadcrumbs {
    padding-top: 25px;
  }
  &__container {
    z-index: 30;
    position: relative;
  }
}
.promo-background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000;
}

.promo-container {
  position: relative;
}
</style>

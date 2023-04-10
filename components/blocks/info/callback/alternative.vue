<template lang="pug">
.info-callback-alt
  v-container
    .info-callback-alt__wrap
      v-img.info-callback-alt__img(
        v-if="fields.img"
        :src="fields.img"
        :alt="fields.title"
        contain
      )
      .info-callback-alt__content
        .info-callback-alt__text
          v-title.info-callback-alt__title(
            v-if="fields.title"
            tag="h2"
            v-text="fields.title"
          )
          v-text.info-callback-alt__subtitle(
            v-if="fields.subtitle"
            :text="fields.subtitle"
          )
        v-btn.info-callback-alt__btn(
          v-if="fields.btnText"
          v-bind="link"
          @click="handleClick"
        ) {{ fields.btnText }}
        v-btn.info-callback-alt__btn(
          v-if="fields.btn?.text"
          v-text="fields.btn?.text"
          :to="fields.btn.link"
          @click="openModal(fields.btn.modal)"
        )
</template>

<script>
export default {
  name: 'InfoCallbackAlt',
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    openModal(modal) {
      this.modalShow({
        name: modal.type,
        title: modal.title,
        buttonText: modal.btnText
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-callback-alt {
  &__wrap {
    background-color: theme(light);
    overflow: hidden;
    border-radius: theme(ui-radius);
    padding: 45px 70px 0 70px;
    position: relative;
    display: grid;
    grid-template-columns: 3fr 7fr;
    gap: 50px;
    justify-content: space-between;
    @include below($desktopSml) {
      grid-template-columns: 1fr;
      padding: 25px 55px 0 55px;
    }
    @include below($tablet) {
      padding: 24px 24px 0 24px;
    }
  }
  &__title {
    margin-bottom: 15px;
    font-weight: 600;
    font-size: 20px;
  }
  &__subtitle {
    @include below($desktopSml) {
      font-size: 14px;
    }
  }
  &__btn {
    margin-top: 26px;
  }
  &__content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 45px;
    @include below($desktopSml) {
      padding-bottom: 25px;
    }
    @include below($tablet) {
      flex-direction: column;
      align-items: flex-start;
      padding-bottom: 24px;
    }
  }
  &__text {
    max-width: 405px;
    @include below($tablet) {
      max-width: 100%;
    }
  }
  &__img {
    @include below($desktopSml) {
      display: none;
    }
  }
}
</style>

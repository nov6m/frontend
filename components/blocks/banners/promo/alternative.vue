<template lang="pug">
.promo-banner-alt(
)
  v-container.promo-banner-alt__container
    .promo-banner-alt__content(
     :style="`background: url(https://san-express-orenburg.ru/images/2022/04/02/-38-1.webp) center bottom/cover no-repeat`"
    )
      .promo-banner-alt__wrap
        v-title.promo-banner-alt__title(
          v-if="fields.title"
          v-text="fields.title"
          tag="h1"
        )
        .promo-banner-alt__subtitle(
          v-if="fields.subtitle"
          v-text="fields.subtitle"
        )
        .promo-banner-alt__btns
          v-btn.promo-banner-alt__btn(
            v-if="fields.btnLeft?.text"
            v-text="fields.btnLeft?.text"
            mode="white"
            :to="fields.btnLeft.link"
            @click="openModal(fields.btnLeft.modal)"
          )
          v-btn.promo-banner-alt__btn(
            v-if="fields.btnRight?.text"
            v-text="fields.btnRight?.text"
            mode="outline-white"
            :to="fields.btnRight.link"
            @click="openModal(fields.btnRight.modal)"
          )
</template>

<script>
export default {
  name: 'AlternativePromoBanner',
  props: {
    fields: {
      type: Object,
      default() {
        return {
          title: 'Сделать заявку на перевозку',
          subtitle: `Закажите поездку на нужную Вам дату и время!
Заполните заявку, мы перезвоним Вам для уточнения деталей и подтверждения заказа'`,
          btnLeft: {
            text: 'Заказать перевозку',
            modal: {
              type: 'vacancy',
              title: 'Сделать заявку на перевозку',
              btnText: 'Заказать'
            }
          }
        }
      }
    },
    breadcrumbs: {
      type: Array,
      default() {
        return []
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
.promo-banner-alt {
  height: 492px;
  color: theme(white-color);
  padding: 25px 0;
  @include below($notebook) {
    height: 420px;
  }
  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
  }
  &__wrap {
    position: relative;
    z-index: 1;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    border-radius: 24px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    background: rgba(0,0,0,0.7); // фон с прозрачностью 70%
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0; 
  }
  }
  &__title {
    font-weight: 700;
    font-size: 42px;
    @include below($notebook) {
      font-size: 36px;
    }
    @include below($mobileDef) {
      font-size: 28px;
    }
  }
  &__subtitle {
    font-size: 17px;
    margin-top: 15px;
    // white-space: pre;
    @include below($notebook) {
      font-size: 15px;
    }
  }
  &__btns {
    margin-top: 34px;
    display: inline-flex;
    gap: 15px;
    justify-content: center;
    @include below($mobileDef) {
      flex-direction: column;
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
}
</style>

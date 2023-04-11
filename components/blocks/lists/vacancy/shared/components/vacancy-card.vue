<template lang="pug">
.vacancy-card
  .vacancy-card__head(
    @click="active = !active"
  )
    .vacancy-card__field.vacancy-card__name
      | {{ name }}
      span {{ rate }}
    .vacancy-card__field.vacancy-card__type {{ category || '-' }}
    .vacancy-card__field.vacancy-card__city {{ city || '' }}
    .vacancy-card__field.vacancy-card__year {{ experience }}
    .vacancy-card__field.vacancy-card__trigger
      v-icon.vacancy-card__arrow( icon="arrow-down" :class="{active}" )
  slide-up-down(
    :active="active"
  )
    v-text.vacancy-card__text( v-html="text" )
    .vacancy-card__btns(v-if="showButton")
      v-btn.vacancy-card__btn(
        @click="modalShow({name: 'vacancy', vacancy: name})"
        small
      ) Заказать
  v-divider
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'

export default {
  name: 'ServicesCard',
  components: {
    SlideUpDown
  },
  props: {
    category: String,
    text: String,
    experience: String,
    rate: String,
    name: String,
    city: String,
    showButton: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      active: false
    }
  }
}
</script>

<style lang="scss" scoped>
.vacancy-card {
  &__head {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 0.3fr;
    padding: 8px 18px 8px 0;
    cursor: pointer;
    @include below($notebook) {
      font-size: 14px;
    }
    @include below($tablet) {
      grid-template-columns: 2fr 1fr 0.6fr 0.6fr 0.3fr;
    }
    @include below($mobileLrg) {
      padding: 8px 0 20px 0;
      grid-template-columns: 1fr 1fr 1fr;
      row-gap: 12px;
    }
    @include below($mobileDef) {
      grid-template-columns: 1fr 1fr 0.6fr;
    }
  }
  &__field {
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span {
      display: block;
      width: 100%;
      font-weight: 600;
      margin-top: 2px;
    }
    &:last-child {
      justify-content: flex-end;
    }
  }
  &__arrow {
    width: 24px;
    height: 24px;
    color: theme(current-color);
    transition: transform 0.2s ease;
    &.active {
      transform: rotate(180deg);
    }
  }
  &__text {
    padding-top: 20px;
    @include below($mobileLrg) {
      padding-top: 0;
    }
  }
  &__btns {
    display: flex;
    gap: 15px;
    padding: 30px 16px 50px;
    @include below($notebook) {
      padding: 20px 0 30px;
    }
    @include below($mobileLrg) {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }
  &__name {
    @include below($mobileLrg) {
      grid-column: span 2;
      order: -2;
    }
  }
  &__trigger {
    @include below($mobileLrg) {
      order: -1;
    }
  }
  &__city {
    @include below($mobileLrg) {
      display: flex;
      justify-content: center;
      border-right: 1px solid theme(grey-light);
      border-left: 1px solid theme(grey-light);
    }
  }
  &__year {
    @include below($mobileLrg) {
      display: flex;
      justify-content: flex-end;
      text-align: right;
    }
  }
}
</style>

<template lang="pug">
transition(name="fade")
  .card-lock-info(
    v-show="active"
  )
    span.card-lock-info__target-arrow
    .card-lock-info__content
      .card-lock-info__title(
        v-if="title"
      ) {{ title }}
      .card-lock-info__subtitle(
        v-if="subtitle"
      ) {{ subtitle }}
      v-btn(
        v-if="btnText"
        small
        @click="modalShow"
      ) {{ btnText }}
</template>

<script>
export default {
  name: 'CardLockInfo',
  model: {
    prop: 'active',
    event: 'update:active'
  },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card-lock-info {
  position: relative;
  box-shadow: 0 0 20px rgba(140, 140, 140, 0.35);
  min-width: 320px;
  @include below($notebook) {
    min-width: 220px;
  }
  &__content {
    position: relative;
    z-index: 1;
    background: theme(white-color);
    padding: 23px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: theme(ui-radius-small);
    overflow: hidden;
    @include below($notebook) {
      padding: 16px 8px;
    }
  }
  &__title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 8px;
  }
  &__subtitle {
    font-size: 14px;
    margin-bottom: 15px;
    color: theme(grey-dark);
  }
  &__target-arrow {
    position: absolute !important;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(50%) rotate(45deg);
    width: 20px;
    height: 20px;
    background: theme(white-color);
    box-shadow: 0 0 20px rgba(140, 140, 140, 0.35);
  }
}
</style>

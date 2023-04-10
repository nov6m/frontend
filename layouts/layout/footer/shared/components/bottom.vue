<template lang="pug">
.layout-footer-bottom
  .layout-footer-bottom__developer
    | Разработано
    span LegoCar
</template>

<script>
export default {
  name: 'LayoutFooterBottom'
}
</script>

<style lang="scss" scoped>
.layout-footer-bottom {
  display: flex;
  justify-content: flex-end;
  padding: 5px 0 54px;
  @include below($tablet) {
    padding-bottom: 20px;
  }
  &__developer {
    color: theme(grey);
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    span {
      font-size: 28px;
      text-transform: none;
    }
  }
}
</style>

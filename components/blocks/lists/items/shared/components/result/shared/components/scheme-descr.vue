<template lang="pug">
.scheme-descr
  .scheme-descr__item
    scheme-cell( icon="lock" )
    | Забронированна
  .scheme-descr__item
    scheme-cell( text="2" )
    | Свободна
  .scheme-descr__item
    scheme-cell
    | Продана
</template>

<script>
import SchemeCell from './shared/components/scheme-cell'
export default {
  name: 'SchemeDescr',
  components: { SchemeCell }
}
</script>

<style lang="scss" scoped>
.scheme-descr {
  display: flex;
  align-items: center;
  gap: 35px;
  @include below($tablet) {
    flex-wrap: wrap;
    gap: 15px;
  }
  &__item {
    display: flex;
    align-items: center;
    font-size: 14px;
    @include below($mobileDef) {
      width: 100%;
    }
  }
}
</style>

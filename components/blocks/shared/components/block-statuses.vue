<template lang="pug">
.map-statuses
  .map-statuses__item(
    v-for="(item, name) in items"
    :key="name"
  )
    .map-statuses__box(
      :style="{'background-color': item.color}"
    )
    .map-statuses__title {{ item.title }}
</template>

<script>
export default {
  name: 'BlockStatuses',
  props: {
    items: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map-statuses {
  display: flex;
  flex-wrap: wrap;
  @include below($tablet) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
  }
  &__box {
    width: 34px;
    height: 34px;
    margin-right: 18px;
    border: 1px solid theme(grey-light);
    border-radius: theme(ui-radius);
    @include below($notebook) {
      margin-right: 10px;
    }
    @include below($tablet) {
      width: 25px;
      height: 25px;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    margin-right: 60px;
    @include below($notebook) {
      margin-right: 30px;
    }
    @include below($tablet) {
      font-size: 14px;
    }
  }
}
</style>

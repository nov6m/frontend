<template lang="pug">
.card-item(
  v-if="apartment"
)
  v-container
    v-breadcrumbs.card-item__breadcrumbs(
      :items="breadcrumbs"
    )
    .card-item__content
      .card-item__block.card-item__block--main
        main-block(
          :complex-name="apartment.complexName"
          :image="apartment.image"
          :plan-image="apartment.planImage"
          :coords="apartment.houseCoords"
        )
      .card-item__block
        sidebar-block(
          :title="apartment.getWordsNumberOfRooms()"
          :subtitle="`${apartment.square}, ${apartment.locationOnFloor}`"
          :params="apartment.getParamsListByKey(APARTMENT_PARAM_KEY)"
          :status="apartment.bookingStatus"
        )
      .card-item__block
        control-block(
          :id="apartment.id"
          :price="apartment.price"
          :btnText="fields.btnText"
          :modal="fields.modal"
        )
</template>

<script>
import MainBlock from './shared/components/main'
import SidebarBlock from './shared/components/sidebar'
import ControlBlock from './shared/components/control'
import VBreadcrumbs from '@/components/ui-kit/v-breadcrumbs'
import block from '@/core/mixins/block'
import { APARTMENT_PARAM_KEY } from './constants'

export default {
  name: 'ItemCard',
  components: {
    VBreadcrumbs,
    MainBlock,
    SidebarBlock,
    ControlBlock
  },
  mixins: [block],
  data() {
    return {
      APARTMENT_PARAM_KEY,
      apartment: false
    }
  }
}
</script>

<style lang="scss" scoped>
.card-item {
  padding: 25px 0 40px;
  background-color: #f7f7f7;
  @include below($tablet) {
    padding: 10px 0 20px;
  }
  &__content {
    display: grid;
    grid-template-columns: auto 450px;
    grid-template-rows: auto 250px;
    gap: 10px;
    @include below($desktopSml) {
      grid-template-columns: 505px auto;
      grid-template-rows: auto 250px;
    }
    @include below($notebook) {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }
  }
  &__block {
    position: relative;
    &--main {
      grid-row: span 2;
    }
  }
  &__breadcrumbs {
    margin-bottom: 30px;
    @include below($tablet) {
      margin-bottom: 15px;
    }
  }
}
</style>

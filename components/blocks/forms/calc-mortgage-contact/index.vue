<template lang="pug">
.form-calc-mortgage
  v-img.form-calc-mortgage__bg(
    v-if="fields.img"
    :src="fields.img"
    :alt="fields.title || 'Расчет ипотеки'"
    cover
  )
  v-container.form-calc-mortgage__container
    form-calc.form-calc-mortgage__content(
      :title="fields.title"
      :description="fields.description"
      :disclaimer="fields.disclaimer"
      :btn-text="fields.btnText"
      :min-year="fields.minYear"
      :max-year="fields.maxYear"
      :min-price="fields.minPrice"
      :max-price="fields.maxPrice"
    )
</template>

<script>
import formCalc from './shared/components/form'

export default {
  name: 'FormCalcMortgageContact',
  components: {
    formCalc
  },
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-calc-mortgage {
  position: relative;
  padding: 36px 0;
  height: 630px;
  @include below($tablet) {
    height: unset;
  }
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__container {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @include below($notebook) {
      justify-content: center;
    }
  }
  &__content {
    position: relative;
    z-index: 1;
    width: 445px;
    @include below($mobileDef) {
      width: 100%;
    }
  }
}
</style>

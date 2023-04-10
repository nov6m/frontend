<template lang="pug">
.info-mortgage(
  v-if="isNotEmptyArray(items)"
)
  v-container
    v-title.info-mortgage__title(
      v-if="fields.title"
      v-text="fields.title"
    )
    .info-mortgage__items
      card-mortgage-small.info-mortgage__item(
        v-for="(item, idx) in items"
        :key="idx"
        :title="item.name"
        :mark="item.otherText"
        :img="item.image"
        :modal="item.feedbackForm"
      )
</template>

<script>
import CardMortgageSmall from '@/components/blocks/shared/components/card-mortgage-small'
import { isNotEmptyArray } from '@/core/utils/type'
import Api from '@/core/Api'
import { acquisitionMethodsComplexQuery } from '@/query'

export default {
  name: 'InfoMortgage',
  components: { CardMortgageSmall },
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      items: []
    }
  },
  async fetch() {
    const { complex } = await Api.graphQL(acquisitionMethodsComplexQuery, {
      id: this.id
    })
    this.items = complex.acquisitionMethods
  },
  fetchOnServer: false,
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.info-mortgage {
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 25px;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    @include below($desktopSml) {
      gap: 13px;
    }
    @include below($notebook) {
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    @include below($tablet) {
      grid-template-columns: repeat(2, 1fr);
      gap: 17px;
    }
    @include below($mobileDef) {
      gap: 10px;
    }
  }
}
</style>

<template lang="pug">
.info-slide( v-if="isNotEmptyArray(fields.items)" )
  v-container
    v-title.info-slide__title(
      v-if="fields.title"
      v-text="fields.title"
    )
    .info-slide__items
      slide-up-item(
        v-for="(item, idx) in fields.items"
        :key="idx"
        :title="item.title"
        :text="item.text"
      )
</template>

<script>
import SlideUpItem from './shared/components/slide-up-item'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'InfoSlideUp',
  components: { SlideUpItem },
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.info-slide {
  &__title {
    margin-bottom: 10px;
  }
}
</style>

<template lang="pug">
.offer-card
  v-container
    v-title.offer-card__title(
      v-if="news.name"
      v-text="news.name"
      tag="h1"
    )
    .offer-card__wrapper
      v-text.offer-card__content(
        v-html="news.description"
      )
</template>

<script>
import block from '@/core/mixins/block'
export default {
  name: 'NewsCard',
  mixins: [block]
}
</script>

<style lang="scss" scoped>
.offer-card {
  &__title {
    margin-bottom: 25px;
  }
}
</style>

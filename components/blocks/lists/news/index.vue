<template lang="pug">
.news-list
  v-container
    v-title.news-list__title(
      v-if="fields.title"
      v-text="fields.title"
    )
    .news-list__items(
      v-if="isNotEmptyArray(items)"
    )
      card-news.news-list__item(
        v-for="item in items"
        :key="item.id"
        :title="item.name"
        :description="item.shortDescription"
        :date="item.publicationDate"
        :to="item.url"
      )
    //.news-list__btm
    //  v-btn.news-list__btn(
    //    @click=""
    //  ) Показать еще
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'
import CardNews from '@/components/blocks/shared/components/card-news'
import block from '@/core/mixins/block'

export default {
  name: 'NewsList',
  components: {
    CardNews
  },
  mixins: [block],
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.news-list {
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 25px;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 27px;
    @include below($desktopSml) {
      grid-template-columns: repeat(3, 1fr);
      gap: 25px;
    }
    @include below($tablet) {
      grid-template-columns: 1fr 1fr;
    }
    @include below($mobileLrg) {
      grid-template-columns: 1fr;
      gap: 15px;
    }
  }
  &__btm {
    margin-top: 70px;
    display: flex;
    justify-content: center;
    @include below($desktopSml) {
      margin-top: 50px;
    }
  }
}
</style>

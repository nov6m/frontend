<template lang="pug">
.list-files(
  v-if="isNotEmptyArray(items)"
)
  v-container
    .list-files__cnt
      v-title.list-files__title(
        v-if="fields.title"
        v-text="fields.title"
      )
      v-description.list-files__descr(
        v-if="fields.description"
        v-text="fields.description"
      )
      .list-files__items
        .list-files__item(
          v-for="(item, idx) in items"
          v-if="item.file"
          :key="idx"
        )
          v-icon.list-files__icon(
            icon="file"
          )
          .list-files__text
            .list-files__name {{ item.name }}
            span.list-files__weight {{ item.size }}
            v-link.list-files__link(
              :to="item.file"
              external
            ) Скачать {{ getFileTypeFromUrl(item.file).toUpperCase() }}
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'
import Api from '@/core/Api'
import { complexFilesQuery } from '@/query'
import { getFileTypeFromUrl } from '@/core/utils/url'

export default {
  name: 'ListFiles',
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      items: []
    }
  },
  async fetch() {
    const { complex } = await Api.graphQL(complexFilesQuery, {
      id: this.id
    })
    if (complex) {
      this.items = complex.files
    }
  },
  fetchOnServer: false,
  methods: {
    getFileTypeFromUrl,
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.list-files {
  &__cnt {
    position: relative;
  }
  &__title,
  &__descr {
    margin-bottom: 25px;
    @include below($tablet) {
      margin-bottom: 20px;
    }
  }
  &__items {
    display: flex;
    flex-wrap: wrap;
    @include below($desktopSml) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    @include below($tablet) {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    @include below($mobileDef) {
      gap: 20px;
    }
  }
  &__item {
    display: flex;
    margin-right: 65px;
    font-size: 18px;
    @include below($desktopSml) {
      margin-right: 0;
    }
    @include below($tablet) {
      font-size: 16px;
      align-items: center;
    }
  }
  &__icon {
    color: theme(grey);
    width: 34px;
    height: 48px;
    margin-right: 30px;
    @include below($tablet) {
      margin-right: 20px;
      width: 30px;
      height: 44px;
    }
  }
  &__name {
    margin-bottom: 14px;
    @include below($tablet) {
      margin-bottom: 10px;
    }
  }
  &__weight {
    color: theme(grey);
    margin-right: 15px;
  }
  &__link {
    color: theme(grey);
    text-decoration-line: underline;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>

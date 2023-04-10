<template lang="pug">
  .top-filter
    v-btn.top-filter__filter-btn(
      mode="white"
      small
      @click="$emit('open')"
    )
      v-icon.top-filter__filter-icon(
        icon="settings"
      )
      | Фильтр
    v-select.top-filter__sort(
      v-if="isNotEmptyArray(sorting)"
      v-model="sort"
      :options="sorting[0].values"
      :searchable="false"
      icon="sort"
      openDirection="bottom"
      label="name"
      placeholder="Сортировать"
      small
    )
    .top-filter__empty(
      v-if="filter.type === 'toggle'"
      @click="toggleFilter"
    )
      | {{ filter.label }}
      v-toggle.top-filter__toggle(
        :value="filter.checked"
      )
    v-btn.top-filter__btn(
      :to="`/apartment-scheme?${info?.url || ''}`"
      mode="white"
      small
    ) Показать на схеме
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'TopFilter',
  data() {
    return {
      sort: ''
    }
  },
  computed: {
    ...mapGetters({
      sorting: 'filter/sorting',
      info: 'filter/info',
      filter: 'filter/topFilter'
    })
  },
  watch: {
    sort(val) {
      if (val) {
        this.setRequestData({ sorting: { [this.sorting[0].name]: val.value } })
      } else {
        this.removeKeyFromRequestData('sorting')
      }
      this.updateData()
    }
  },
  methods: {
    ...mapMutations({
      setRequestData: 'filter/SET_REQUEST_DATA',
      removeKeyFromRequestData: 'filter/REMOVE_KEY_FROM_REQUEST_DATA'
    }),
    updateData() {
      this.$emit('update')
    },
    toggleFilter() {
      this.setRequestData({ [this.filter.name]: !this.filter.checked })
      this.updateData()
    },
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.top-filter {
  display: grid;
  grid-template-columns: 25fr 50fr 25fr;
  gap: 40px;
  @include below($desktopSml) {
    gap: 10px;
  }
  @include below($notebook) {
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 20px;
  }
  @include below($tablet) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 12px;
    row-gap: 20px;
  }
  @include below($mobileLrg) {
    grid-template-columns: 1fr;
    row-gap: 10px;
  }
  &__sort {
    display: block;
    @include below($notebook) {
      order: -1;
    }
  }
  &__empty {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    @include below($notebook) {
      order: 2;
      grid-column: span 3;
    }
    @include below($tablet) {
      grid-column: span 2;
    }
    @include below($mobileLrg) {
      grid-column: unset;
    }
  }
  &__toggle {
    margin-left: 20px;
    @include below($desktopSml) {
      margin-left: 8px;
    }
  }
  &__filter-icon {
    width: 20px;
    height: 20px;
    margin-right: 13px;
  }
  &__filter-btn {
    display: none;
    @include below($notebook) {
      display: inline-flex;
    }
  }
}
</style>

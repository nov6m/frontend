<template lang="pug">
.housing
  v-container
    v-title.housing__title(
      v-if="fields.title"
      v-text="fields.title"
      tag="h1"
    )
    .housing__filter
      v-select.housing__sort(
        v-model="sort"
        :options="sortItems"
        placeholder="Сортировать"
        :searchable="false"
        :allow-empty="false"
        label='name'
        track-by='id'
        small
      )
    .housing__items
      house-card(
        v-for="(item, idx) in formattedItems"
        :key="idx"
        :name="item.address"
        :img="item.image"
        :mark="item.photoText"
        :year="item.date"
        :complex="item.complex?.name"
        :group="item.group"
        @click="modalShow({name: 'house', params: item})"
      )
</template>

<script>
import HouseCard from './shared/house-card'
import Api from '@/core/Api'
import { allCompletedProjectsQuery } from '@/query'

export default {
  name: 'ListHousing',
  components: { HouseCard },
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      sort: { name: 'От новых к старым', id: '-completed_date' },
      sortItems: [
        { name: 'От новых к старым', id: '-completed_date' },
        { name: 'От старых к новым', id: 'completed_date' }
      ],
      items: []
    }
  },
  async fetch() {
    await this.getData()
  },
  computed: {
    formattedItems() {
      const items = [...this.items]
      items.sort((a, b) =>
        this.sort?.id === 'completed_date' ? a.date - b.date : b.date - a.date
      )
      let curMark = ''
      items.forEach((el) => {
        if (!curMark || el.date !== curMark) {
          curMark = el.date
          el.group = true
        }
      })
      return items
    }
  },
  methods: {
    async getData(orderBy = '') {
      const { allCompletedProjects } = await Api.graphQL(
        allCompletedProjectsQuery,
        {
          group: this.fields.type,
          orderBy
        }
      )
      this.items = allCompletedProjects.map((el) => ({
        ...el,
        date: +new Date(el.completedDate).getFullYear()
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.housing {
  &__filter {
    display: flex;
    justify-content: flex-end;
    @include below($tablet) {
      justify-content: flex-start;
      margin-top: 15px;
    }
  }
  &__sort {
    width: 240px;
    @include below($mobileDef) {
      width: 100%;
    }
  }
  &__items {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 27px;
    row-gap: 65px;
    @include below($desktopSml) {
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 22px;
    }
    @include below($notebook) {
      grid-template-columns: 1fr 1fr;
    }
    @include below($mobileLrg) {
      grid-template-columns: 1fr;
      row-gap: 40px;
    }
  }
}
</style>

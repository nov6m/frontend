<template lang="pug">
v-scrollbar
  transition-group.sidebar(
    name="list"
    tag="div"
    key="sidebar"
  )
    .sidebar__item(
      v-for="item in filteredItems"
      :key="item.id"
      @click="$emit('change', item.coords)"
    )
      //.sidebar__label(
      //  v-if="item.step"
      //  :class="{build: item.step === 'BUILD'}"
      //) {{ item.step === 'BUILD' ? 'Строится' : 'Сдан' }}
      .sidebar__main
        .sidebar__title(
          v-if="item.name"
        ) {{item.name}}
        .sidebar__value {{item.length}} м
      .sidebar__text(
        v-if="item.address"
      ) {{item.address}}
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'DynamicMapSidebar',
  props: {
    items: {
      type: Array,
      required: true
    },
    cluster: {
      type: String,
      required: true
    }
  },
  computed: {
    filteredItems() {
      const items = [...this.items]
      items.sort((a, b) => a.length - b.length)
      if (this.cluster !== 'all') {
        return items.filter((item) => item.group?.name === this.cluster)
      }
      return items
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: theme(white-color);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 20px;
  &__item {
    width: 100%;
    border-bottom: 1px solid theme(grey-light);
    padding: 20px 0 10px;
    cursor: pointer;
  }
  &__label {
    display: inline-block;
    font-size: 13px;
    padding: 2px 10px;
    border-radius: theme(ui-radius);
    margin-bottom: 10px;
    color: theme(white-color);
    font-weight: 600;
    background-color: theme(dark);
    &.build {
      background-color: theme(green);
    }
  }
  &__main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 5px;
    font-weight: 600;
    color: theme(grey-dark);
  }
  &__text {
    font-size: 0.813rem;
    color: theme(grey);
  }
}
</style>

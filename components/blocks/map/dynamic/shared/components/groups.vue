<template lang="pug">
.map-groups(
  v-if="isNotEmptyArray(items)"
)
  .map-groups__item(
    v-for="(item, i) in items"
    v-if="item.count"
    :key="i"
    :class="{active: value === item.name}"
    @click="updateCluster(item.name)"
  )
    v-img.map-groups__icon(
      v-if="item.image && item.name !== 'all'"
      :src="item.image"
      contain
    )
    .map-groups__value(
      v-if="item.color"
    ) {{ item.name === 'all' ? 'Все ' : '' }}{{ item.count }}
</template>
<script>
import { isNotEmptyArray } from '@/core/utils/type'
export default {
  name: 'DynamicMapGroups',
  props: {
    value: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    isNotEmptyArray,
    updateCluster(name) {
      this.$emit('input', name)
    }
  }
}
</script>

<style lang="scss" scoped>
.map-groups {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: transparent;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 5px 50px;
  &__item {
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding: 3px;
    background-color: theme(white-color);
    cursor: pointer;
    margin: 5px 15px 5px 0;
    box-shadow: 0 0 15px rgba(148, 148, 148, 0.2);
    transition: all 0.3s;
    height: 36px;
    &.active {
      background-color: theme(grey-dark);
      color: #fff;
    }
  }
  &__itemMain {
    background-color: theme(grey-dark);
    color: theme(white-color);
    height: 33px;
    padding: 10px;
  }
  &__icon {
    margin-right: 10px;
    max-height: 100%;
  }
  &__value {
    margin-right: 5px;
  }
}
</style>

<template lang="pug">
.tags(
  v-show="isNotEmptyArray(items)"
)
  .tag__label Примененные фильтры:
  .tag(
    v-for="(tag, i) in items"
    :key="i"
    :data-filter="tag.filter"
    @click="$emit('remove', tag)"
  )
    span.tag__title(
      v-if="tag.title"
    ) {{ tag.title + ' ' }}
    | {{ tag.name }}
    span.tag__group(
      v-show="tag.group_name"
    ) {{ tag.group_name }}
    v-icon.tag__close(
      icon="close"
    )
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'FilterTags',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    isNotEmptyArray
  }
}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tag {
  display: flex;
  align-items: center;
  padding: 5px 15px 5px 8px;
  margin-bottom: 15px;
  margin-right: 10px;
  border-radius: theme(ui-radius);
  background: #fff;
  border: theme(black-color);
  transition: 0.1s ease-in;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px theme(grey-light);
  }
  &__label {
    font-size: 14px;
    margin-bottom: 15px;
    margin-right: 20px;
  }
  &__group {
    font-size: 12px;
    font-weight: 500;
    color: #777;
    margin-left: 5px;
    position: relative;
    top: -3px;
  }

  &__close {
    position: relative;
    width: 10px;
    height: 10px;
    margin-left: 15px;
  }
}
</style>

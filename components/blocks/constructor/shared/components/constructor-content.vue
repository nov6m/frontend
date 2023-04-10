<template lang="pug">
v-container(
  :fluid="row.fluid"
)
  v-bootstrap-row(
    :style="row.style"
    :class="row.class"
    :no-gutters="row['no-gutters']"
  )
    v-bootstrap-col(
      v-if="isNotEmptyArray(row.cols)"
      v-for="(col, colIdx) in row.cols"
      :key="colIdx"
      :col="col.col"
      :sm="col.sm"
      :md="col.md"
      :lg="col.lg"
      :xl="col.xl"
    )
      constructor-item(
        :element="col.element"
        :content="col.content"
        :styles="col.style"
        :classes="col.class"
      )
</template>

<script>
import ConstructorItem from './shared/components/item'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'ConstructorContent',
  components: { ConstructorItem },
  props: {
    row: {
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

<style scoped></style>

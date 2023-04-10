<template lang="pug">
.v-scrollbar(
  ref="scrollbar"
)
  slot
</template>

<script>
import Scrollbar from 'smooth-scrollbar'

export default {
  name: 'VScrollbar',
  props: {},
  mounted() {
    Scrollbar.init(this.$refs.scrollbar)
  }
}
</script>

<style scoped></style>

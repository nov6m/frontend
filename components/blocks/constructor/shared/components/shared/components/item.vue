<template lang="pug">
v-text(
  v-if="element === 'editor'"
  v-bind="elementProps"
  v-html="content"
)
v-img(
  v-else-if="element === 'img'"
  v-bind="elementProps"
  :src="content.src"
  :alt="content.alt"
)
.constructor-content(
  v-else-if="element === 'row'"
)
  constructor-content(
    v-for="(row, rowIdx) in content"
    :key="rowIdx"
    :row="row"
  )
</template>

<script>
export default {
  name: 'ConstructorItem',
  components: {
    ConstructorContent: () =>
      import(
        '@/components/blocks/constructor/shared/components/constructor-content'
      )
  },
  props: {
    element: {
      type: String,
      default: ''
    },
    content: {
      type: [Object, String],
      required: true
    },
    styles: {
      type: [Object, String, Array],
      default: ''
    },
    classes: {
      type: [Object, String, Array],
      default: ''
    },
    props: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    elementProps() {
      let propsObj = {}
      if (this.classes) {
        propsObj.class = this.classes
      }
      if (this.styles) {
        propsObj.style = this.styles
      }
      propsObj = { ...propsObj, ...this.props }
      return propsObj
    }
  }
}
</script>

<style lang="scss" scoped></style>

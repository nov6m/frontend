<template lang="pug">
nuxt-link.v-btn(
  v-if="to"
  v-bind="attrs"
)
  slot
a.v-btn(
  v-else
  v-on="btnHandler"
  v-bind="attrs"
)
  slot
</template>

<script>
export default {
  name: 'VBtn',
  props: {
    to: {
      type: [String, Object],
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnHandler() {
      if (!this.href) {
        return {
          click: (e) => {
            e.stopPropagation()
            e.preventDefault()
            this.$emit('click')
          }
        }
      }
      return {}
    },
    attrs() {
      const attrs = {
        class: {
          [this.mode]: this.mode,
          small: this.small,
          large: this.large,
          block: this.block
        }
      }
      if (this.disabled) {
        attrs.disabled = this.disabled
      }
      if (this.target) {
        attrs.target = this.target
      }
      if (this.href) {
        attrs.href = this.href
      }
      if (this.to) {
        attrs.to = this.to
      }

      return attrs
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn {
  padding: 5px 20px;
  font-size: 14px;
  font-weight: 600;
  border-radius: theme(ui-radius);
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  &.block {
    display: flex;
  }
  &.large {
    height: 50px;
  }
  &.small {
    height: 40px;
  }
  &.default {
    color: theme(white-color);
    background-color: theme(current-color);
    &:hover {
      background-color: theme(current-dark-color);
    }
  }
  &.outline {
    color: theme(current-color);
    border: 1px solid theme(current-color);
    &:hover {
      color: theme(white-color);
      background-color: theme(current-dark-color);
    }
  }
  &.outline-white {
    color: theme(white-color);
    border: 1px solid theme(white-color);
    &:hover {
      color: theme(black-color);
      background-color: theme(white-color);
    }
  }
  &.outline-hover {
    color: theme(white-color);
    background-color: theme(current-dark-color);
    border: 1px solid theme(current-color);
    &:hover {
      background-color: transparent;
      color: theme(current-color);
    }
  }
  &.grey {
    color: theme(black-color);
    background-color: #f8f8f8;
    &:hover {
      background-color: #f1f1f1;
    }
  }
  &.white {
    color: theme(black-color);
    background-color: theme(white-color);
    border: 1px solid theme(grey-light);
    &:hover {
      background-color: theme(grey-light);
    }
  }
  &.extra-light {
    color: theme(current-color);
    background-color: theme(current-extra-light-color);
    &:hover {
      background-color: theme(current-color);
      color: theme(white-color);
    }
  }
  &[disabled] {
    color: theme(grey-dark);
    background-color: theme(grey-light);
    pointer-events: none;
  }
}
</style>

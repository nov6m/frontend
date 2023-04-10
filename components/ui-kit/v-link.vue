<template lang="pug">
a(
  v-if="external"
  :href="to"
  :target="target"
  :rel="rel"
  :class="classes"
  @click="$emit('click', $event)"
)
  slot
nuxt-link(
  v-else
  :to="to"
  :class="classes"
  @click="$emit('click', $event)"
)
  slot
</template>

<script>
export default {
  name: 'VLink',
  props: {
    mode: {
      type: String,
      default: 'default'
    },
    to: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_blank'
    },
    rel: {
      type: String,
      default: ''
    },
    external: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    },
    underlineHover: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        'v-link': true,
        [this.mode]: this.mode,
        block: this.block,
        underline: this.underline,
        'underline-hover': this.underlineHover,
        disabled: this.disabled,
        'exact-active': this.exact
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-link {
  &.block {
    display: block;
    width: 100%;
  }
  &.link {
    transition: color 0.25s ease;
    &:hover,
    &.exact-active.nuxt-link-active,
    &.nuxt-link-exact-active {
      color: theme(current-color);
      text-decoration: none;
    }
  }
  &.mark-link {
    padding: 3px 11px;
    background: theme(current-color);
    color: theme(white-color);
    border-radius: 12px;
    transition: background 0.25s ease;
    &:hover {
      background: theme(current-dark-color);
    }
  }
  &.underline {
    text-decoration: underline;
  }
  &.underline-hover:hover {
    text-decoration: underline;
  }
  &.disabled {
    opacity: 0.7;
    pointer-events: none;
  }
}
</style>

<template lang="pug">
.v-input(
  :class="{[mode]: mode,filled: focus, small, large, block, error: hasError}"
  :disabled="disabled"
)
  input.v-input__input(
    v-model="curVal"
    v-mask="mask"
    :type="type"
    :placeholder="placeholder"
    :readonly="readonly"
    @focus="focus = true"
    @focusout="focus = false"
  )
  transition(
    name="fade"
  )
    .v-input__error(
      v-if="hasError"
    )
      .v-input__error-content {{ error }}
</template>

<script>
export default {
  name: 'VInput',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: ''
    },
    mask: {
      type: [String, Function],
      default: ''
    },
    placeholder: {
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
    readonly: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      focus: false,
      curError: !!this.error
    }
  },
  computed: {
    curVal: {
      get() {
        return this.value
      },
      set(val) {
        if (this.curError) {
          this.curError = false
        }
        this.$emit('input', val)
      }
    },
    hasError() {
      return this.error && this.curError
    }
  },
  watch: {
    error() {
      this.curError = true
    }
  }
}
</script>

<style lang="scss" scoped>
.v-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 45px;
  transition: all 0.25s ease;
  &.small {
    height: 40px;
  }
  &.large {
    height: 50px;
  }
  &__input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: theme(black-color);
    border: none;
    font-size: 15px;
    padding: 5px 30px;
    &:focus {
      outline: none;
    }
  }
  &.block {
    display: flex;
  }
  &.default {
    border-radius: theme(ui-radius);
    border: 1px solid theme(grey-light);
    background-color: theme(white-color);
    &.filled {
      outline: none;
      border-color: theme(grey-dark);
    }
  }
  &.error {
    border-color: theme(current-color) !important;
  }
  &[disabled] {
    opacity: 0.7;
    pointer-events: none;
  }
  &__error-content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: theme(white-color);
    padding: 8px 11px;
    color: theme(black-color);
    border-radius: theme(ui-radius);
    font-size: 13px;
    z-index: 1;
  }
  &__error {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
    position: absolute;
    left: 8px;
    bottom: -1px;
    transform: translateY(100%);
    z-index: 1;
    &:after {
      content: '';
      position: absolute;
      top: 5px;
      left: 20px;
      transform: translateY(-50%) rotate(45deg);
      border-radius: 2px;
      background-color: theme(white-color);
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
      width: 20px;
      height: 20px;
      z-index: 0;
    }
  }
}
</style>

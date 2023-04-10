<template lang="pug">
multiselect.v-select(
  v-model="curValue"
  v-bind="$attrs"
  :class="{[mode]: mode, error: hasError, small, large, icon}"
)
  template(#caret)
    svg-icon.multiselect__select(
      name="arrow-down"
    )
    svg-icon.multiselect__icon(
      v-if="icon"
      :name="icon"
    )
  span(slot="noResult") {{ noResult }}
  span(slot="noOptions") {{ noOptions }}
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'VSelect',
  components: {
    Multiselect
  },
  props: {
    value: {
      type: [String, Object, Array, Number],
      required: true
    },
    noResult: {
      type: String,
      default: 'Не найдено'
    },
    noOptions: {
      type: String,
      default: 'Данные не найдены'
    },
    mode: {
      type: String,
      default: 'default'
    },
    error: {
      type: [Boolean, String],
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
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      curError: !!this.error
    }
  },
  computed: {
    curValue: {
      get() {
        return this.value
      },
      set(newVal) {
        if (this.curError) {
          this.curError = false
        }
        this.$emit('input', newVal)
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
.v-select {
  min-height: 45px;
  &::v-deep(.multiselect) {
    &__tags {
      padding: 13px 40px 0 17px;
      min-height: inherit;
      z-index: 11;
    }
    &__placeholder {
      font-size: 15px;
    }
    &__single,
    &__input {
      padding-left: 0;
      font-size: 15px;
    }
    &__select {
      height: 45px;
      padding: 5px;
      z-index: 1;
      right: 3px;
      width: 35px;
      color: theme(current-color);
      background-color: transparent;
    }
    &__content-wrapper {
      transform: translateY(-4px);
      z-index: 10;
    }
    &__option {
      padding: 11px 16px;
      font-size: 15px;
      &--highlight,
      &--selected {
        &:after {
          display: none;
        }
      }
    }
  }
  &.default {
    &::v-deep(.multiselect) {
      &__content-wrapper {
        border-bottom-left-radius: theme(ui-radius);
        border-bottom-right-radius: theme(ui-radius);
        border: 1px solid theme(grey-light);
      }
      &__tags {
        border: 1px solid theme(grey-light);
        border-radius: theme(ui-radius);
        cursor: pointer;
      }
      &__placeholder,
      &__input::placeholder {
        color: theme(grey-dark);
      }
      &__single {
        color: theme(current-color);
      }
      &__option {
        color: theme(grey-dark);
        &--highlight {
          color: theme(grey-dark);
          background-color: theme(light);
        }
        &--selected {
          background-color: transparent;
          color: theme(current-color);
          font-weight: 400;
        }
      }
    }
  }
  &.error {
    &::v-deep(.multiselect) {
      &__tags {
        border: 1px solid theme(current-color);
      }
    }
  }
  &.icon {
    &::v-deep(.multiselect) {
      &__tags {
        padding-left: 50px !important;
      }
      &__icon {
        position: absolute;
        padding: 4px;
        top: 1px;
        left: 8px;
        width: 30px;
        height: 45px;
        color: theme(current-color);
      }
    }
  }
  &.small {
    min-height: 40px;
    &::v-deep(.multiselect) {
      &__tags {
        padding: 10px 40px 0 17px;
      }
      &__select {
        height: 40px;
      }
      &__icon {
        height: 40px;
      }
    }
  }
  &.large {
    min-height: 50px;
    &::v-deep(.multiselect) {
      &__tags {
        padding: 15px 40px 0 17px;
      }
      &__select {
        height: 50px;
      }
      &__icon {
        height: 50px;
      }
    }
  }
}
</style>

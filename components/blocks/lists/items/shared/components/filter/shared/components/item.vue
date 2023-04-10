<template lang="pug">
.filter-item(
  v-if="curFilter"
  :class="{disabled}"
)
  .filter-item__head
    .filter-item__title(
      v-if="curFilter.title"
    ) {{ curFilter.title }}
    span.filter-item__error-message(
      v-if="curFilter.error_message"
    ) {{ curFilter.error_message }}
  template(
    v-if="curFilter.type === 'checkbox'"
  )
    .filter-item__list
      .filter-item__list-cnt(
        :style="{'grid-template-columns': `repeat(${curFilter.column}, 1fr)`}"
      )
        template(
          v-for="(filterItem, groupIndex) in curFilter.values"
        )
          h3.filter-item__group-title(
            :key="groupIndex"
            v-if="filterItem.group_name"
          ) {{ filterItem.group_name }}
          v-text-checkbox.filter-item__checkbox(
            v-for="(value, valueIndex) in filterItem.values"
            :value="value.checked"
            :key="`${value.name}-${valueIndex}`"
            :disabled="value.disabled"
            :hidden="value.hidden"
            @change="changeParam($event, groupIndex, valueIndex)"
          ) {{ value.name }}
            span.filter-item__count(
              v-if="value.count"
            ) {{ value.count }}
  template(
    v-if="curFilter.type === 'select'"
  )
    .filter-item__list
      .filter-item__list-cnt
        v-select.filter-item__range(
          v-bind="selectBind"
          openDirection="bottom"
          :searchable="false"
          @input="selectChangeHandler($event)"
        )
  template(
    v-if="curFilter.type === 'range'"
  )
    .filter-item__list
      .filter-item__list-cnt
        v-range.filter-item__range(
          v-model="curFilter.values.range"
          :min="curFilter.values.min"
          :max="curFilter.values.max"
          :postfix="curFilter.values.postfix"
          :interval="curFilter.values.interval"
          :format="curFilter.values.format"
          event-change
          @change="changeParamRange"
        )
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'FilterItem',
  props: {
    filter: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      selected: {}
    }
  },
  computed: {
    ...mapGetters({
      requestData: 'filter/requestData'
    }),
    curFilter: {
      get() {
        return { ...this.filter }
      },
      set(val) {
        this.$emit('update:filter', val)
      }
    },
    disabled() {
      return this.curFilter?.values.length === 0 || this.curFilter?.disabled
    },
    selectBind() {
      let objBind = {
        value: Object.keys(this.selected).length ? this.selected : '',
        placeholder: this.curFilter.placeholder || '',
        label: 'name',
        disabled: this.disabled,
        'track-by': 'key'
      }
      objBind =
        this.curFilter.values.length > 1
          ? {
              ...objBind,
              options: this.curFilter.values,
              'group-values': 'values',
              'group-label': 'group_name',
              'group-select': true
            }
          : {
              ...objBind,
              options: (this.curFilter.values[0] || {}).values || []
            }
      return objBind
    }
  },
  watch: {
    requestData: {
      handler() {
        if (
          this.curFilter.type === 'select' &&
          (!this.requestData[this.curFilter.name] ||
            !this.requestData[this.curFilter.name].length)
        ) {
          this.selected = {}
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getActiveSelect()
  },
  methods: {
    ...mapMutations({
      setRequestData: 'filter/SET_REQUEST_DATA',
      removeKeyFromRequestData: 'filter/REMOVE_KEY_FROM_REQUEST_DATA'
    }),
    getActiveSelect() {
      if (
        isNotEmptyArray(this.requestData[this.curFilter.name]) &&
        isNotEmptyArray(this.curFilter.values)
      ) {
        const activeObj = this.curFilter.values[0].values.find((el) => {
          const value = isNaN(el.key) ? String(el.key).toLowerCase() : el.key
          return value === this.requestData[this.curFilter.name][0]
        })
        this.selected = { ...activeObj }
      }
    },
    selectChangeHandler(val) {
      this.removeKeyFromRequestData(this.curFilter.name)
      if (val) {
        this.selected = val
        const valIndex = this.curFilter.values[0].values.findIndex(
          (el) => el.key === val.key
        )
        this.changeParam(true, 0, valIndex)
      } else {
        this.selected = {}
        this.$emit('update')
      }
    },
    changeParamRange(value) {
      const values = JSON.parse(JSON.stringify(this.curFilter.values))
      values.range = value
      this.curFilter = Object.assign(this.curFilter, { values })
      const requestDataVal = this.requestData[this.curFilter.name]
      this.removeKeyFromRequestData('page')
      if (
        isNotEmptyArray(requestDataVal) &&
        values.min === value[0] &&
        values.max === value[1]
      ) {
        this.removeKeyFromRequestData(this.curFilter.name)
      } else {
        this.setRequestData({ [this.curFilter.name]: value })
      }
      this.$emit('update')
    },
    changeParam(val, groupIdx, valIdx) {
      const values = JSON.parse(JSON.stringify(this.curFilter.values))
      const valKey = values[groupIdx].values[valIdx].key
      values[groupIdx].values.splice(valIdx, 1, {
        ...values[groupIdx].values[valIdx],
        checked: val
      })
      this.curFilter = Object.assign(this.curFilter, { values })
      this.removeKeyFromRequestData('page')
      this.setData(
        val,
        this.curFilter.name,
        isNaN(valKey) ? String(valKey).toLowerCase() : +valKey
      )
      this.$emit('update')
    },
    setData(val, name, key) {
      if (val) {
        const newData = this.requestData[name]
          ? [...this.requestData[name], key]
          : [key]
        this.setRequestData({ [name]: newData })
      } else {
        const newRequestDataElem = [...this.requestData[name]]
        const idxElem = newRequestDataElem.indexOf(key)
        if (idxElem !== -1) {
          newRequestDataElem.splice(idxElem, 1)
        }
        if (isNotEmptyArray(this.curFilter.related)) {
          this.removeRelatedData(this.curFilter.related, key)
        }
        if (newRequestDataElem.length) {
          this.setRequestData({ [name]: newRequestDataElem })
        } else {
          this.removeKeyFromRequestData(name)
        }
      }
    },
    removeRelatedData(related, key) {
      related.forEach((nameParam) => {
        if (isNotEmptyArray(this.requestData[nameParam])) {
          let newRequestDataElem = [...this.requestData[nameParam]]
          this.requestData[nameParam].forEach((item, i) => {
            if (item.includes(key)) {
              newRequestDataElem[i] = false
            }
          })
          newRequestDataElem = newRequestDataElem.filter((item) => item)
          if (newRequestDataElem.length) {
            this.setRequestData({ [nameParam]: newRequestDataElem })
          } else {
            this.removeKeyFromRequestData(nameParam)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-item {
  display: grid;
  &.disabled {
    cursor: no-drop;

    &:hover {
      & .filter-item__error-message {
        opacity: 1;
        transform: translateY(-50%);
      }
    }

    .filter-item__head {
      opacity: 0.7;
      pointer-events: none;
    }
  }

  &__head {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    user-select: none;
    cursor: pointer;
    @include below($notebook) {
      margin-bottom: 12px;
    }
  }

  &__title {
    font-size: 15px;
  }

  &__list {
    max-width: 100%;
  }

  &__group-title {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 400;
    grid-column: span 2;
    color: theme(grey);
  }

  &__list-cnt {
    display: grid;
    gap: 10px;
    font-size: 14px;
    @include below($desktopSml) {
      gap: 5px;
    }
  }

  &__count {
    font-size: 12px;
    margin-left: 7px;
    color: #b5b5b5;
    margin-top: 2px;
  }

  &__error-message {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(5px);
    right: 0;
    padding: 1px 10px;
    color: theme(white-color);
    background: theme(current-color);
    border-radius: 6px;
    font-size: 12px;
    opacity: 0;
    transition: 0.1s ease-in;
  }

  &__checkbox {
    padding: 5px 6px;
  }
}
</style>

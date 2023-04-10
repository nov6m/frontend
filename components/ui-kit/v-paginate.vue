<template>
  <ul class="v-paginate">
    <li
      v-if="!(firstPageSelected() && hidePrevNext)"
      class="v-paginate__prev"
      :class="{ disabled: firstPageSelected() }"
      @click="prevPage()"
      @keyup.enter="prevPage()"
    >
      <v-icon
        icon="arrow-swiper-nav"
        class="v-paginate__prev-link"
        :tabindex="firstPageSelected() ? -1 : 0"
      />
    </li>

    <li
      v-for="(page, i) in pages"
      :key="i"
      class="v-paginate__page"
      :class="{ active: page.selected, break: page.breakView }"
    >
      <a v-if="page.breakView" class="v-paginate__link" tabindex="0"><slot name="breakViewContent">{{ breakViewText }}</slot></a>
      <a v-else-if="page.disabled" class="v-paginate__link" tabindex="0">{{
        page.content
      }}</a>
      <a
        v-else
        class="v-paginate__link"
        tabindex="0"
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
      >{{ page.content }}</a>
    </li>

    <li
      v-if="!(lastPageSelected() && hidePrevNext)"
      class="v-paginate__next"
      :class="{ disabled: lastPageSelected() }"
      @click="nextPage()"
      @keyup.enter="nextPage()"
    >
      <v-icon
        icon="arrow-swiper-nav"
        class="v-paginate__next-link"
        :tabindex="lastPageSelected() ? -1 : 0"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    },
    pageCount: {
      type: Number,
      required: true
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => {}
    },
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    breakViewText: {
      type: String,
      default: '…'
    },
    firstButtonText: {
      type: String,
      default: 'First'
    },
    lastButtonText: {
      type: String,
      default: 'Last'
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerValue: 1
    }
  },
  computed: {
    selected: {
      get() {
        return this.value || this.innerValue
      },
      set(newValue) {
        this.innerValue = newValue
      }
    },
    pages() {
      const items = {}
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          const page = {
            index,
            content: index + 1,
            selected: index === this.selected - 1
          }
          items[index] = page
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2)

        const setPageItem = (index) => {
          const page = {
            index,
            content: index + 1,
            selected: index === this.selected - 1
          }

          items[index] = page
        }

        const setBreakView = (index) => {
          const breakView = {
            disabled: true,
            breakView: true
          }

          items[index] = breakView
        }
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i)
        }
        let selectedRangeLow = 0
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange
        }

        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1
        }

        for (
          let i = selectedRangeLow;
          i <= selectedRangeHigh && i <= this.pageCount - 1;
          i++
        ) {
          setPageItem(i)
        }

        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1)
        }

        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }

        // 3rd - loop thru high end of margin pages
        for (
          let i = this.pageCount - 1;
          i >= this.pageCount - this.marginPages;
          i--
        ) {
          setPageItem(i)
        }
      }
      return items
    }
  },
  beforeUpdate() {
    if (this.forcePage === undefined) {
      return
    }
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) {
        return
      }

      this.innerValue = selected
      this.$emit('input', selected)
      this.clickHandler(selected)
    },
    prevPage() {
      if (this.selected <= 1) {
        return
      }

      this.handlePageSelected(this.selected - 1)
    },
    nextPage() {
      if (this.selected >= this.pageCount) {
        return
      }

      this.handlePageSelected(this.selected + 1)
    },
    firstPageSelected() {
      return this.selected === 1
    },
    lastPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0
    },
    selectFirstPage() {
      if (this.selected <= 1) {
        return
      }

      this.handlePageSelected(1)
    },
    selectLastPage() {
      if (this.selected >= this.pageCount) {
        return
      }

      this.handlePageSelected(this.pageCount)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-paginate {
  display: flex;
  &__prev,
  &__next {
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    &.disabled {
      opacity: 0.6;
      pointer-events: none;
    }
  }
  &__prev-link,
  &__next-link {
    width: 8px;
    height: 10px;
  }
  &__prev {
    transform: rotate(180deg);
    margin-right: 15px;
  }
  &__next {
    margin-left: 15px;
  }
  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 16px;
    border-radius: theme(ui-radius-small);
    cursor: pointer;
    font-size: 14px;
    user-select: none;
    height: 32px;
  }
  &__page {
    &.active {
      .v-paginate {
        &__link {
          font-weight: 700;
          background-color: theme(current-color);
          color: theme(white-color);
        }
      }
    }
  }
}
</style>

<template lang="pug">
.step-list(
  v-if="isNotEmptyArray(fields.items)"
)
  v-container
    v-title.step-list__title(
      v-if="fields.title"
      v-text="fields.title"
      tag="h1"
    )
    .step-list__content
      .step-list__item.js-history-step(
        v-for="(item, idx) in sortedItems"
        :key="idx"
        :data-id="idx + 1"
      )
        .step-list__item-line.js-history-line
        .step-list__item-counter {{ idx + 1 }}
        .step-list__item-content
          .step-list__item-title {{ item.year }}
          .step-list__item-wrap
            .step-list__item-text
              v-text.step-list__item-desc(
                v-html="item.text"
              )
              .step-list__item-facts(
                v-if="isNotEmptyArray(item.facts)"
              )
                .step-list__item-fact(
                  v-for="(fact, factIdx) in item.facts"
                  :key="factIdx"
                )
                  v-img.step-list__item-fact-icon(
                    v-if="fact.icon"
                    :src="fact.icon"
                    contain
                  )
                  | {{ fact.title }}
            .step-list__item-images(
              v-if="isNotEmptyArray(item.images)"
              :class="{many: item.images.length > 1}"
            )
              v-img.step-list__item-img(
                v-for="(img, imgIdx) in item.images"
                :key="imgIdx"
                v-if="img"
                :src="img"
                cover
              )
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'StepInfoList',
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      activeIndex: 1
    }
  },
  computed: {
    sortedItems() {
      if (!isNotEmptyArray(this.fields.items)) {
        return []
      }
      return [...this.fields.items]
        .filter((el) => el.year)
        .sort((a, b) =>
          this.fields.sort === 'asc' ? a.year - b.year : b.year - a.year
        )
    }
  },
  mounted() {
    this.handlerScroll()
    window.addEventListener('scroll', this.handlerScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handlerScroll)
  },
  methods: {
    isNotEmptyArray,
    handlerScroll() {
      document.querySelectorAll('.js-history-step').forEach((step) => {
        const position =
          step.getBoundingClientRect().top - window.innerHeight / 2
        const line = step.querySelector('.js-history-line')
        if (position > 0) {
          step.classList.remove('active')
          line.style.transform = 'matrix(1, 0, 0, 0, 0, 0)'
        } else {
          const id = Number(step.dataset.id)
          step.classList.add('active')
          if (this.activeIndex !== id) {
            this.activeIndex = id
            const lineHeight = line.clientHeight
            const curHeight =
              line.getBoundingClientRect().top - window.innerHeight / 2
            if (curHeight < -lineHeight) {
              line.style.transform = 'scaleY(1)'
            } else if (curHeight > lineHeight) {
              line.style.transform = 'scaleY(0)'
            } else {
              const l = Math.abs(position) / lineHeight
              line.style.transform = `scaleY(${l > 1 ? 1 : l})`
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.step-list {
  &__title {
    margin-bottom: 35px;
    @include below($notebook) {
      margin-bottom: 25px;
    }
  }
  &__item {
    position: relative;
    display: flex;
    height: auto;
    &.active {
      .step-list {
        &__item {
          &-counter {
            background-color: theme(current-color);
            color: theme(white-color);
          }
        }
      }
    }
    &:after {
      content: '';
      position: absolute;
      top: 50px;
      left: 24px;
      bottom: 0;
      width: 3px;
      background-color: theme(current-extra-light-color);
    }
    &-line {
      position: absolute;
      top: 50px;
      left: 24px;
      bottom: 0;
      z-index: 1;
      display: flex;
      width: 3px;
      background: theme(current-color);
      border-radius: theme(ui-radius-small);
      transform-origin: 0 0;
    }
    &-content {
      width: 100%;
      padding: 12px 0 10px;
      border-bottom: 1px solid #e8e8e8;
      margin-bottom: 15px;
    }
    &-counter {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: 50px;
      height: 50px;
      margin-right: 30px;
      border-radius: 50%;
      background-color: theme(current-extra-light-color);
      font-weight: 600;
      font-size: 20px;
      color: theme(current-color);
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      @include below($notebook) {
        margin-right: 15px;
      }
    }
    &-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include below($notebook) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    &-title {
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 25px;
      @include below($tablet) {
        margin-bottom: 15px;
      }
    }
    &-text {
      max-width: 700px;
      @include below($notebook) {
        max-width: 100%;
      }
    }
    &-images {
      &.many {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @include below($notebook) {
          flex-direction: row;
        }
      }
    }
    &-img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      @include below($notebook) {
        width: 100px;
        height: 100px;
      }
      &:not(&:last-of-type) {
        margin-bottom: 25px;
        @include below($notebook) {
          margin-bottom: 0;
          margin-right: 25px;
        }
      }
    }
    &-facts {
      margin-top: 25px;
      display: flex;
      flex-wrap: wrap;
      @include below($notebook) {
        margin-top: 10px;
      }
    }
    &-fact {
      background-color: theme(current-extra-light-color);
      border-radius: theme(ui-radius);
      font-weight: 600;
      font-size: 15px;
      display: flex;
      align-items: center;
      padding: 8px 10px;
      min-height: 40px;
      margin-bottom: 10px;
      @include below($notebook) {
        font-size: 14px;
        min-height: 35px;
      }
      &:not(&:last-of-type) {
        margin-right: 20px;
      }
      &-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        @include below($notebook) {
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>

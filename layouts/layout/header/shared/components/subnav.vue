<template lang="pug">
transition(
  name="slide"
)
  .header-subnav(
    v-if="value"
    v-click-outside="() => {$emit('input', false)}"
  )
    v-container
      .header-subnav__content
        nav.header-subnav__nav(
          v-if="isNotEmptyArray(item.links)"
          :class="{column: item.column}"
        )
          v-link.header-subnav__nav-item(
            v-for="(elem, idx) in item.links"
            :key="idx"
            v-if="elem.url"
            :to="elem.url"
            mode="link"
          )
            v-img.header-subnav__nav-img(
              v-if="elem.menuImage || elem.image"
              :src="elem.menuImage || elem.image"
              :alt="elem.name"
              cover
            )
            .header-subnav__nav-title(
              v-if="elem.name"
            ) {{ elem.name }}
            .header-subnav__nav-subtitle(
              v-if="elem.street"
            ) {{ elem.street }}
        .header-subnav__secondary
          .header-subnav__text
            .header-subnav__title(
              v-if="item.text"
              v-html="item.text"
            )
            v-btn(
              v-if="item.btnText && (item.href || item.to)"
              :href="item.href"
              :to="item.to"
            ) {{ item.btnText }}
            v-btn(
              v-else-if="item.btnText"
            ) {{ item.btnText }}
          v-img.header-subnav__img(
            v-if="item.img"
            :src="item.img"
            :alt="item.text || 'Иконка сабменю'"
            contain
          )
</template>

<script>
import { isNotEmptyArray } from '@/core/utils/type'

export default {
  name: 'LayoutHeaderSubnav',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    item: {
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

<style lang="scss" scoped>
.header-subnav {
  background-color: theme(white-color);
  padding: 20px 0;
  transition: transform 0.25s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: translateY(100%);
  &__content {
    display: grid;
    grid-template-columns: 0.6fr 0.4fr;
  }
  &__secondary {
    display: grid;
    grid-template-columns: 0.7fr 0.3fr;
    column-gap: 25px;
    align-items: center;
    grid-template-rows: 157px;
  }
  &__img {
    height: 100%;
    max-width: 100%;
  }
  &__title {
    margin-bottom: 25px;
    font-weight: 600;
    font-size: 18px;
    &::v-deep(span) {
      color: theme(current-color);
    }
  }
  &__nav {
    display: flex;
    flex-direction: column;
    margin: 0 -7px;
    &.column {
      flex-direction: row;
      flex-wrap: wrap;
      .header-subnav {
        &__nav-item {
          width: 137px;
          margin: 0 7px;
        }
      }
    }
  }
  &__nav-item {
    display: block;
    margin-bottom: 18px;
    cursor: pointer;
    &:hover {
      .header-subnav {
        &__nav-title {
          color: theme(current-color);
        }
      }
    }
  }
  &__nav-title {
    font-weight: 600;
    font-size: 14px;
    transition: color 0.25s ease;
  }
  &__nav-subtitle {
    color: #7c7c7c;
    font-size: 13px;
    margin-top: 3px;
  }
  &__nav-img {
    height: 90px;
    width: 100%;
    border-radius: theme(ui-radius-small);
    margin-bottom: 13px;
  }
}
</style>

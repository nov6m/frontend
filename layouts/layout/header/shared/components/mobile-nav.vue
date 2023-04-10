<template lang="pug">
transition(
  name="fade"
)
  .mobile-nav(
    v-if="isNotEmptyArray(items)"
    v-show="value"
  )
    v-container
      .mobile-nav__head
        v-btn.mobile-nav__btn(
          @click="modalShow(); $emit('input', false)"
        ) Заказать перевозку
        .mobile-nav__phone-label Контактный телефон
        v-link.mobile-nav__phone(
          :to="`tel:+7 (912) 349 25-54`"
          mode="link"
          external
        ) +7 (912) 349 25-54
      nav.mobile-nav__items
        component.mobile-nav__item(
          v-for="(item, idx) in items"
          :key="idx"
          :is="item.subnav ? 'div' : 'v-link'"
          :class="{active: activeSubnav && curSubnav && curSubnav.id === idx}"
          :to="item.href"
          :external="!item.href || item.external"
          :exact="item.exact"
          mode="link"
          v-on="navItemHandlers(item, idx)"
        )
          .mobile-nav__item-head {{ item.label }}
            v-icon.mobile-nav__item-icon(
              v-if="isNotEmptyArray(item?.subnav?.links)"
              icon="arrow-right"
            )
          SlideUpDown( v-if="item.subnav" :active="activeSubnav && curSubnav && curSubnav.id === idx" )
            nav.mobile-nav__subnav-items(
              v-if="activeSubnav && curSubnav"
              :class="{column: curSubnav.subnav.column}"
            )
              v-link.mobile-nav__subnav-item(
                v-for="(item, idx) in curSubnav.subnav.links"
                :to="item.url"
                :key="idx"
                :class="{'mobile-nav__item': !curSubnav.subnav.column}"
              )
                v-img.mobile-nav__subnav-img(
                  v-if="item.menuImage"
                  :src="item.menuImage"
                )
                .mobile-nav__subnav-title {{ item.name }}
                .mobile-nav__subnav-subtitle(v-if="item.street" ) {{ item.street }}
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
import { isNotEmptyArray } from '@/core/utils/type'
export default {
  name: 'MobileNav',
  components: {
    SlideUpDown
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      curSubnav: null,
      activeSubnav: false
    }
  },
  watch: {
    '$route' () {
      if (this.value) { this.$emit('input', false) }
    },
    value () {
      if (this.activeSubnav) {
        this.activeSubnav = false
        this.curSubnav = null
      }
    }
  },
  methods: {
    isNotEmptyArray,
    navItemHandlers (item, idx) {
      return item.subnav
        ? {
            click: (e) => {
              e.preventDefault()
              e.stopPropagation()
              this.onClickNavItem(item, idx)
            }
          }
        : {}
    },
    onClickNavItem (item, idx) {
      if (this.activeSubnav && this.curSubnav && idx === this.curSubnav.id) {
        this.curSubnav = null
        this.activeSubnav = false
      } else {
        this.curSubnav = { ...item, id: idx }
        this.activeSubnav = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-nav {
  background-color: theme(white-color);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 75px);
  transform: translateY(100%);
  padding: 40px 0;
  &__items {
    display: flex;
    flex-direction: column;
  }
  &__item {
    font-weight: 600;
    font-size: 15px;
    padding: 11px 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid theme(grey-light);
    &.active {
      color: theme(current-color);
      border-bottom: none;
      padding-bottom: 0;
      .mobile-nav__item-icon {
        transform: rotate(90deg);
      }
    }
  }
  &__item-head {
    display: flex;
    align-items: center;
  }
  &__item-icon {
    width: 14px;
    height: 14px;
    margin-left: 20px;
    color: theme(current-color);
    transition: transform .2s ease;
  }
  &__head {
    margin-bottom: 40px;
  }
  &__btn {
    margin-bottom: 20px;
  }
  &__phone-label {
    color: theme(grey-dark);
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
  }
  &__phone {
    font-weight: 600;
    font-size: 20px;
  }
  &__subnav-items {
    padding-top: 11px;
    overflow-x: auto;
    padding-left: 50px;
    padding-bottom: 11px;
    &.column {
      padding-left: 0;
      display: flex;
      gap: 16px;
    }
  }
  &__subnav-img {
    height: 100px;
    margin-bottom: 15px;
    border-radius: theme(ui-radius-small);
  }
  &__subnav-title {
    font-weight: 600;
    font-size: 14px;
    color: theme(black-color);
    margin-bottom: 4px;
  }
  &__subnav-subtitle {
    color: #7C7C7C;
    font-size: 13px;
  }
}
</style>

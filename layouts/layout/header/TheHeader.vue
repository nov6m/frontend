<template>
  <header class="layout-header">
    <header-subnav class="layout-header__subnav" v-model="activeSubnav" :item="curSubnav"></header-subnav>
    <div class="layout-header__main-header">
      <v-container>
        <div class="layout-header__content">
          <div class="layout-header__main">
            <v-link to="/" class="layout-header__logo logo">
              Med clinic
            </v-link>
            <nav class="layout-header__nav">
              <v-link class="layout-header__nav-item" v-for="(item, idx) in nav" :key="idx" :to="item.href" :external="!item.href || item.external" :exact="item.exact" :mode="item.main ? 'mark-link' : 'link'" v-on="navItemHandlers(item.subnav)">{{ item.label }}</v-link>
            </nav>
          </div>
          <div class="layout-header__control">
            <v-icon class="layout-header__control-icon layout-header__burger" @click="activeMobileNav = !activeMobileNav" :icon="mobileMenuIcon"></v-icon>
            <v-link class="layout-header__phone" :to="`tel:+7 (912) 349 25-54`" mode="link" external="external">+7 (912) 349 25-54</v-link>
            <v-btn v-if="!activeComplex" class="layout-header__phone" @click="modalShow(); $emit('input', false)">Заказать перевозку</v-btn>
          </div>
        </div>
      </v-container>
    </div>
    <div class="layout-header__complex-header" v-if="activeComplex">
      <v-container>
        <complex-header />
      </v-container>
    </div>
    <mobile-nav v-model="activeMobileNav" :items="nav" />
  </header>
</template>

<script>
import { complexMenuItemsQuery } from '../../../query'
import headerSubnav from './shared/components/subnav'
import ComplexHeader from './shared/components/complex'
import MobileNav from './shared/components/mobile-nav'
import Api from '@/core/Api'
export default {
  name: 'TheHeader',
  components: {
    MobileNav,
    ComplexHeader,
    headerSubnav
  },
  props: {
    activeComplex: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeMobileNav: false,
      nav: [
        {
          label: 'Услуги',
          href: '/services'
        },
        {
          label: 'Статьи',
          href: '/articles'
        },
        {
          label: 'Контакты',
          href: '/contact'
        },
        {
          label: 'О компании',
          href: '/about'
        }
      ],
      curSubnav: null,
      activeSubnav: false
    }
  },
  async fetch() {
    const { allComplex } = await Api.graphQL(complexMenuItemsQuery)
    if (allComplex) {
      this.nav[1].subnav.links = allComplex
    }
  },
  fetchOnServer: false,
  computed: {
    favoriteIcon() {
      return this.$store.getters['favorite/itemsLength']
        ? 'heart-notify'
        : 'heart'
    },
    mobileMenuIcon() {
      return this.activeMobileNav ? 'close' : 'burger'
    }
  },
  watch: {
    '$route.path'() {
      this.activeSubnav = false
    }
  },
  methods: {
    navItemHandlers(subnav) {
      return subnav
        ? {
            click: (e) => {
              e.preventDefault()
              e.stopPropagation()
              this.onClickNavItem(subnav)
            }
          }
        : {}
    },
    onClickNavItem(subnav) {
      this.curSubnav = subnav
      this.activeSubnav = true
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 40;
  &__subnav {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
  &__main-header {
    height: 75px;
    border-bottom: 1px solid #ececec;
    position: relative;
    z-index: 2;
    background-color: theme(white-color);
    display: flex;
    align-items: center;
    background-color: theme(light);
  }
  &__complex-header {
    position: relative;
    z-index: 2;
    background-color: theme(white-color);
  }
  &__main,
  &__control {
    display: flex;
    align-items: center;
  }
  &__content {
    position: relative;
    z-index: 1;
    padding: 9px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }
  &__logo {
    max-height: 55px;
    object-position: left;
    margin-right: 90px;
    @include below($desktopDef) {
      margin-right: 35px;
    }
    &.logo {
      background-color: theme(current-color);
      padding: 10px;
      border-radius: 10px;
      color: #FFF;
      font-weight: 700;
    }
  }
  &__info {
    display: flex;
    align-items: center;
    &-item:not(:last-child) {
      margin-right: 15px;
    }
  }
  &__phone {
    font-weight: 600;
    font-size: 20px;
    margin-right: 16px;
    @include below($notebook) {
      display: none !important;
    }
  }
  &__burger {
    display: none !important;
    margin-left: 10px;
    @include below($notebook) {
      display: inline-flex !important;
    }
  }
  &__control-link {
    margin: 0 24px;
    display: flex;
    align-items: center;
  }
  &__control-icon {
    width: 24px;
    height: 24px;
  }
  &__nav {
    @include below($notebook) {
      display: none;
    }
  }
  &__nav-item {
    font-size: 15px;
    font-weight: 600;
    margin-right: 35px;
    &:last-child {
      margin-right: 0;
    }
    @include below($desktopSml) {
      margin-right: 15px;
    }
  }
}
</style>

<template lang="pug">
.list-items(
  :class="{disabled: loading}"
)
  v-loader.list-items__loader(
    v-show="loading"
  )
  v-container.list-items__container
    .list-items__content
      main-filter.list-items__filter(
        v-model="active"
        @update="updateData"
      )
      //- result.list-items__result(
      //-   @update:active="active = $event"
      //-   @update="updateData"
      //- )
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MainFilter from './shared/components/filter'
import Result from './shared/components/result'
import meta from '@/core/mixins/meta'
import scroll from '@/core/mixins/scroll'
import { DEFAULT_FILTER_UPDATE_DATA_PARAMS } from '@/core/constants'
import { syncHash, getActiveTabByUrl } from '@/core/utils/url'

export default {
  name: 'ListsItems',
  components: {
    MainFilter,
    Result
  },
  mixins: [meta, scroll],
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    },
    breadcrumbs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      active: false
    }
  },
  async fetch() {
    this.setRequestData(syncHash(this.$route.query))
    await this.updateData()
  },
  computed: {
    ...mapGetters({
      info: 'filter/info',
      tabs: 'filter/tabs',
      filters: 'filter/filters',
      loading: 'filter/loading'
    }),
    seo() {
      return {
        h1: this.info?.h1 || '',
        seo_title: this.info?.title || '',
        seo_description: this.info?.description || '',
        seo_keywords: this.info?.keywords || '',
        isNoindex: this.info?.isNoindex || '',
        breadcrumbs: this.info?.breadcrumbs || []
      }
    }
  },
  watch: {
    async $route() {
      this.resetRequestData()
      this.setRequestData(syncHash(this.$route.query))
      await this.initActiveTab()
      await this.updateData()
    }
  },
  methods: {
    ...mapMutations({
      resetRequestData: 'filter/RESET_REQUEST_DATA',
      setRequestData: 'filter/SET_REQUEST_DATA',
      setActiveTab: 'filter/SET_ACTIVE_TAB'
    }),
    ...mapActions({
      initTabs: 'filter/initTabs'
    }),
    initActiveTab() {
      const activeTab = getActiveTabByUrl(this.tabs, this.$route.fullPath)
      this.setActiveTab(activeTab)
    },
    openFilter() {
      this.active = true
      document.body.style.overflow = 'hidden'
    },
    closeFilter() {
      this.active = false
      document.body.style.overflow = 'scroll'
    },
    async updateData(settings = DEFAULT_FILTER_UPDATE_DATA_PARAMS) {
      await this.$store.dispatch('filter/updateData', settings)
      if (settings.scrollTop) {
        this.scrollToTop()
      }
      if (settings.callback) {
        settings.callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-items {
  position: relative;
  min-height: 70vh;
  background-color: #f7f7f7;
  &::before {
    position: fixed;
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    pointer-events: none;
    opacity: 0;
  }
  &.disabled {
    pointer-events: none;
    &::before {
      opacity: 1;
      z-index: 13;
    }
  }
  &__loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 14;
  }
  &__container {
    padding-top: 25px;
    padding-bottom: 75px;
    @include below($tablet) {
      padding-top: 5px;
    }
  }
  &__content {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 15px 20px;
    @include below($desktopDef) {
      grid-template-columns: 286px 1fr;
      gap: 15px;
    }
    @include below($notebook) {
      grid-template-columns: 1fr;
    }
  }
  &__preloader {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: #f7f7f7;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

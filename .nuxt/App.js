import Vue from 'vue'
import { decode, parsePath, withoutBase, withoutTrailingSlash, normalizeURL } from 'ufo'

import { getMatchedComponentsInstances, getChildrenComponentInstancesUsingFetch, promisify, globalHandleError, urlJoin, sanitizeComponent } from './utils'
import NuxtError from './components/nuxt-error.vue'
import NuxtLoading from './components/nuxt-loading.vue'
import NuxtBuildIndicator from './components/nuxt-build-indicator'

import '..\\assets\\scss\\main.scss'

import _1c3006c4 from './layouts.svg-sprite.18705dc9.vue'
import _6f6c098b from '..\\layouts\\default.vue'
import _577f069f from '..\\layouts\\layout\\footer\\shared\\components\\bottom.vue'
import _b68601a6 from '..\\layouts\\layout\\footer\\shared\\components\\main.vue'
import _2658c961 from '..\\layouts\\layout\\footer\\shared\\components\\top.vue'
import _54a1bd67 from '..\\layouts\\layout\\footer\\TheFooter.vue'
import _6dbc892e from '..\\layouts\\layout\\header\\shared\\components\\complex.vue'
import _6e359f8c from '..\\layouts\\layout\\header\\shared\\components\\mobile-nav.vue'
import _487196a5 from '..\\layouts\\layout\\header\\shared\\components\\subnav.vue'
import _55b810cb from '..\\layouts\\layout\\header\\TheHeader.vue'
import _18e66833 from '..\\layouts\\layout\\notify\\favorite.vue'
import _692ebabe from '..\\layouts\\layout\\TheIntegrations.vue'

const layouts = { "_svg-sprite": sanitizeComponent(_1c3006c4),"_default": sanitizeComponent(_6f6c098b),"_layout/footer/shared/components/bottom": sanitizeComponent(_577f069f),"_layout/footer/shared/components/main": sanitizeComponent(_b68601a6),"_layout/footer/shared/components/top": sanitizeComponent(_2658c961),"_layout/footer/TheFooter": sanitizeComponent(_54a1bd67),"_layout/header/shared/components/complex": sanitizeComponent(_6dbc892e),"_layout/header/shared/components/mobile-nav": sanitizeComponent(_6e359f8c),"_layout/header/shared/components/subnav": sanitizeComponent(_487196a5),"_layout/header/TheHeader": sanitizeComponent(_55b810cb),"_layout/notify/favorite": sanitizeComponent(_18e66833),"_layout/TheIntegrations": sanitizeComponent(_692ebabe) }

export default {
  render (h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })

    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [layoutEl])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter (el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [templateEl])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      h(NuxtBuildIndicator),
      transitionEl
    ])
  },

  data: () => ({
    isOnline: true,

    layout: null,
    layoutName: '',

    nbFetching: 0
    }),

  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    this.$root.$options.$nuxt = this

    if (process.client) {
      // add to window so we can listen when ready
      window.$nuxt = this

      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
    // Add $nuxt.context
    this.context = this.$options.context
  },

  async mounted () {
    this.$loading = this.$refs.loading
  },

  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline () {
      return !this.isOnline
    },

    isFetching () {
      return this.nbFetching > 0
    },
  },

  methods: {
    refreshOnlineStatus () {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    async refresh () {
      const pages = getMatchedComponentsInstances(this.$route)

      if (!pages.length) {
        return
      }
      this.$loading.start()

      const promises = pages.map(async (page) => {
        let p = []

        // Old fetch
        if (page.$options.fetch && page.$options.fetch.length) {
          p.push(promisify(page.$options.fetch, this.context))
        }

        if (page.$options.asyncData) {
          p.push(
            promisify(page.$options.asyncData, this.context)
              .then((newData) => {
                for (const key in newData) {
                  Vue.set(page.$data, key, newData[key])
                }
              })
          )
        }

        // Wait for asyncData & old fetch to finish
        await Promise.all(p)
        // Cleanup refs
        p = []

        if (page.$fetch) {
          p.push(page.$fetch())
        }
        // Get all component instance to call $fetch
        for (const component of getChildrenComponentInstancesUsingFetch(page.$vnode.componentInstance)) {
          p.push(component.$fetch())
        }

        return Promise.all(p)
      })
      try {
        await Promise.all(promises)
      } catch (error) {
        this.$loading.fail(error)
        globalHandleError(error)
        this.error(error)
      }
      this.$loading.finish()
    },
    errorChanged () {
      if (this.nuxt.err) {
        if (this.$loading) {
          if (this.$loading.fail) {
            this.$loading.fail(this.nuxt.err)
          }
          if (this.$loading.finish) {
            this.$loading.finish()
          }
        }

        let errorLayout = (NuxtError.options || NuxtError).layout;

        if (typeof errorLayout === 'function') {
          errorLayout = errorLayout(this.context)
        }

        this.setLayout(errorLayout)
      }
    },

    setLayout (layout) {
      if(layout && typeof layout !== 'string') {
        throw new Error('[nuxt] Avoid using non-string value as layout property.')
      }

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    },
  },

  components: {
    NuxtLoading
  }
}

import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_vuescrollto_2c306090 from 'nuxt_plugin_vuescrollto_2c306090' // Source: .\\vue-scrollto.js (mode: 'client')
import nuxt_plugin_nuxtsvgsprite_6fa0c192 from 'nuxt_plugin_nuxtsvgsprite_6fa0c192' // Source: .\\nuxt-svg-sprite.js (mode: 'all')
import nuxt_plugin_axios_303b414e from 'nuxt_plugin_axios_303b414e' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_vglobalcomponents_2bad28b2 from 'nuxt_plugin_vglobalcomponents_2bad28b2' // Source: ..\\plugins\\v-global-components (mode: 'all')
import nuxt_plugin_vmask_3889a70c from 'nuxt_plugin_vmask_3889a70c' // Source: ..\\plugins\\v-mask (mode: 'all')
import nuxt_plugin_vclickoutside_9abbdedc from 'nuxt_plugin_vclickoutside_9abbdedc' // Source: ..\\plugins\\v-click-outside (mode: 'all')
import nuxt_plugin_vmodal_68c05a90 from 'nuxt_plugin_vmodal_68c05a90' // Source: ..\\plugins\\v-modal.js (mode: 'all')
import nuxt_plugin_vaxios_d9e8ceb0 from 'nuxt_plugin_vaxios_d9e8ceb0' // Source: ..\\plugins\\v-axios (mode: 'all')
import nuxt_plugin_vuelidate_7b59e9fd from 'nuxt_plugin_vuelidate_7b59e9fd' // Source: ..\\plugins\\vuelidate.js (mode: 'all')
import nuxt_plugin_vviewer_14000650 from 'nuxt_plugin_vviewer_14000650' // Source: ..\\plugins\\v-viewer.js (mode: 'client')
import nuxt_plugin_vswiper_a1abb69c from 'nuxt_plugin_vswiper_a1abb69c' // Source: ..\\plugins\\v-swiper.js (mode: 'client')
import nuxt_plugin_vymap_6b638072 from 'nuxt_plugin_vymap_6b638072' // Source: ..\\plugins\\v-ymap.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root ? this.$root.$options.$nuxt : null
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const store = createStore(ssrContext)
  const router = await createRouter(ssrContext, config, { store })

  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"МедТакси","htmlAttrs":{"lang":"en"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1"},{"hid":"description","name":"description","content":""},{"name":"format-detection","content":"telephone=no"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    beforeSerializeFns: ssrContext ? ssrContext.beforeSerializeFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (process.client && typeof nuxt_plugin_vuescrollto_2c306090 === 'function') {
    await nuxt_plugin_vuescrollto_2c306090(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtsvgsprite_6fa0c192 === 'function') {
    await nuxt_plugin_nuxtsvgsprite_6fa0c192(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_303b414e === 'function') {
    await nuxt_plugin_axios_303b414e(app.context, inject)
  }

  if (typeof nuxt_plugin_vglobalcomponents_2bad28b2 === 'function') {
    await nuxt_plugin_vglobalcomponents_2bad28b2(app.context, inject)
  }

  if (typeof nuxt_plugin_vmask_3889a70c === 'function') {
    await nuxt_plugin_vmask_3889a70c(app.context, inject)
  }

  if (typeof nuxt_plugin_vclickoutside_9abbdedc === 'function') {
    await nuxt_plugin_vclickoutside_9abbdedc(app.context, inject)
  }

  if (typeof nuxt_plugin_vmodal_68c05a90 === 'function') {
    await nuxt_plugin_vmodal_68c05a90(app.context, inject)
  }

  if (typeof nuxt_plugin_vaxios_d9e8ceb0 === 'function') {
    await nuxt_plugin_vaxios_d9e8ceb0(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_7b59e9fd === 'function') {
    await nuxt_plugin_vuelidate_7b59e9fd(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vviewer_14000650 === 'function') {
    await nuxt_plugin_vviewer_14000650(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vswiper_a1abb69c === 'function') {
    await nuxt_plugin_vswiper_a1abb69c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vymap_6b638072 === 'function') {
    await nuxt_plugin_vymap_6b638072(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }

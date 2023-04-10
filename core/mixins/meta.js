import { isDev } from '../utils/process'
import { applyModifiersToString } from '../utils/tags'

export default {
  head() {
    const headObj = {
      title: applyModifiersToString(this.seo.seo_title),
      meta: [
        {
          name: 'description',
          content: applyModifiersToString(this.seo.seo_description)
        },
        {
          name: 'keywords',
          content: applyModifiersToString(this.seo.seo_keywords)
        },
        {
          name: 'robots',
          content: (this.seo || {}).isNoindex ? 'noindex,nofollow' : ''
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: this.$store.getters['settings/getFavicon'] || 'favicon.ico'
        }
      ],
      script: [],
      __dangerouslyDisableSanitizers: ['script']
    }
    if (!isDev) {
      const scriptHead = this.$store.getters['settings/getScriptHead']
      if (scriptHead) {
        headObj.script.push({ innerHTML: scriptHead })
      }
    }
    return headObj
  }
}

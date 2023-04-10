<template lang="pug">
div
  .body-scripts(
    v-if="bodyScripts"
    v-html="bodyScripts"
  )
  slot
  .footer-scripts(
    v-if="footerScripts"
    v-html="footerScripts"
  )
</template>

<script>
import { loadStyles } from '@/core/utils/integrations'
import { saveUTMLabels } from '../../core/utils/url'

export default {
  name: 'TheIntegrations',
  computed: {
    footerScripts() {
      return this.$store.getters['settings/getScriptFooter']
    },
    bodyScripts() {
      return this.$store.getters['settings/getScriptBody']
    },
    styles() {
      return this.$store.getters['settings/getStyles']
    }
  },
  beforeMount() {
    loadStyles(this.styles)
    saveUTMLabels()
  }
}
</script>

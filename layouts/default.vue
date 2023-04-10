<template lang="pug">
the-integrations.app-content
  the-header(
    :active-complex="false"
  )
  main
    nuxt-child
  the-footer
  the-modals
  notify-favorite
</template>

<script>
import TheModals from '../components/modals/TheModals'
import TheFooter from './layout/footer/TheFooter'
import TheHeader from './layout/header/TheHeader'
import NotifyFavorite from './layout/notify/favorite'
import TheIntegrations from './layout/TheIntegrations'

export default {
  name: 'DefaultLayout',
  components: {
    TheModals,
    NotifyFavorite,
    TheHeader,
    TheFooter,
    TheIntegrations
  }
}
</script>

<style lang="scss" scoped>
.app-content {
  &__breadcrumbs {
    padding: 15px 0;
  }
}
</style>

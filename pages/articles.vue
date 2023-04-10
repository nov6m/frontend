<template>
  <div class="page" :data-route="$route.fullPath">
    <OffersList />
  </div>
</template>

<script>
import OffersList from '@/components/blocks/lists/offers/index'

export default {
  name: 'IndexPage',
  components: {
    OffersList
  }
}
</script>

<template>
  <div class="page" :data-route="$route.fullPath">
    <OfferCard />
  </div>
</template>

<script>
import OfferCard from '@/components/blocks/cards/offer/index'

export default {
  name: 'IndexPage',
  components: {
    OfferCard
  }
}
</script>

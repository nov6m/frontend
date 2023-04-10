<template>
  <div class="page" :data-route="$route.fullPath">
    <ContactInfo />
    <SalesMap />
    <AlternativePromoBanner />
  </div>
</template>

<script>
import ContactInfo from '@/components/blocks/info/contact/index'
import SalesMap from '@/components/blocks/map/sales/index'
import AlternativePromoBanner from '@/components/blocks/banners/promo/alternative'

export default {
  name: 'IndexPage',
  components: {
    ContactInfo,
    SalesMap,
    AlternativePromoBanner
  }
}
</script>

<template>
  <div class="page" :data-route="$route.fullPath">
    <PromoBanner />
    <AlternativeAbout />
    <AlternativePromoBanner />
    <ManagersList />
  </div>
</template>

<script>
import PromoBanner from '@/components/blocks/banners/promo/index'
import AlternativeAbout from '@/components/blocks/info/about/alternative'
import AlternativePromoBanner from '@/components/blocks/banners/promo/alternative'
import ManagersList from '@/components/blocks/lists/managers/index'

export default {
  name: 'IndexPage',
  components: {
    PromoBanner,
    AlternativeAbout,
    AlternativePromoBanner,
    ManagersList
  }
}
</script>

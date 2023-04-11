<template>
  <div class="page" :data-route="$route.fullPath">
    <NewsCard />
  </div>
</template>

<script>
import NewsCard from '@/components/blocks/cards/offer/index'

export default {
  name: 'IndexPage',
  components: {
    NewsCard
  }
}
</script>

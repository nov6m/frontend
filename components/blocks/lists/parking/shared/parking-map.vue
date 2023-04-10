<template lang="pug">
client-only
  yandex-map.parking-map(
    :coords="coords"
    :zoom="15"
    :controls="['zoomControl']"
    :detailed-controls="{zoomControl: { position: { right: '30px', top: '200px' }, size: 'small' }}"
    :scroll-zoom="false"
  )
    ymap-marker(
      key="mark"
      marker-id="mark"
      :coords="coords"
    )
</template>

<script>
export default {
  name: 'ParkingMap',
  props: {
    coords: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.parking-map {
  width: 100%;
  height: 560px;
  border-radius: theme(ui-radius);
  overflow: hidden;
  @include below($notebook) {
    height: 460px;
  }
  @include below($notebook) {
    height: 360px;
  }
}
</style>

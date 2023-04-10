<template>
  <div class="video">
    <v-icon
      class="video__close"
      icon="close-round"
      @click="$emit('closePopup')"
    />
    <iframe
      class="video__frame"
      :src="getValue('params').video"
      frameborder="0"
      allowfullscreen
    />
  </div>
</template>

<script>
import ticket from '@/core/mixins/ticket'

export default {
  name: 'VideoModal',
  mixins: [ticket]
}
</script>

<style lang="scss" scoped>
.video {
  position: relative;
  height: 80vh;
  @include below($notebook) {
    height: 70vh;
  }
  @include below($tablet) {
    height: 60vh;
  }
  &__frame {
    border-radius: theme(ui-radius);
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  &__close {
    position: absolute;
    top: -20px;
    transform: translateY(-100%);
    right: 0;
    color: theme(white-color);
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}
</style>

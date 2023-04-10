<template lang="pug">
.house
  v-icon.house__close( icon="close" @click="$emit('closePopup')" )
  v-container
    v-title.house__title(
      v-html="getValue('params')?.address"
    )
    .house__content
      v-img.house__img(
        :src="getValue('params')?.image"
      )
      v-text(
        v-html="getValue('params')?.content"
      )
</template>

<script>
import ticket from '../../../../core/mixins/ticket'

export default {
  name: 'HouseModal',
  mixins: [ticket]
}
</script>

<style lang="scss" scoped>
.house {
  position: relative;
  width: 100%;
  padding: 60px 30px 60px;
  box-shadow: 0 0 30px rgba(140, 140, 140, 0.25);
  @include below($tablet) {
    padding: 35px 20px;
  }
  &__close {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 16px;
    height: 18px;
    cursor: pointer;
    color: theme(grey-dark);
  }
  &__title {
    margin-bottom: 25px;
  }
  &__content {
    display: grid;
    grid-template-columns: 350px auto;
    gap: 50px;
    @include below($tablet) {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }
  &__img {
    width: 100%;
    border-radius: theme(ui-radius);
  }
}
</style>

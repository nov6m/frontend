<template lang="pug">
header.items-header
  v-img.items-header__img(
    v-if="img"
    :alt="title"
    :src="img"
    cover
  )
  v-container.items-header__cnt
    v-breadcrumbs(
      :items="breadcrumbs"
    )
    v-title.items-header__title(
      v-if="title"
      tag="h1"
    ) {{ title }}
</template>

<script>
export default {
  name: 'BlockHeader',
  props: {
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    breadcrumbs: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.items-header {
  background-color: #f7f7f7;
  position: relative;
  height: 200px;
  padding: 25px 0;
  @include below($tablet) {
    height: 185px;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &__cnt {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: theme(white-color);
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(1.5px);
  }
}
</style>

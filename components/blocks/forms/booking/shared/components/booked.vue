<template>
  <div class="booked">
    <v-title class="booked__title" v-text="title" />
    <v-text class="booked__subtitle" v-text="subtitle" />
    <v-btn class="booked__btn" v-text="buttonText" :to="url" />
  </div>
</template>

<script>
export default {
  name: 'BookedView',
  props: {
    title: {
      type: String,
      default: () => ''
    },
    subtitle: {
      type: String,
      default: () => ''
    },
    buttonText: {
      type: String,
      default: () => ''
    },
    url: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style lang="scss" scoped>
.booked {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  &__title {
    margin-bottom: 20px;
  }
  &__subtitle {
    margin-bottom: 25px;
  }
}
</style>

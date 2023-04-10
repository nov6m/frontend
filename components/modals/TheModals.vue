<template lang="pug">
.modals
  vue-js-modal(
    name="modalDialog"
    :classes="getModal.active.name"
    height="auto"
    width="100%"
    :scrollable="true"
    :adaptive="true"
    :click-to-close="true"
    :reset="true"
    @closed="closePopup"
  )
    component(
      :is="componentLoader"
      v-bind="modalData"
      @closePopup="closePopup"
    )
</template>

<script>
import componentPromise from '@/core/utils/componentPromise'
export default {
  name: 'TheModals',
  computed: {
    modalData() {
      return this.getModal.active
    },
    componentLoader() {
      const component = this.modalData.name
      if (!component) {
        return
      }
      return () => {
        return {
          component: componentPromise(
            `modals/shared/components/${component}.vue`
          ),
          delay: 100,
          timeout: 6000
        }
      }
    }
  },
  methods: {
    closePopup() {
      this.$store.commit('modal/defaultModal')
      this.modalHide()
    }
  }
}
</script>

<style lang="scss">
.vm--container {
  .vm--overlay {
    background: rgba(52, 52, 52, 0.3);
  }
  .vm--modal {
    margin: 0 auto;
    overflow: visible;
    box-shadow: 0 0 30px rgba(140, 140, 140, 0.25);
    border-radius: theme(ui-radius);
    max-width: 440px;
    height: auto !important;
    &.parking {
      max-width: 260px;
    }
    &.house {
      max-width: 90%;
      @include below($tablet) {
        max-width: 100%;
      }
    }
    &.video {
      max-width: 70%;
      background: transparent;
      @include below($notebook) {
        max-width: 80%;
      }
      @include below($tablet) {
        max-width: 90%;
      }
    }
    @include below($tablet) {
      max-width: 385px;
    }
    @include below($mobileDef) {
      border-radius: 0;
      max-width: 100%;
    }
  }
}
</style>

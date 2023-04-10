<template lang="pug">
.info-callback(v-if="hasParking" )
  v-container
    .info-callback__bg
      .info-callback__wrap(
        :style="`background: url(${fields.img}) right bottom/contain no-repeat`"
      )
        .info-callback__content
          v-title.info-callback__title(
            v-if="fields.title"
            tag="h2"
            v-text="fields.title"
          )
          .info-callback__subtitle(
            v-if="fields.subtitle"
            v-text="fields.subtitle"
          )
          v-btn.info-callback__btn(
            v-if="fields.btnText"
            v-bind="link"
            @click="handleClick"
          ) {{ fields.btnText }}
</template>

<script>
import Api from '@/core/Api'
import { complexParkingQuery } from '@/query'
export default {
  name: 'InfoCallback',
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      hasParking: false
    }
  },
  async fetch() {
    if (this.id) {
      const { complex } = await Api.graphQL(complexParkingQuery, {
        id: this.id
      })
      if (complex) {
        this.hasParking = complex.hasParking
      }
    } else {
      this.hasParking = true
    }
  },
  computed: {
    link() {
      if (!this.fields.isPopup) {
        if (this.id) {
          return { to: `/parking?complex=${this.id}` }
        }
        return { to: '/parking' }
      }
      return {}
    }
  },
  methods: {
    handleClick() {
      if (this.fields.isPopup) {
        this.openModal()
      }
    },
    openModal() {
      this.modalShow()
    }
  }
}
</script>

<style lang="scss" scoped>
.info-callback {
  &__bg {
    background-color: theme(light);
    overflow: hidden;
    border-radius: theme(ui-radius);
  }
  &__wrap {
    padding: 70px;
    position: relative;
    @include below($desktopSml) {
      padding: 55px;
    }
    @include below($tablet) {
      padding: 35px;
      background: none !important;
    }
  }
  &__title {
    margin-bottom: 15px;
  }
  &__subtitle {
    @include below($desktopSml) {
      font-size: 14px;
    }
  }
  &__btn {
    margin-top: 26px;
  }
  &__content {
    max-width: 405px;
    @include below($tablet) {
      max-width: 100%;
    }
  }
}
</style>

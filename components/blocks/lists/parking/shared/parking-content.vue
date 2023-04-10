<template>
  <v-transform class="parking-content">
    <div ref="parking" class="parking-content__svg" v-html="image" />
  </v-transform>
</template>

<script>
import VTransform from '@/components/ui-kit/v-transform'
export default {
  name: 'ParkingContent',
  components: { VTransform },
  props: {
    items: {
      type: Object,
      default() {
        return {}
      }
    },
    image: {
      type: String,
      default: ''
    }
  },
  watch: {
    items: {
      handler() {
        this.setScheme()
      },
      deep: true
    }
  },
  mounted() {
    this.setScheme()
  },
  methods: {
    setScheme() {
      const places = this.$refs.parking.querySelectorAll("[id^='place']")
      places.forEach((el) => {
        const numberPlace = el.id.split('-')[1]
        const space = el.querySelector('.st1')
        const infoItem = this.items[numberPlace]
        if (infoItem?.status === 'free') {
          space.classList.remove('booked')
          space.classList.add('free')
          el.addEventListener('click', (e) => {
            e.stopPropagation()
            this.openModal({ ...this.items[numberPlace], place: numberPlace })
          })
        } else if (infoItem?.status === 'booked') {
          space.classList.remove('free')
          space.classList.add('booked')
          el.addEventListener('click', (e) => {
            e.stopPropagation()
            this.openModal({ ...this.items[numberPlace], place: numberPlace })
          })
        }
      })
    },
    openModal(data) {
      this.modalShow({
        name: 'parking',
        parking: data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.parking-content {
  &__svg {
    min-width: 700px;
    width: 100%;
    &::v-deep(.booked),
    &::v-deep(.free) {
      transition: fill 0.2s ease;
      cursor: pointer;
    }

    &::v-deep(.booked) {
      fill: #ffd2d2;

      &:hover {
        fill: #fb9595;
      }
    }

    &::v-deep(.free) {
      fill: #e2f4da;

      &:hover {
        fill: #adee90;
      }
    }
  }
}
</style>

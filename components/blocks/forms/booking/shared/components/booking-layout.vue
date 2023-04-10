<template>
  <div class="booking-layout">
    <v-container>
      <template v-if="loading">
        <div class="booking-layout__loading">
          <v-loader />
        </div>
      </template>
      <template
        v-else-if="bookingInfo && bookingInfo.getBookingStatus() === 'free'"
      >
        <slot name="steps" :wordbook="currentWordbook" :steps="steps" />
        <slot
          name="content"
          :product-info="productInfo"
          :wordbook="currentWordbook"
        />
      </template>
      <template v-else>
        <slot name="booked" :wordbook="currentWordbook['booked']" />
      </template>
    </v-container>
  </div>
</template>

<script>
import steps from '../constants/steps'
import wordbook from '../constants/wordbook'
import BookingFactory from '../service/booking'

export default {
  name: 'BookingLayout',
  data() {
    return {
      bookingInfo: null,
      loading: false,
      steps
    }
  },
  computed: {
    productInfo() {
      if (this.bookingInfo) {
        return {
          name: this.bookingInfo.getTitle(),
          image: this.bookingInfo.getImage(),
          price: this.bookingInfo.getPrice()
        }
      }
      return {}
    },
    currentWordbook() {
      return wordbook[this.bookingParams.type]
    },
    bookingParams() {
      const { id, type } = this.$route.query
      return {
        id,
        type: type || 'apartment'
      }
    }
  },
  async created() {
    await this.initBookingInfo()
  },
  methods: {
    async initBookingInfo() {
      this.loading = true
      const bookingFactory = new BookingFactory()
      const booking = bookingFactory.createBooking(this.bookingParams)
      await booking.fetchInfo()
      this.bookingInfo = booking
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.booking-layout {
  &__loading {
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

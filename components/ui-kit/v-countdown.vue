<template>
  <div class="v-countdown" :class="classList">
    <div class="v-countdown__inner">
      <p class="v-countdown__timer">
        {{ getTimer }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VCountdown',

  props: {
    timeoutSpeed: {
      type: Number,
      default: 1
    },

    duration: {
      type: Number,
      default: 120
    },

    classList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      timer: undefined,

      currentDuration: this.duration
    }
  },

  computed: {
    getTimer() {
      return this.convertTime(this.currentDuration)
    }
  },

  mounted() {
    this.timer = setInterval(() => {
      if (this.currentDuration > 0) {
        this.currentDuration -= this.timeoutSpeed
        this.$emit('update:duration', this.currentDuration)
      }
    }, this.timeoutSpeed * 1000)
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  methods: {
    convertTime(time) {
      const seconds = parseInt(time % 60)
      const minutes = parseInt((time / 60) % 60)

      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
      )}`
    }
  }
}
</script>

<style scoped lang="scss">
.v-countdown {
  &__timer {
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    color: theme(current-color);

    @include below($notebook) {
      font-size: 14px;
    }
  }
}
</style>

<template lang="pug">
.scheme-cell(
  :style="{'cursor': text ? 'pointer' : 'not-allowed'}"
  :class="{'active': active, booked: status === 'booked', 'free': status === 'free'}"
  @click.stop="$emit('click')"
)
  v-icon.scheme-cell__icon(
    v-if="status === 'booked'"
    icon="lock"
  )
  template(
    v-if="text && status === 'free'"
  ) {{ text }}
</template>

<script>
export default {
  name: 'SchemeCell',
  props: {
    status: {
      type: String,
      default: 'free'
    },
    text: {
      type: [String, Number],
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.scheme-cell {
  width: 30px;
  height: 30px;
  background: #fcfcfc;
  border: 1px solid #e8e8e8;
  border-radius: theme(ui-radius-small);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  color: theme(grey);
  font-size: 14px;
  transition: background 0.2s ease;
  &__icon {
    width: 14px;
    height: 14px;
  }
  //background: #ff8585;
  //&.free {
  //  background: #b3e79b;
  //}
  //&.booked {
  //  background: #ffc977;
  //}
  &.free.active {
    background: #e8fdde;
    border: 1px solid #e8e8e8;
  }
  &.booked.active {
    background: #ffc5d1;
    border: 1px solid #e8e8e8;
  }
}
</style>

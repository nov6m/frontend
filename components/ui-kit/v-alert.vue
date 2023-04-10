<template>
  <div class="v-alert">
    <div class="v-alert__content">
      <div v-if="iconName || $slots['alert-icon']" class="v-alert__icon">
        <slot name="alert-icon">
          <svg-icon class="v-alert__icon-content" :name="iconName" />
        </slot>
      </div>

      <div v-if="message || $slots['alert-message']" class="v-alert__message">
        <slot name="alert-message">
          <p class="v-alert__message-content">
            {{ message }}
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VAlert',

  props: {
    iconName: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.v-alert {
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 25px;

  border-radius: theme(ui-radius-small);

  background-color: #f4f4f4;

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  &__icon-content {
    height: 20px;
    width: 20px;
    color: theme(current-color);
  }

  &__message {
    font-size: 14px;
    line-height: 17px;
  }
}
</style>

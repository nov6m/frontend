<template>
  <div class="progress-step" :class="{ 'progress-step--active': activeStep }">
    <div class="progress-step__inner">
      <div class="progress-step__toggle" />

      <div class="progress-step__content">
        <p>{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressStep',

  props: {
    content: {
      type: String,
      default: ''
    },

    activeStep: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.progress-step {
  $self: &;

  border-top: 4px solid #f1f1f1;

  &__inner {
    display: flex;
    padding: 17px 0 25px;
    align-items: center;
    gap: 10px;
  }

  &--active {
    border-top: 4px solid theme(current-color);

    #{$self}__toggle {
      background: theme(current-color);
      border: none;
    }
  }

  &__content {
    @include below($notebook) {
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
    }
  }

  &__toggle {
    min-width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.16667px solid theme(current-color);
  }
}
</style>

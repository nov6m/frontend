<template>
  <div :class="`card-step--${stepStatus}`" class="card-step">
    <input :id="`id_${iconName}`" type="checkbox" />
    <div class="card-step__title">
      <label :for="`id_${iconName}`" />
      <div class="card-step__title-content">
        <div
          class="card-step__status"
          :class="{
            'card-step__status--active': ['active', 'passed'].includes(
              stepStatus
            )
          }"
        />
        <v-title small class="card-step__title-text">
          {{ title }}
        </v-title>
      </div>
      <svg-icon class="card-step__dropdown-icon" name="arrow-down" />
    </div>
    <div class="card-step__description">
      <v-text class="card-step__description-content">
        {{ description }}
      </v-text>
    </div>
    <svg-icon class="card-step__icon" :name="iconName" />
  </div>
</template>

<script>
export default {
  name: 'CardStep',
  props: {
    title: {
      type: String,
      default: ''
    },

    description: {
      type: String,
      default: ''
    },

    iconName: {
      type: String,
      default: ''
    },

    stepStatus: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card-step {
  cursor: default;

  padding: 25px;

  border: 1px solid theme(grey-light);

  border-radius: theme(ui-radius);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 193px;

  label {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox']:checked ~ &__description {
    display: block;
  }

  input[type='checkbox']:checked ~ &__title &__dropdown-icon {
    transform: rotate(-180deg);
  }

  &__status {
    min-width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.16667px solid theme(current-color);

    &--active {
      background-color: theme(current-color);
    }

    @include above($tablet) {
      display: none;
    }
  }

  @include below($notebook) {
    min-height: 225px;
  }

  &--active {
    border-color: theme(current-color);
    opacity: 1;
  }

  @include below($tablet) {
    border: none;
    min-height: unset;
    padding: 14.5px 0;
    border-bottom: 1px solid theme(grey-light);
    border-radius: 0;
    gap: 12.5px;
  }

  @include above($tablet) {
    input[type='checkbox'],
    label {
      display: none;
    }
  }

  &__dropdown-icon {
    width: 20px;
    height: 20px;
    color: #cc163f;
    transform: rotate(0deg);
    transition: 0.25s linear;

    @include above($tablet) {
      display: none;
    }
  }

  &--passed {
    opacity: 1;
  }

  &--disabled {
    opacity: 0.7;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  &__title-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__title-text {
    @include below($notebook) {
      font-size: 18px;
    }

    @include below($tablet) {
      font-size: 16px !important;
      font-weight: 600 !important;
    }
  }

  &__icon {
    width: 56px;
    height: 56px;
    color: #cc163f;

    @include below($tablet) {
      display: none;
    }
  }

  &__description {
    @include below($tablet) {
      display: none;
    }
  }

  &__description-content {
    font-size: 15px;

    @include below($notebook) {
      font-size: 14px;
    }
  }
}
</style>

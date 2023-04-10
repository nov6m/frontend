<template>
  <section class="step-complete">
    <div class="step-complete__inner">
      <div class="step-complete__header">
        <v-title small class="step-complete__title">
          Данные о бронировании “{{ productInfo.name }}” переданы менеджерам
          отдела продаж
        </v-title>
      </div>

      <div class="step-complete__content">
        <v-text
          class="step-complete__description"
          v-text="
            'Наш менеджер свяжется с вами в ближайшее время для подтверждения бронирования'
          "
        />
      </div>

      <div class="step-complete__actions">
        <v-btn :to="wordbook.url">
          {{ wordbook.buttonText }}
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import apartment from '@/core/mixins/apartment'
export default {
  name: 'StepComplete',
  mixins: [apartment],
  props: {
    productInfo: {
      type: Object,
      default: () => ({})
    },
    wordbook: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang="scss">
.step-complete {
  &__inner {
    max-width: 624px;

    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    > * {
      text-align: center;
    }
  }

  &__title {
    line-height: 24px;

    @include below($notebook) {
      font-size: 16px;
      font-weight: 600;
      line-height: 19px;
    }
  }

  &__description {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;

    @include below($notebook) {
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
    }
  }

  &__actions {
    margin-top: 5px;
  }
}
</style>

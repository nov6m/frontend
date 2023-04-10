<template>
  <BookingLayout class="form-booking">
    <template #booked="{ wordbook }">
      <Booked
        :title="wordbook.title"
        :subtitle="wordbook.subtitle"
        :button-text="wordbook.buttonText"
        :url="wordbook.url"
      />
    </template>
    <template #steps="{ wordbook, steps }">
      <div key="progress" class="form-booking__progress">
        <progress-step
          v-for="id in steps"
          :key="`progress-step__${id}`"
          :active-step="passedSteps.includes(id)"
          :content="wordbook[id].step.name"
        />
      </div>

      <div key="steps" class="form-booking__steps">
        <card-step
          v-for="id in steps"
          :key="id"
          :step-status="getStepStatus(id)"
          class="form-booking__step"
          :title="wordbook[id].step.title"
          :icon-name="wordbook[id].step.iconName"
          :description="wordbook[id].step.description"
        />
      </div>
    </template>
    <template #content="{ productInfo, wordbook }">
      <keep-alive class="form-booking__content">
        <component
          :is="getComponentByStep"
          :product-info="productInfo"
          :wordbook="wordbook[currentStep]"
          :form-data="formData"
          :sms-token="smsToken"
        />
      </keep-alive>
    </template>
  </BookingLayout>
</template>

<script>
import steps from './shared/constants/steps'
import BookingLayout from './shared/components/booking-layout'
import CardStep from '@/components/blocks/forms/booking/shared/components/card-step'
import Booked from './shared/components/booked'
import ProgressStep from '@/components/blocks/forms/booking/shared/components/progress/progress-step'
import { removeTags } from '@/core/utils/numberFormat'
import Api from '@/core/Api'
import { objectToFormData } from '@/core/utils/objectToFormData'

export default {
  name: 'FormBooking',

  components: {
    CardStep,
    ProgressStep,
    BookingLayout,
    Booked
  },
  provide() {
    return {
      saveFormData: this.saveFormData,
      nextStep: this.nextStep,
      previousStep: this.previousStep,
      bookTicket: this.bookTicket
    }
  },

  data() {
    return {
      currentStep: steps[0],
      passedSteps: [steps[0]],
      formData: {},
      smsToken: ''
    }
  },

  computed: {
    getComponentByStep() {
      const componentList = {}
      steps.forEach((step) => {
        componentList[step] = () =>
          import(
            `@/components/blocks/forms/booking/shared/components/booking-steps/step-${step}.vue`
          )
      })
      return componentList[this.currentStep]
    }
  },

  methods: {
    previousStep(step) {
      this.passedSteps = this.passedSteps.filter(
        (passStep) => step !== passStep
      )
      this.currentStep = this.passedSteps[this.passedSteps.length - 1]
    },

    nextStep() {
      const currentStepIndex = steps.indexOf(this.currentStep)
      if (steps.length - 1 > currentStepIndex) {
        this.currentStep = steps[currentStepIndex + 1]
        this.passedSteps.push(this.currentStep)
      }
    },

    async saveFormData(data) {
      this.formData = {
        ...this.formData,
        ...data
      }
      const response = await Api.sendSMS({
        phone: removeTags(this.formData.phone),
        token: this.smsToken || undefined
      })
      this.smsToken = response.token
    },

    async bookTicket() {
      const { type, id } = this.$route.query
      const formData = objectToFormData({
        ...this.formData,
        code: 'booking',
        [type]: id,
        subject:
          type === 'parking'
            ? 'Бронирование машиноместа'
            : 'Бронирование квартиры'
      })
      await Api.sendTicket(formData)
    },

    getStepStatus(step) {
      if (this.currentStep === step) {
        return 'active'
      }
      if (this.passedSteps.includes(step)) {
        return 'passed'
      }
      if (!this.passedSteps.includes(step)) {
        return 'disabled'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.form-booking {
  &__steps {
    display: grid;
    gap: 28px;
    grid-template-columns: repeat(3, 1fr);

    @include below($notebook) {
      gap: 10px;
    }

    @include below($tablet) {
      grid-template-columns: 1fr;
    }
  }

  &__progress {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @include below($tablet) {
      display: none;
    }
  }

  &::v-deep(section) {
    width: 100%;
    margin: 35px auto 0;
  }
}
</style>

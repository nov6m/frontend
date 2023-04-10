<template lang="pug">
.offer-card
  v-container
    v-title.offer-card__title(
      v-if="offer?.name"
      v-text="offer.name"
      tag="h1"
    )
    .offer-card__wrapper(
      :class="{withoutForm: !offer?.feedbackForm}"
    )
      v-text.offer-card__content(
        v-html="offer.text"
      )
      //- offer-form.offer-card__form(
      //-   v-if="offer?.feedbackForm"
      //-   :title="offer.feedbackForm.name"
      //-   :subtitle="offer.feedbackForm.subName"
      //-   :btn-text="offer.feedbackForm.btnText"
      //-   :disclaimer="offer.feedbackForm.disclaimer"
      //- )
</template>

<script>
import OfferForm from './shared/components/form'
import block from '@/core/mixins/block'

export default {
  name: 'OfferCard',
  components: { OfferForm },
  props: {
    offer: {
      type: Object,
      default() {
        return {
          name: 'Новый транспорт',
          text: `<p><img alt="" src="https://s15.stc.yc.kpcdn.net/share/i/12/10878731/wr-960.webp" style="width: 918px; height: 544px;"><br>
            On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.</p>`
        }
      }
    }
  },
  mixins: [block]
}
</script>

<style lang="scss" scoped>
.offer-card {
  padding: 50px 0;
  &__title {
    margin-bottom: 25px;
  }
  &__wrapper {
    display: grid;
    gap: 50px;
    grid-template-columns: auto 400px;
    &.withoutForm {
      grid-template-columns: 1fr;
    }
    @include below($desktopSml) {
      grid-template-columns: auto 300px;
      gap: 33px;
    }
    @include below($notebook) {
      grid-template-columns: auto 250px;
      gap: 24px;
    }
    @include below($tablet) {
      grid-template-columns: 1fr;
    }
  }
}
</style>

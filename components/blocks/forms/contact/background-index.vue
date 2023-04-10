<template lang="pug">
.form-contact
  v-img.form-contact__bg(
    v-if="fields.img"
    :src="fields.img"
    :alt="fields.title || 'Форма обратной связи'"
    cover
  )
  v-container.form-contact__container
    form-contact.form-contact__content(
      :title="fields.title"
      :description="fields.description"
      :disclaimer="fields.disclaimer"
      :btn-text="fields.btnText"
    )
</template>

<script>
import formContact from './shared/components/form'

export default {
  name: 'FormContact',
  components: {
    formContact
  },
  props: {
    fields: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-contact {
  position: relative;
  padding: 36px 0;
  height: 600px;
  @include below($notebook) {
    height: unset;
  }
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__container {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @include below($notebook) {
      justify-content: center;
    }
  }
  &__content {
    position: relative;
    z-index: 1;
    width: 445px;
    @include below($mobileDef) {
      width: 100%;
    }
  }
}
</style>

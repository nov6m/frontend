<template lang="pug">
  p.v-disclaimer(
    v-if="!disclaimerText"
  ) Нажимая кнопку «{{btn}}», Вы соглашаетесь с&nbsp;
    v-link(mode="link" :to="policyLink") Политикой защиты данных
  p.v-disclaimer(
    v-else
    v-html="disclaimerTextHtmlEncode"
  )
</template>

<script>
export default {
  name: 'VDisclaimer',
  props: {
    btn: {
      type: String,
      default: 'Оставить заявку'
    },
    policyLink: {
      type: String,
      default: '/policy'
    },
    disclaimerText: {
      type: String,
      default: ''
    }
  },
  computed: {
    disclaimerTextHtmlEncode() {
      return this.disclaimerText
        .replace('{{button}}', this.btn)
        .replace('{{policy}}', this.policyLink)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-disclaimer {
  color: theme(grey-dark);
  font-size: 14px;
  a,
  &::v-deep(a) {
    color: theme(current-color);
    transition: 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>

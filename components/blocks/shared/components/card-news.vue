<template lang="pug">
v-link.news-card(
  :to="to"
)
  .news-card__date(
    v-if="date"
  ) {{ formatDate }}
  .news-card__title(
    v-if="title"
  ) {{ title }}
  .news-card__description(
    v-if="description"
  ) {{ description }}
</template>

<script>
import moment from 'moment'
export default {
  name: 'NewsCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  },
  computed: {
    formatDate() {
      return moment(this.date).format('DD.MM.YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.news-card {
  padding: 21px 32px 36px;
  border-radius: theme(ui-radius);
  border: 1px solid theme(grey-light);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: border-color 0.25s ease;
  @include below($notebook) {
    padding: 20px;
  }
  &:hover {
    border-color: theme(grey);
  }
  &__date {
    font-size: 14px;
    color: theme(grey-dark);
    margin-bottom: 15px;
  }
  &__title {
    margin-bottom: 15px;
    font-weight: 600;
    font-size: 18px;
  }
  &__description {
    margin-top: auto;
    color: theme(grey-dark);
  }
}
</style>

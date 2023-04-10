<template lang="pug">
.info-about
  v-container
    .info-about__content
      .info-about__main
        v-title.info-about__title(
          v-if="fields.title"
        ) {{ fields.title }}
        v-description.info-about__description(
          v-if="fields.description"
        ) {{ fields.description }}
        v-btn.info-about__btn(
          v-if="fields.btnText"
          v-bind="path"
          @click="handleClick"
        ) {{ fields.btnText }}
      .info-about__stats
        stat-item.info-about__stat(
          v-for="(item, idx) in fields.stats"
          :key="idx"
          :label="item.label"
          :value="item.value"
        )
</template>

<script>
import statItem from './shared/components/stat-item'

export default {
  name: 'InfoAbout',
  components: {
    statItem
  },
  props: {
    fields: {
      type: Object,
      default() {
        return {
          title: 'О компании',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          stats: [
            {
              label: 'Перевозим людей',
              value: '10 лет'
            },
            {
              label: 'Перевозим людей',
              value: '10 лет'
            },
            {
              label: 'Перевозим людей',
              value: '10 лет'
            },
            {
              label: 'Перевозим людей',
              value: '10 лет'
            }
          ]
        }
      }
    }
  },
  computed: {
    path() {
      if (!this.fields.isPopup) {
        return { to: this.fields.link }
      }
      return {}
    }
  },
  methods: {
    handleClick() {
      if (this.fields.isPopup) {
        this.openModal()
      }
    },
    openModal() {
      this.modalShow()
    }
  }
}
</script>

<style lang="scss" scoped>
.info-about {
  padding: 25px 0;
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @include below($tablet) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__main {
    width: 47%;
    @include below($tablet) {
      width: 100%;
    }
  }
  &__title,
  &__description {
    margin-bottom: 25px;
  }
  &__stats {
    width: 40%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 80px;
    grid-row-gap: 40px;
    @include below($tablet) {
      margin-top: 20px;
      width: 100%;
      padding: 0 20px;
    }
    @include below($mobileLrg) {
      grid-column-gap: 40px;
      grid-column-row: 20px;
      padding: 0;
    }
  }
}
</style>

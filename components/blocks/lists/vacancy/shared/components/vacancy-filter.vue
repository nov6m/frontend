<template lang="pug">
.vacancy-filter
  v-select.vacancy-filter__field(
    :value="filters.category"
    :options="[{key: '', name: 'Все'}, ...filters.categoryItems]"
    @input="updateFilterField($event, 'category')"
    track-by="key"
    label="name"
    placeholder="Услуга"
  )
  v-select.vacancy-filter__field(
    :value="filters.city"
    :options="[{key: '', name: 'Все'}, ...filters.cityItems]"
    @input="updateFilterField($event, 'city')"
    track-by="key"
    label="name"
    placeholder="Город"
  )
</template>

<script>
export default {
  name: 'VacancyFilter',
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateFilterField(value, field) {
      const newFilterData = { ...this.filters }
      newFilterData[field] = value
      this.$emit('update:filter', newFilterData)
      this.$emit('click:find')
    }
  }
}
</script>

<style lang="scss" scoped>
.vacancy-filter {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  @include below($notebook) {
    gap: 14px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @include below($tablet) {
    grid-template-columns: 1fr 1fr;
    row-gap: 8px;
    column-gap: 18px;
  }
  @include below($mobileLrg) {
    grid-template-columns: 1fr;
  }
}
</style>

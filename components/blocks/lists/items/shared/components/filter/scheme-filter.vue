<template lang="pug">
.scheme-filter
  v-select.scheme-filter__select(
    :value="complex"
    @input="$emit('update:complex', $event)"
    placeholder="Жилой комплекс"
    :searchable="false"
    track-by="id"
    label="name"
    :options="complexes"
    small
  )
  v-select.scheme-filter__select.scheme-filter__select--large(
    :value="house"
    @input="$emit('update:house', $event)"
    placeholder="Номер дома"
    :searchable="false"
    :options="houses"
    :disabled="!houses.length"
    track-by="id"
    label="name"
    small
  )
  //v-btn.scheme-filter__btn(
  //  mode="white"
  //  small
  //  block
  //) Показать на карте
  v-btn.scheme-filter__btn(
    :to="`/apartment?${url}`"
    mode="white"
    small
  ) Показать списком
</template>

<script>
export default {
  name: 'SchemeFilter',
  props: {
    complex: {
      type: [String, Object],
      required: true
    },
    house: {
      type: [String, Object],
      required: true
    },
    complexes: {
      type: Array,
      required: true
    },
    houses: {
      type: Array,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.scheme-filter {
  padding: 25px 0;
  display: flex;
  gap: 22px;
  @include below($notebook) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 15px 0;
  }
  @include below($mobileDef) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
  &__select {
    max-width: 205px;
    &--large {
      max-width: 320px;
    }
    @include below($notebook) {
      max-width: 100%;
    }
  }
  &__btn {
    &:last-child {
      margin-left: auto;
      @include below($notebook) {
        margin-left: unset;
      }
    }
  }
}
</style>

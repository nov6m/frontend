<template lang="pug">
.parking-filter
  v-select.parking-filter__input.parking-filter__complex(
    :value="complex"
    @input="$emit('update:complex', $event); $emit('update'); $emit('update:house', '')"
    :options="complexes"
    placeholder="Жилой комплекс"
    track-by="id"
    label="name"
    openDirection="bottom"
    :searchable="false"
    small
  )
  v-select.parking-filter__input.parking-filter__house(
    :value="house"
    @input="$emit('update:house', $event); $emit('update')"
    :options="houses"
    placeholder="Номер дома"
    :disabled="!houses.length"
    track-by="id"
    label="name"
    openDirection="bottom"
    :searchable="false"
    small
  )
  .parking-filter__m-tab( :class="{active: view === 'map'}" @click="updateTab(view === 'map' ? 'scheme' : 'map')" )
    v-icon.parking-filter__m-tab-icon( icon="point" )
  v-tabs.parking-filter__tabs(
    v-model="tab"
    mode="combined"
  )
    v-tab.parking-filter__tab(
      @click="updateTab('scheme')"
    ) На схеме
    v-tab.parking-filter__tab(
      @click="updateTab('map')"
    ) На карте
</template>

<script>
export default {
  name: 'ParkingFilter',
  props: {
    house: {
      default() {
        return {}
      }
    },
    complex: {
      default() {
        return {}
      }
    },
    complexes: {
      type: Array,
      default() {
        return []
      }
    },
    houses: {
      type: Array,
      default() {
        return []
      }
    },
    view: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tab: 0
    }
  },
  methods: {
    updateTab(tab) {
      if (tab !== this.view) {
        this.$emit('update:view', tab)
        this.$emit('update')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.parking-filter {
  display: grid;
  grid-template-columns: 220px 240px auto;
  gap: 10px;
  @include below($tablet) {
    grid-template-columns: 1fr 1fr 40px;
    gap: 8px;
  }
  @include below($mobileDef) {
    grid-template-columns: 1fr 40px;
    gap: 7px;
  }
  &__complex {
    @include below($mobileDef) {
      grid-column: span 2;
    }
  }
  &__tabs.v-tabs {
    margin-left: auto;
    @include below($tablet) {
      display: none;
    }
  }
  &__m-tab {
    border: 1px solid theme(grey-light);
    border-radius: theme(ui-radius-small);
    display: flex;
    align-items: center;
    justify-content: center;
    color: theme(current-color);
    transition: all 0.2s ease;
    &.active {
      color: theme(white-color);
      background: theme(current-color);
    }
    &-icon {
      width: 24px;
      height: 24px;
    }
    @include above($tablet) {
      display: none;
    }
  }
}
</style>

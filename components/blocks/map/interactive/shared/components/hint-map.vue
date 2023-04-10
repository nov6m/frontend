<template lang="pug">
.hint-map
  .hint-map__wrap( ref="wrap" )
    .hint-map__content( ref="content" )
      .hint-map__map
        v-img.hint-map__img(
          :src="img"
          alt="Интерактивная карта"
        )
        point.hint-map__point(
          v-for="(item) in items"
          :key="item.id"
          :title="item.houseNumber"
          :position="{top: getCoordsFromString(item.complexPointPosition)[0], left: getCoordsFromString(item.complexPointPosition)[1]}"
          :status-info="statuses[item.publicationStatus]"
          :hint="curInfo"
          @open="getPointInfo(item, item.houseNumber, item.address)"
          :class="{active: curInfo && curInfo.id === item.id}"
        )
          transition(
            name="fade"
          ) {{ getCoordsFromString(item.complexPointPosition)[0] }}
            hint.hint-map__hint(
              v-if="curInfo && curInfo.id === item.id"
              :class="{reverse: +getCoordsFromString(item.complexPointPosition)[0] > 50}"
              :title="curInfo.name"
              :subtitle="curInfo.date"
              :total="curInfo.count"
              :items="curInfo.list"
              :href="curInfo.href"
              @close="curInfo = null"
            )
  //v-container.hint-map__statuses
  //  statuses(
  //    :items="statuses"
  //  )
</template>

<script>
import Statuses from '../../../../shared/components/block-statuses'
import point from './shared/components/point'
import hint from './shared/components/shared/components/hint'
import { getCoordsFromString } from '@/core/utils/coords'
import Api from '@/core/Api'
import { getQuarterFromDate } from '@/core/utils/date'
export default {
  name: 'HintMap',
  components: {
    Statuses,
    point,
    hint
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    complexName: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    statuses: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      curInfo: null,
      active: true
    }
  },
  mounted() {
    this.$refs.content.scrollLeft =
      (this.$refs.content.scrollWidth - this.$refs.content.clientWidth) / 2
  },
  methods: {
    getCoordsFromString,
    async getPointInfo(item, i, address) {
      if (this.curInfo?.id === item.id) {
        return
      }
      this.curInfo = null
      const data = await Api.getHousePointInfo(item.id)
      const complexKey = this.complexName.toLowerCase()
      const pricesAparment = []
      for (const dataKey in data) {
        const price = `от ${(data[dataKey] / 1000000).toFixed(1)} млн ₽`
        pricesAparment.push({
          title: dataKey === 'studio' ? 'Студии' : `${dataKey}-к квартиры`,
          subtitle: price,
          href: `/apartment?complex=${complexKey}&house=${complexKey}:${address}&rooms=${dataKey}`
        })
      }
      const date = new Date(item.deliveryDate)
      this.curInfo = {
        id: item.id,
        name: 'Дом ' + i,
        date: `Срок сдачи ${getQuarterFromDate(
          date
        )} кв. ${date.getFullYear()} г`,
        count: item.countApartments,
        href: `/apartment?complex=${complexKey}&house=${complexKey}:${address}`,
        list: pricesAparment
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hint-map {
  &__wrap {
    overflow: hidden;
  }
  &__map {
    min-width: $notebook;
    position: relative;
  }
  &__content {
    overflow-x: auto;
  }
  &__img {
    width: 100%;
    height: 100%;
  }
  &__statuses {
    margin-top: 25px;
    @include below($tablet) {
      margin-top: 10px;
    }
  }

  &__hint {
    position: absolute;
    right: 50%;
    bottom: -10px;
    transform: translateX(50%) translateY(100%);
    z-index: 11;
    &.reverse {
      bottom: unset;
      top: -10px;
      transform: translateX(50%) translateY(-100%);
    }
    @include below($notebook) {
      transform: unset;
      position: fixed;
      bottom: 0;
      right: 0;
      top: unset;
      width: 100vw;
      max-height: calc(100vh - 76px);
    }
  }
  &__point {
    &.active {
      @include above($notebook) {
        z-index: 4 !important;
      }
    }
  }
}
</style>

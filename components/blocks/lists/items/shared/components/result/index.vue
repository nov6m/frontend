<template lang="pug">
main.filter-result
  tags.filter-result__tags(
    :items="tags"
    @remove="removeTag"
  )
  template(
    v-if="isNotEmptyArray(items)"
  )
    transition-group.filter-result__list(
      name="list"
      tag="div"
      key="group-items"
    )
      .filter-result__item(
        v-for="(item) in items"
        :key="item.id"
      )
        promo-card(
          v-if="item.type === 'promo'"
          title="Ипотека <span>от 4%</span> в ЖК Геометрия\n" +
          "Успейте до <span>31 января 2023г.!</span>"
          href="/"
          img="https://static.tildacdn.com/tild6134-3239-4334-a162-343835643534/building_012.png"
        )
        card(
          v-else
          :item="item"
        )
    .filter-result__paginate(
      v-if="+countPages > 1"
    )
      v-paginate(
        v-model="curPage"
        :page-count="countPages"
      )
      .filter-result__paginate-info
      | Вы посмотрели {{ curPage === countPages ? countItems : watchedItems }}
      | {{ wordByNumber(watchedItems, 'apartments') }} из {{ countItems }}
  not-found(
    v-else
    @reset="reset"
  )
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Tags from './shared/components/tags'
import Card from './shared/components/card'
import NotFound from './shared/components/not-found'
import PromoCard from './shared/components/promo-card'
import { isNotEmptyArray } from '@/core/utils/type'
import {
  DEFAULT_FILTER_UPDATE_DATA_PARAMS,
  COUNT_ITEMS_ON_PAGE
} from '@/core/constants'
import {
  getNewDataForRemoveRange,
  getNewDataForRemove
} from '@/core/utils/tags'
import { wordByNumber, randomIntFromInterval } from '@/core/utils/numberFormat'

export default {
  name: 'FilterResult',
  components: {
    PromoCard,
    Tags,
    Card,
    NotFound
  },
  computed: {
    ...mapGetters({
      info: 'filter/info',
      tags: 'filter/tags',
      requestData: 'filter/requestData',
      countItems: 'filter/countItems'
    }),
    items() {
      const groups = this.$store.getters['filter/items']
      if (isNotEmptyArray(groups) && isNotEmptyArray(groups[0].values)) {
        const items = [...groups[0].values]
        // if (Math.random() < 0.5) {
        //   items.splice(randomIntFromInterval(2, 11), 0, {
        //     type: 'promo',
        //     id: 'promo'
        //   })
        // }
        return items
      }
      return []
    },
    countPages() {
      return Math.ceil(this.countItems / COUNT_ITEMS_ON_PAGE)
    },
    curPage: {
      get() {
        return +this.$store.getters['filter/page']
      },
      set(val) {
        this.$store.commit('filter/SET_PAGE', val)
        this.setRequestData({ page: val })
        this.updateData()
      }
    },
    watchedItems() {
      return this.curPage * COUNT_ITEMS_ON_PAGE
    }
  },
  methods: {
    isNotEmptyArray,
    wordByNumber,
    ...mapMutations({
      resetRequestData: 'filter/RESET_REQUEST_DATA',
      setRequestData: 'filter/SET_REQUEST_DATA'
    }),
    reset() {
      this.resetRequestData()
      this.updateData()
    },
    removeTag(tag) {
      if (['checkbox', 'color', 'select'].includes(tag.type)) {
        const newParamData = getNewDataForRemove(tag, this.requestData)
        this.setRequestData({ [tag.param]: newParamData })
      } else if (tag.type === 'range') {
        const newParamData = getNewDataForRemoveRange(tag, this.requestData)
        this.setRequestData({ [tag.param]: newParamData })
      }
      this.updateData({ scrollTop: false })
    },
    updateData($event = DEFAULT_FILTER_UPDATE_DATA_PARAMS) {
      this.$emit('update', $event)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-result {
  @include below($notebook) {
    width: 100%;
  }
  &__tags {
    margin-bottom: 10px;
  }
  &__item {
    width: 100%;
  }
  &__paginate {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 58px;
    @include below($notebook) {
      margin-top: 40px;
    }
  }
  &__paginate-info {
    font-size: 14px;
    color: theme(grey-dark);
    margin-top: 15px;
  }
  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    @include below($tablet) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 12px;
      row-gap: 20px;
    }
    @include below($mobileLrg) {
      grid-template-columns: 1fr;
    }
  }
}
</style>

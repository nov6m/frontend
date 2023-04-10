import { TIME_VISIBLE_FAVORITE_NOTIFY } from '../constants'
import apartment from './apartment'

export default {
  mixins: [apartment],
  methods: {
    addFavorite(item, { notify, callback } = { notify: false }) {
      this.$store.commit('favorite/add', item.id)
      if (callback) {
        callback()
      }
      if (notify) {
        this.$store.commit('favorite/activateNotify', {
          img: item.layout_image,
          title: this.getApartmentName(
            item.rooms,
            item.isStudio,
            item.square,
            item.floor,
            item?.house?.countFloors
          ),
          subtitle: item?.bookingStatus
        })
        setTimeout(() => {
          this.$store.commit('favorite/disableNotify')
        }, TIME_VISIBLE_FAVORITE_NOTIFY)
      }
    },
    removeFavorite(item, callback) {
      this.$store.commit('favorite/remove', item)
      if (callback) {
        callback()
      }
      if (this.$store.getters['favorite/activeNotify']) {
        this.$store.commit('favorite/disableNotify')
      }
    },
    hasInFavorite(param) {
      return this.$store.getters['favorite/items'].includes(param)
    }
  }
}

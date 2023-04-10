import Vue from 'vue'
import Ymap from 'vue-yandex-maps'

const settings = {
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}

Vue.use(Ymap, settings)

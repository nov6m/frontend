import api from '@/core/Api'

export default function ({ $axios, redirect, store, error }, inject) {
  api.$axios = $axios
  inject('api', api)
}

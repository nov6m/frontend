export const state = () => ({
  items: [],
  notify: {},
  activeNotify: false
})

export const getters = {
  items(state) {
    return state.items
  },
  itemsLength(state) {
    return state.items.length
  },
  notify(state) {
    return state.notify
  },
  activeNotify(state) {
    return state.activeNotify
  }
}

export const mutations = {
  activateNotify(state, item) {
    state.activeNotify = true
    state.notify = item
  },
  disableNotify(state) {
    state.activeNotify = false
    state.notify = {}
  },
  add(state, item) {
    state.items.push(item)
    if (process.client && localStorage) {
      localStorage.setItem('favorite', JSON.stringify(state.items))
    }
  },
  remove(state, item) {
    state.items.splice(state.items.indexOf(item), 1)
    if (process.client && localStorage) {
      localStorage.setItem('favorite', JSON.stringify(state.items))
    }
  },
  init(state) {
    if (process.client && localStorage) {
      state.items = localStorage.getItem('favorite')
        ? JSON.parse(localStorage.getItem('favorite'))
        : []
    }
  }
}

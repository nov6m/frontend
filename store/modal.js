export const state = () => ({
  modal: {
    active: {
      status: false,
      name: '',
      text: '',
      title: '',
      subtitle: '',
      buttonText: '',
      code: '',
      vacancy: '',
      parking: {},
      params: {}
    }
  }
})

export const mutations = {
  changeModal(state, obj) {
    state.modal.active.status = true
    state.modal.active.name = obj.name || 'default'
    state.modal.active.text = obj.text
    state.modal.active.title = obj.title
    state.modal.active.subtitle = obj.subtitle
    state.modal.active.buttonText = obj.buttonText
    state.modal.active.code = obj.code
    state.modal.active.vacancy = obj.vacancy
    state.modal.active.parking = obj.parking
    state.modal.active.params = obj.params
  },
  defaultModal(state) {
    state.modal.active.status = false
    state.modal.active.name = ''
    state.modal.active.title = ''
    state.modal.active.subtitle = ''
    state.modal.active.text = ''
    state.modal.active.code = ''
    state.modal.active.vacancy = ''
    state.modal.active.parking = {}
    state.modal.active.params = {}
    state.modal.active.buttonText = 'Отправить заявку'
  }
}

export const getters = {
  getModal(state) {
    return state.modal
  }
}

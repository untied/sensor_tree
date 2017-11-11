
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authorized: false, // признак авторизации
    xml_data: null // XML-данные устройства
  },
  mutations: {
    authorize: state => {
      state.authorized = true
    },
    unauthorize: state => {
      state.authorized = false
    },
    set_xml_data: (state, data) => {
      state.xml_data = data
    }
  },
  getters: {
    is_authorized: state => {
      return state.authorized
    },
    xml_data: state => {
      return state.xml_data
    }
  }
})

export default store

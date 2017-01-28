import Vue from 'vue'
import Vuex from 'vuex'

import DataService from './DataService'
import Storage from './Storage'
Vue.use(Vuex)

export default new Vuex.Store({
    state: Storage.state,
    mutations: Storage.mutations,
  actions: DataService
})

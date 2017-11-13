import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './action'
import mutations from './mutation'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  actions,
  mutations,
  state
})

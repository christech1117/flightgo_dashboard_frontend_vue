import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import socket from './modules/socket'
import user from './modules/user'
 Vue.use(Vuex)
 const store = new Vuex.Store({
  modules: {
    socket,
    user
  },
  getters
})
 
export default store
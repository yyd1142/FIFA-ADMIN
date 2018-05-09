/**
 * Created by dee on 2018/5/9.
 */
import Vuex from 'vuex'

const state = {
  user: null
}

const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  }
}

const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}

const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    getters
  })
}

export default createStore

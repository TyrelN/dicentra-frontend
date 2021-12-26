import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import state from './module/state'


export default createStore({
  state:{
    token: '',
    isAuthenticated: false,
    loading: false,
  },
  mutations:{
    initializeStore(state){
      if(localStorage.getItem('token')){
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      }else{
        state.token = ''
        state.isAuthenticated = false
      }
  },
  setToken(state, token){
    state.token = token
    state.isAuthenticated = true
  },
  removeToken(state){
    state.token = ''
    state.isAuthenticated = false
  },
  setLoading(state, flag){
    state.loading = flag
  },
  },
  getters:{
    isAuthenticated: state => state.isAuthenticated,
    token: state => state.token,
    loading: state => state.loading,
  }
})

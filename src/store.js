import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {firebaseMutations} from 'vuexfire'
var VuexFire = require('vuexfire')

const mappy = {
  strict: false,
  state: {
    map: null,
    features: []
  },
  mutations: {
    ...firebaseMutations,    
    
    setMap: function(state, map){
      state.map = map
    },

  },
  getters: {
    features: state => state.features,
    map: state => state.map,

  },
  actions: {
      setDataRef: VuexFire.firebaseAction(({ bindFirebaseRef }, ref) => {
        return new Promise((resolve, reject) => {
          bindFirebaseRef('features', ref, {readyCallback: function(){        
            resolve()
          }})
        })      
      })
  }
}

export default new Vuex.Store({
  modules: { mappy }
})
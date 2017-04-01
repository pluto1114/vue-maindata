import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import {api} from './api'
import _ from 'lodash'

var querystring = require('querystring');
var remote=true;

Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

Vue.use(Vuex)
const moduleA = {
  state: {mm:"I'm a mm"},
  mutations: {},
  actions: {},
  getters: {}
}

const main = {
  state: {
  },
  mutations: {
  },
  actions: {
    main_map(context,payload){
      let mock={};
      return remote?api('/api/main/map'):Promise.resolve(mock);
    },
    main_treemap(context,payload){
      let mock={};
      return remote?api('/api/main/treemap'):Promise.resolve(mock);
    },
    main_projectPie(context,payload){
      let mock={};
      return remote?api('/api/main/projectPie'):Promise.resolve(mock);
    }
  }
}

const store = new Vuex.Store({
  modules: {
    moduleA,
    main
  }
})

export default store
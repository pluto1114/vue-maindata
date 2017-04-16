import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import {api} from './api'

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
      return remote?api('/api/storeGoods/map'):Promise.resolve(mock);
    },
    main_buyGoods(context,payload){
      let mock={};
      return remote?api('/api/buyGoods/year/2016'):Promise.resolve(mock);
    },
    main_goodsType(context,payload){
      let mock={};
      return remote?api('/api/goodsType/storeGoods'):Promise.resolve(mock);
    },
    main_orderInfo(context,payload){
      let mock={};
      return remote?api('/api/orderInfo'):Promise.resolve(mock);
    }
  }
}
const city = {
  state: {
  },
  mutations: {
  },
  actions: {
    
    city_buyGoods(context,payload){
      let mock={};
      return remote?api('/api/city/buyGoods/3'):Promise.resolve(mock);
    }
  }
}

const store = new Vuex.Store({
  modules: {
    moduleA,
    main,
    city
  }
})

export default store
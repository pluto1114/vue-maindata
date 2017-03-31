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

const onstore = {
  state: {
  },
  mutations: {
  },
  actions: {
    storeGoodsChart_map(context,payload){
      let mock={};
      return remote?api('/api/storeGoodsChart/map',{params:payload}):Promise.resolve(mock);
    },
    storeGoodsChart_goodstype(context){
      let mock={};
      return remote?api('/api/storeGoodsChart/goodstype'):Promise.resolve(mock);
    },
    storeGoodsChart_items(context,payload){
      let mock={};
      return remote?api('/api/storeGoodsChart/items',{params:payload}):Promise.resolve(mock);
    },
    buyGoodsChart_year(context,payload){
      let mock={}
      return remote?api('/api/buyGoodsChart/year',{params:payload}):Promise.resolve(mock);
    },
    buyGoodsChart_month(context,payload){
      let mock={}
      return remote?api('/api/buyGoodsChart/month',{params:payload}):Promise.resolve(mock);
    },
    buyGoodsChart_day(context,payload){
      let mock={}
      return remote?api('/api/buyGoodsChart/day',{params:payload}):Promise.resolve(mock);
    },
    buyGoodsChart_goodstype(context,payload){
      let mock={}
      return remote?api('/api/buyGoodsChart/goodstype',{params:payload}):Promise.resolve(mock);
    },
    buyGoodsChart_items(context,payload){
      let mock={}
      return remote?api('/api/buyGoodsChart/items',{params:payload}):Promise.resolve(mock);
    }
  }
}

const store = new Vuex.Store({
  modules: {
    moduleA,
    onstore
  }
})

export default store
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import {api,$api} from './api'

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
    login(context,payload){
      return Vue.http.post('/api/login',payload)
    },
    main_map(context,payload){
      let mock={};
      return remote?api('/api/indexInfo/map'):Promise.resolve(mock);
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
      return remote?api('/api/indexInfo/indexShow'):Promise.resolve(mock);
    }
  }
}
const city = {
  state: {},
  mutations: {},
  actions: {
    city_index(context,payload){
      let mock={};
      return remote?api('/api/city/index/'+payload.comp_id):Promise.resolve(mock);
    },
    city_buyGoods(context,payload){
      let mock={};
      return remote?api(`/api/city/buyGoods/${payload.comp_id}---${payload.year}`):Promise.resolve(mock);
    }
  }
}
const myStore = {
  state: {
    comp_id:1
  },
  mutations: {
    setCompId(state, n){
      state.comp_id=n;
    }
  },
  actions: {
    store_index(context,payload){
      let mock={};
      return remote?api(`/api/store/index`):Promise.resolve(mock);
    },
    store_index_goodstype(context,payload){
      let mock={};
      return remote?api(`/api/store/index/goodstypeOrderBy`):Promise.resolve(mock);
    },
    store_index_logic(context,payload){
      let mock={};
      return remote?api(`/api/store/index/logicStore`):Promise.resolve(mock);
    },
    store_index_compareHis(context,payload){
      let mock={};
      return remote?api(`/api/store/index/compareHis/${payload.comp_id}`):Promise.resolve(mock);
    },
    store_city_index(context,payload){
      let mock={};
      return remote?api(`/api/store/city/index/${payload.comp_id}`):Promise.resolve(mock);
    },
    store_city_index_logicStore(context,payload){
      let mock={};
      return remote?api(`/api/store/city/index/logicStore/${payload.comp_id}`):Promise.resolve(mock);
    },
    store_city_index_goodstype(context,payload){
      let mock={};
      return remote?api(`/api/store/city/index/goodstype/${payload.comp_id}`):Promise.resolve(mock);
    },
    store_city_index_storegoods(context,payload){
      let mock={};
      return remote?api(`/api/store/city/index/storegoods`,{params:payload}):Promise.resolve(mock);
    },
  }
}
const resource = {
  state: {},
  mutations: {},
  actions: {
    resource_status_pro(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getinfolist&type1=1&source=${payload.source}`):Promise.resolve(mock);
    },
    terminal_index(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getTerminalCount`):Promise.resolve(mock);
    },
    terminal_index_comp(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getTerminalCountByLocal&comp_id=${payload.comp_id}`):Promise.resolve(mock);
    }
  }
}
const trace = {
  state: {},
  mutations: {},
  actions: {
    trace_index(context,payload){
      let mock={};
      return remote?api(`/api/trace/buyOrders/${payload.comp_id}`):Promise.resolve(mock);
    },
    trace_buyGoods(context,payload){
      let mock={};
      return remote?api(`/api/trace/buyOrders/buyGoods/${payload.comp_id}`,{params:{year:payload.year,month:payload.month}}):Promise.resolve(mock);
    },
    trace_buyGoodsInfo(context,payload){
      let mock={};
      return remote?api(`/api/trace/buyOrders/traceInfo/${payload.id}`):Promise.resolve(mock);
    }
  }
}
const storeMap = {
  state: {},
  mutations: {},
  actions: {
    store_map_index(context,payload){
      let mock={};
      return remote?api(`/api/storeMap`):Promise.resolve(mock);
    }
  }
}
const store = new Vuex.Store({
  modules: {
    moduleA,
    main,
    city,
    myStore,
    resource,
    trace,
    storeMap
  }
})

export default store
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
    user_info(context,payload){
      let mock={};
      return remote?api('/api/indexInfo/userInfo'):Promise.resolve(mock);
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
    city_index_resource(context,payload){
      let mock={};
      if (payload.source=='DT') {
        return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getLocalinfolistDt&type1=4&source=${payload.source}&comp_id=${payload.comp_id}`):Promise.resolve(mock);
      }else{
        return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getLocalinfolistZxXdl&type1=4&source=${payload.source}&comp_id=${payload.comp_id}`):Promise.resolve(mock);
      }
      
    }
  }
}
const myStore = {
  state: {
    comp_id:1
  },
  mutations: {
    setCompId(state, n){
      console.log("myStore")
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
    store_index_age(context,payload){
      let mock={};
      return remote?api(`/api/store/index/age`):Promise.resolve(mock);
    },
    store_index_compareHis(context,payload){
      let mock={};
      return remote?api(`/api/store/index/compareHis/${payload.comp_id}`):Promise.resolve(mock);
    },
    store_index_in_amount(context,payload){
      let mock={};
      return remote?api(`/api/store/index/curMonthInAmount/${payload.comp_id}`):Promise.resolve(mock);
    },
    store_index_out_amount(context,payload){
      let mock={};
      return remote?api(`/api/store/index/curMonthOutAmount/${payload.comp_id}`):Promise.resolve(mock);
    },
    store_index_l2_info(context,payload){
      let mock={};
      return remote?api(`/api/store/index/l2Info`):Promise.resolve(mock);
    },
    store_city_index(context,payload){
      let mock={};
      return remote?api(`/api/store/city/index/${payload.comp_id}`):Promise.resolve(mock);
    },
    store_city_index_logicStore(context,payload){
      let mock={};
      return remote?api(`/api/store/city/index/logicStore`,{params:payload}):Promise.resolve(mock);
    },
    store_city_index_goodstype(context,payload){
      let mock={};
      return remote?api(`/api/store/city/index/goodstype/${payload.comp_id}`):Promise.resolve(mock);
    },
    store_city_index_storegoods(context,payload){
      let mock={};
      return remote?api(`/api/store/city/index/storegoods`,{params:payload}):Promise.resolve(mock);
    },
    store_county_index(context,payload){
      let mock={};
      return remote?api(`/api/store/county/index/${payload.dept_code}`):Promise.resolve(mock);
    },
    store_county_index_logicStore(context,payload){
      let mock={};
      return remote?api(`/api/store/county/index/logicStore`,{params:payload}):Promise.resolve(mock);
    },
    store_county_index_goodstype(context,payload){
      let mock={};
      return remote?api(`/api/store/county/index/goodstype/${payload.dept_code}`):Promise.resolve(mock);
    },
    store_county_index_storegoods(context,payload){
      let mock={};
      return remote?api(`/api/store/county/index/storegoods`,{params:payload}):Promise.resolve(mock);
    },
  }
}
const project = {
  state: {
    comp_id:11,
    storecomp_code:null,
    status:null,
    year:null,
    project_code:null,
    linked:false,
    project_status_list_data:null
  },
  mutations: {
    setProCompId(state, n){
      state.comp_id=n;
    },
    setProStoreCompCode(state, n){
      state.storecomp_code=n;
    },
    setProStatus(state, n){
      state.status=n;
    },
    setProYear(state, n){
      state.year=n;
    },
    setProProjectCode(state, n){
      state.project_code=n;
    },
    setProLinked(state, n){
      state.linked=n;
    },
    setProStatusListData(state,n){
      state.project_status_list_data=n
    }
  },
  actions: {
    project_comp_list(context,payload){
      let mock={};
      return remote?api(`/api/project/index`):Promise.resolve(mock);
    },
    project_status_list(context,payload){
      let data=context.state.project_status_list_data;
      console.log("data",data)
      return data==null?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpProjectSum`,{params:payload}):Promise.resolve(data);
    },
    project_erp_list(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpProjectList`,{params:payload}):Promise.resolve(mock);
    },
    project_erp_one(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpProject`,{params:payload}):Promise.resolve(mock);
    },
    project_info_index(context,payload){
      let mock={};
      return remote?api(`/api/project/one`,{params:{comp_id:context.state.comp_id,project_code:context.state.project_code}}):Promise.resolve(mock);
    },
    project_info_buy(context,payload){
      let mock={};
      return remote?api(`/api/project/one/buy`,{params:payload}):Promise.resolve(mock);
    },
    project_info_buylist(context,payload){
      let mock={};
      return remote?api(`/api/project/one/buylist`,{params:payload}):Promise.resolve(mock);
    },
    project_info_out(context,payload){
      let mock={};
      return remote?api(`/api/project/one/out`,{params:payload}):Promise.resolve(mock);
    },
    project_info_outlist(context,payload){
      let mock={};
      return remote?api(`/api/project/one/outlist`,{params:payload}):Promise.resolve(mock);
    },
    project_asset_outlist(context,payload){
      let mock={};
      return remote?api(`/api/project/one/outlistForAsset`,{params:payload}):Promise.resolve(mock);
    },
    project_asset_erplist(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpOut`,{params:payload}):Promise.resolve(mock);
    },
    project_asset_assetlist(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpAsset`,{params:payload}):Promise.resolve(mock);
    },
    project_asset_outlist_ext(context,payload){
      let mock={};
      return remote?api(`/api/project/one/outlistForAsset`,{params:payload}):Promise.resolve(mock);
    },
    project_asset_erplist_ext_1(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpReturn`,{params:payload}):Promise.resolve(mock);
    },
    project_asset_erplist_ext_2(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpAdjustOut`,{params:payload}):Promise.resolve(mock);
    },
    project_asset_erplist_ext_3(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpAdjustIn`,{params:payload}):Promise.resolve(mock);
    },
    project_asset_erplist_ext_4(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpWorkCostGoods`,{params:payload}):Promise.resolve(mock);
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
    resource_status_pro_detail(context,payload){
      let mock={};
      if (payload.source=='DT') {
        return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getSourceListDt&code1=${payload.code1}&code2=${payload.code2}&source=${payload.source}`):Promise.resolve(mock);
      }else{
        return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getSourceList&code1=${payload.code1}&code2=${payload.code2}&code3=${payload.code3}&source=${payload.source}`):Promise.resolve(mock);
      }
      
    },
    terminal_index(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getTerminalCount`):Promise.resolve(mock);
    },
    terminal_index_comp(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getTerminalCountByLocal&comp_id=${payload.comp_id}`):Promise.resolve(mock);
    },
    terminal_index_detail(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getTerminalList&kc_id=${payload.kc_id}`):Promise.resolve(mock);
    }
  }
}
const operation = {
  state: {},
  mutations: {},
  actions: {
    operation_erp_index(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getDtMaterialSum`):Promise.resolve(mock);
    },
    operation_erp_detail(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getDtMaterialList`,{params:payload}):Promise.resolve(mock);
    },
   
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
      return remote?api(`/api/trace/buyOrders/buyGoods/${payload.comp_id}`,{params:payload}):Promise.resolve(mock);
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
const shop = {
  state: {},
  mutations: {},
  actions: {
    shop_index_storegoods(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockSum`):Promise.resolve(mock);
    },
    shop_index_buy(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderSum`):Promise.resolve(mock);
    },
    shop_index_in(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStorageSum`):Promise.resolve(mock);
    },
    shop_index_out(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallDeliverySum`):Promise.resolve(mock);
    },
    shop_city_index_storegoods(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockList`,{params:payload}):Promise.resolve(mock);
    },
    shop_city_index_buy(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderList`,{params:payload}):Promise.resolve(mock);
    },
    shop_city_index_in(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStorageList`,{params:payload}):Promise.resolve(mock);
    },
    shop_city_index_out(context,payload){
      let mock={};
      return remote?$api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallDeliveryList`,{params:payload}):Promise.resolve(mock);
    },

  }
}
const store = new Vuex.Store({
  modules: {
    moduleA,
    main,
    city,
    myStore,
    project,
    resource,
    operation,
    trace,
    storeMap,
    shop
  }
})

export default store
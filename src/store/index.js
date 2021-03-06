import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import { api, $api } from './api'

var querystring = require('querystring');
var remote = true;

Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

Vue.use(Vuex)
const moduleA = {
  state: { mm: "I'm a mm" },
  mutations: {},
  actions: {},
  getters: {}
}

const main = {
  state: {
    dark: false,
  },
  mutations: {
    setDark(state, n) {
      state.dark = n
    }
  },
  actions: {
    login(context, payload) {
      return Vue.http.post('/api/login', payload)
    },
    user_info(context, payload) {
      let mock = {};
      return remote ? api('/api/indexInfo/userInfo') : Promise.resolve(mock);
    },
    main_map(context, payload) {
      let mock = {};
      return remote ? api('/api/indexInfo/map') : Promise.resolve(mock);
    },
    main_buyGoods(context, payload) {
      let mock = {};
      return remote ? api('/api/buyGoods/year/2016') : Promise.resolve(mock);
    },
    main_goodsType(context, payload) {
      let mock = {};
      return remote ? api('/api/goodsType/storeGoods') : Promise.resolve(mock);
    },
    main_orderInfo(context, payload) {
      let mock = {};
      return remote ? api('/api/indexInfo/indexShow') : Promise.resolve(mock);
    }
  }
}
const city = {
  state: {},
  mutations: {},
  actions: {
    city_index(context, payload) {
      let mock = {};
      return remote ? api('/api/city/index/' + payload.comp_id) : Promise.resolve(mock);
    },
    city_index_shop_stock(context, payload) {
      let mock = {};
      return remote ? $api('http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockSumChild', { params: payload }) : Promise.resolve(mock);
    },
    city_index_shop_op(context, payload) {
      let mock = {};
      return remote ? $api('http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockSumYWChild', { params: payload }) : Promise.resolve(mock);
    },
    city_index_shop_market(context, payload) {
      let mock = {};
      return remote ? $api('http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockSumYXChild', { params: payload }) : Promise.resolve(mock);
    },
    city_index_shop_stock_dtl(context, payload) {
      let mock = {};
      return remote ? $api('http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockSumChildList', { params: payload }) : Promise.resolve(mock);
    },
    city_index_shop_op_dtl(context, payload) {
      let mock = {};
      return remote ? $api('http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockSumYWChildList', { params: payload }) : Promise.resolve(mock);
    },
    city_index_shop_market_dtl(context, payload) {
      let mock = {};
      return remote ? $api('http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockSumYXChildList', { params: payload }) : Promise.resolve(mock);
    },
    city_index_resource(context, payload) {
      let mock = {};
      if (payload.source == 'DT') {
        return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getLocalinfolistDt&type1=4`, { params: payload }) : Promise.resolve(mock);
      } else {
        return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getLocalinfolistZxXdl&type1=4`, { params: payload }) : Promise.resolve(mock);
      }
    },
    city_index_resource_detail(context, payload) {
      let mock = {};
      if (payload.source == 'DT') {
        return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getLocalSourceListDt`, { params: payload }) : Promise.resolve(mock);
      } else {
        return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getLocalSourceListZxXdl`, { params: payload }) : Promise.resolve(mock);
      }

    },
  }
}
const myStore = {
  state: {
    comp_id: 1
  },
  mutations: {
    setCompId(state, n) {
      console.log("myStore")
      state.comp_id = n;
    }
  },
  actions: {
    store_index(context, payload) {
      return api(`/api/store/index`);
    },
    store_index_search(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/search`,{params:payload}) : Promise.resolve(mock);
    },
    store_index_all(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/all`) : Promise.resolve(mock);
    },
    store_index_new_age(context, payload) {
      return api(`/api/store/index/newAge`);
    },
    store_index_free(context, payload) {
      return api(`/api/store/index/free`);
    },
    store_index_free_detail(context, payload) {
      return api(`/api/store/index/freeDetail`, { params: payload });
    },
    store_index_goodstype(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/goodstypeOrderBy`) : Promise.resolve(mock);
    },
    store_index_logic(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/logicStore`) : Promise.resolve(mock);
    },
    store_index_age(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/age`) : Promise.resolve(mock);
    },
    store_index_age_detail(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/ageDetail`, { params: payload }) : Promise.resolve(mock);
    },
    store_index_compareHis(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/compareHis/${payload.comp_id}`) : Promise.resolve(mock);
    },
    store_index_in_amount(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/curMonthInAmount/${payload.comp_id}`) : Promise.resolve(mock);
    },
    store_index_in_detail(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/curMonthInDetail`, { params: payload }) : Promise.resolve(mock);
    },
    store_index_out_amount(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/curMonthOutAmount/${payload.comp_id}`) : Promise.resolve(mock);
    },
    store_index_out_detail(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/curMonthOutDetail`, { params: payload }) : Promise.resolve(mock);
    },
    store_index_l2_info(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/index/l2Info`) : Promise.resolve(mock);
    },
    store_city_index(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/city/index/${payload.comp_id}`) : Promise.resolve(mock);
    },
    store_city_index_logicStore(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/city/index/logicStore`, { params: payload }) : Promise.resolve(mock);
    },
    store_city_index_goodstype(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/city/index/goodstype/${payload.comp_id}`) : Promise.resolve(mock);
    },
    store_city_index_storegoods(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/city/index/storegoods`, { params: payload }) : Promise.resolve(mock);
    },
    store_city_index_l2(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/city/index/l2List`, { params: payload }) : Promise.resolve(mock);
    },
    store_county_index(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/county/index/${payload.dept_code}`) : Promise.resolve(mock);
    },
    store_county_index_logicStore(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/county/index/logicStore`, { params: payload }) : Promise.resolve(mock);
    },
    store_county_index_goodstype(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/county/index/goodstype/${payload.dept_code}`) : Promise.resolve(mock);
    },
    store_county_index_storegoods(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/county/index/storegoods`, { params: payload }) : Promise.resolve(mock);
    },
    store_his_index_storegoods(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/his/index/storegoods`, { params: payload }) : Promise.resolve(mock);
    },
    store_city_ingoods(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/city/ingoods/${payload.comp_id}`) : Promise.resolve(mock);
    },
    store_city_ingoods_detail(context, payload) {
      let mock = {};
      return remote ? api(`/api/store/city/ingoods/dtlgoods`,{params:payload}) : Promise.resolve(mock);
    },
    
  }
}
const project = {
  state: {
    comp_id: 11,
    storecomp_code: null,
    status: null,
    year: null,
    project_code: null,
    linked: false,
    project_status_list_data: null,
    searchState:false,
    searchText:'',
  },
  mutations: {
    setProCompId(state, n) {
      state.comp_id = n;
    },
    setProStoreCompCode(state, n) {
      state.storecomp_code = n;
    },
    setProStatus(state, n) {
      state.status = n;
    },
    setProYear(state, n) {
      state.year = n;
    },
    setProProjectCode(state, n) {
      state.project_code = n;
    },
    setProLinked(state, n) {
      state.linked = n;
    },
    setProStatusListData(state, n) {
      state.project_status_list_data = n
    },
    setProSearchState(state, n) {
      state.searchState = n;
    },
    setProSearchText(state, n) {
      state.searchText = n;
    },
  },
  actions: {
    project_comp_list(context, payload) {
      let mock = {};
      return remote ? api(`/api/project/index`) : Promise.resolve(mock);
    },
    project_status_list(context, payload) {
      let data = context.state.project_status_list_data;
      console.log("data", data)
      return data == null ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpProjectSum`, { params: payload }) : Promise.resolve(data);
    },
    project_unfinish_year_list(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpProjectApproved`) : Promise.resolve(mock);
    },
    project_unfinish_year_one(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpProjectApprovedList&year=${payload.year}`) : Promise.resolve(mock);
    },
    project_erp_list(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpProjectList`, { params: payload }) : Promise.resolve(mock);
    },
    project_erp_search(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpProjectListByQuery`, { params: payload }) : Promise.resolve(mock);
    },
    project_erp_one(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpProject`, { params: payload }) : Promise.resolve(mock);
    },
    project_erp_one_audit(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getAuditProject`, { params: payload }) : Promise.resolve(mock);
    },
    project_erp_one_audit_detail(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getAuditDetailProject`, { params: payload }) : Promise.resolve(mock);
    },
    project_info_index(context, payload) {
      let mock = {};
      return remote ? api(`/api/project/one`, { params: { comp_id: context.state.comp_id, project_code: context.state.project_code } }) : Promise.resolve(mock);
    },
    
    project_info_buy(context, payload) {
      let mock = {};
      return remote ? api(`/api/project/one/buy`, { params: payload }) : Promise.resolve(mock);
    },
    project_info_buylist(context, payload) {
      let mock = {};
      return remote ? api(`/api/project/one/buylist`, { params: payload }) : Promise.resolve(mock);
    },
    project_info_buy_direct(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpOrderSumByProject`, { params: payload }) : Promise.resolve(mock);
    },
    project_info_buylist_direct(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpOrderlistByProject`, { params: payload }) : Promise.resolve(mock);
    },
    project_info_out_erp(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpOutBigType`, { params: payload }) : Promise.resolve(mock);
    },
    project_info_outlist_erp(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpOutBigTypeList`, { params: payload }) : Promise.resolve(mock);
    },
    project_info_out(context, payload) {
      let mock = {};
      return remote ? api(`/api/project/one/out`, { params: payload }) : Promise.resolve(mock);
    },
    project_info_outlist(context, payload) {
      let mock = {};
      return remote ? api(`/api/project/one/outlist`, { params: payload }) : Promise.resolve(mock);
    },
    project_asset_outlist(context, payload) {
      let mock = {};
      return remote ? api(`/api/project/asset/outlist`, { params: payload }) : Promise.resolve(mock);
    },
    project_asset_erplist(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpOut`, { params: payload }) : Promise.resolve(mock);
    },
    project_asset_assetlist(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpAsset`, { params: payload }) : Promise.resolve(mock);
    },
    project_asset_resclist(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getThreeSourceByPro`, { params: payload }) : Promise.resolve(mock);
    },
    
    project_asset_erplist_ext_1(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpReturn`, { params: payload }) : Promise.resolve(mock);
    },
    project_asset_erplist_ext_2(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpAdjustOut`, { params: payload }) : Promise.resolve(mock);
    },
    project_asset_erplist_ext_3(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpAdjustIn`, { params: payload }) : Promise.resolve(mock);
    },
    project_asset_erplist_ext_4(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getErpWorkCostGoods`, { params: payload }) : Promise.resolve(mock);
    },

  }
}
const resource = {
  state: {},
  mutations: {},
  actions: {
    resource_status_pro(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getinfolist&type1=1&source=${payload.source}`) : Promise.resolve(mock);
    },
    resource_status_pro_detail(context, payload) {
      let mock = {};
      if (payload.source == 'DT') {
        return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getSourceListDt`, { params: payload }) : Promise.resolve(mock);
      } else {
        return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getSourceList`, { params: payload }) : Promise.resolve(mock);
      }

    },
    terminal_index(context, payload) {
      let mock = {};
      
      if (payload&&payload.type&&payload.type == 'on') {
        return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getGWOnlineSum`) : Promise.resolve(mock);
      } else {
        return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getGWSum`) : Promise.resolve(mock);
      }
    },
    terminal_index_search(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getGWQueryBySn&sn=${payload.sn}`) : Promise.resolve(mock);
    },
    terminal_index_search_by_date(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getGWBuySumByDate&begindate=${payload.begindate}&enddate=${payload.enddate}`) : Promise.resolve(mock);
    },
    terminal_index_search_by_date_and_organ(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getGWBuySumStateByDate&begindate=${payload.begindate}&enddate=${payload.enddate}&organ_code=${payload.organ_code}`) : Promise.resolve(mock);
    },
    terminal_index_orgs(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getGWStoreBylocal`,{params:payload}) : Promise.resolve(mock);
    },
    terminal_index_orgs_detail(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getGWListByStore`,{params:payload}) : Promise.resolve(mock);
    }
  }
}
const operation = {
  state: {},
  mutations: {},
  actions: {
    operation_erp_index(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getDtMaterialSum`) : Promise.resolve(mock);
    },
    operation_shop_index(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockSumYW`) : Promise.resolve(mock);
    },
    operation_erp_detail(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getDtMaterialList`, { params: payload }) : Promise.resolve(mock);
    },
    operation_shop_detail(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockListYW`, { params: payload }) : Promise.resolve(mock);
    },
    operation_shop_year(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderSumYWYear`) : Promise.resolve(mock);
    },
    operation_shop_month(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderSumYWMonth`) : Promise.resolve(mock);
    },
    operation_shop_month_detail(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderListYWMonth`, { params: payload }) : Promise.resolve(mock);
    },
  }
}
const marketing = {
  state: {},
  mutations: {},
  actions: {
    marketing_index(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockSumYX`) : Promise.resolve(mock);
    },
    marketing_index_comp(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockListYX`, { params: payload }) : Promise.resolve(mock);
    },
    marketing_index_year(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderSumYXYear`) : Promise.resolve(mock);
    },
    marketing_index_month(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderSumYXMonth`) : Promise.resolve(mock);
    },
    marketing_index_month_detail(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderListYXMonth`, { params: payload }) : Promise.resolve(mock);
    },
  }
}

const trace = {
  state: {},
  mutations: {},
  actions: {
    trace_index(context, payload) {
      let mock = {};
      return remote ? api(`/api/trace/buyOrders/${payload.comp_id}`) : Promise.resolve(mock);
    },
    trace_buyGoods(context, payload) {
      let mock = {};
      return remote ? api(`/api/trace/buyOrders/buyGoods/${payload.comp_id}`, { params: payload }) : Promise.resolve(mock);
    },
    trace_buyGoodsInfo(context, payload) {
      let mock = {};
      return remote ? api(`/api/trace/buyOrders/traceInfo/${payload.id}`) : Promise.resolve(mock);
    },
    trace_storeGoodsInfo(context, payload) {
      let mock = {};
      return remote ? api(`/api/trace/storeGoods/traceInfo`, { params: payload }) : Promise.resolve(mock);
    },
    trace_storeGoodsInfo_buyOrder(context, payload) {
      let mock = {};
      return remote ? api(`/api/trace/storeGoods/traceBuyOrder`, { params: payload }) : Promise.resolve(mock);
    },
    trace_storeGoodsInfo_one(context, payload) {
      let mock = {};
      return remote ? api(`/api/trace/storeGoods/one`, { params: payload }) : Promise.resolve(mock);
    },
  }
}
const storeMap = {
  state: {
    map_index_info: null
  },
  mutations: {
    setMapIndexInfo(state, n) {
      state.map_index_info = n
    }
  },
  actions: {
    store_map_index(context, payload) {
      let mock = context.state.map_index_info;
      return mock == null ? api(`/api/storeMap`) : Promise.resolve(mock);
    },
    store_map_goodstype(context, payload) {
      let mock = {};
      return remote ? api(`/api/storeMap/goodstype`, { params: payload }) : Promise.resolve(mock);
    },
    store_map_baidumap(context, payload) {
      let mock = context.state.map_index_info;
      return remote ? api(`/api/storeMap/baidumap`) : Promise.resolve(mock);
    },
  }
}
const shop = {
  state: {},
  mutations: {},
  actions: {

    shop_index_buy(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderSum`) : Promise.resolve(mock);
    },
    shop_index_buy2(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderSumStore`) : Promise.resolve(mock);
    },

    shop_index_global(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallGlobeSum`) : Promise.resolve(mock);
    },
    shop_city_index_storegoods(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStockList`, { params: payload }) : Promise.resolve(mock);
    },
    shop_city_index_storegoods_buyorder(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getOrderByStock`, { params: payload }) : Promise.resolve(mock);
    },
    shop_city_index_buy(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderList`, { params: payload }) : Promise.resolve(mock);
    },
    shop_city_index_buy2(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallOrderListStore`, { params: payload }) : Promise.resolve(mock);
    },
    shop_city_index_in(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStorageList`, { params: payload }) : Promise.resolve(mock);
    },
    shop_city_index_out(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallDeliveryList`, { params: payload }) : Promise.resolve(mock);
    },
    shop_city_index_in_month(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallStorageListMonth`, { params: payload }) : Promise.resolve(mock);
    },
    shop_city_index_out_month(context, payload) {
      let mock = {};
      return remote ? $api(`http://10.68.26.80:8090/InterfaceData/interfacedataaction.do?action=getMallDeliveryListMonth`, { params: payload }) : Promise.resolve(mock);
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
    marketing,
    trace,
    storeMap,
    shop
  }
})

export default store
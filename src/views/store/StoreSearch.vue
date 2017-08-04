<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    <div class="container title">
      <div class="row">
        <h3>关键词 "{{key}}" 库存搜索结果</h3>
      </div>
    </div>
  
    <div class="container" v-if="gathergoods">
      <div class="row">
        <div class="col-sm-6 btn-ext">
          <Excel selector="#storeIndexSearchTable">
            <button class="btn blue">
              <span class="fa fa-download"></span>导出Excel</button>
          </Excel>
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <input type="search" class="form-control" placeholder="搜索" v-model="searchText">
          </div>
        </div>
      </div>
      <div class="row">
  
        <table id="storeIndexSearchTable" class="table" v-if="gathergoods.length">
          <thead>
            <tr>
              <th>#</th>
              <th>物资编号</th>
              <th>物资名称</th>
              <th>所属公司</th>
              <th>入库数量</th>
              <th>占用数量</th>
              <th>现存数量</th>
              <th>单位</th>
              <th>单价</th>
              <th>入库时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(y,index) of filterData" :key="y.id">
              <td>{{index+1}}</td>
              <td>{{y.goodstype_code}}</td>
              <td>{{y.goodstype_name}}</td>
              <td>{{y.comp_name}}</td>
              <td>{{y.in_count|money(1)}}</td>
              <td>{{y.ready_out_count|money(1)}}</td>
              <td>{{y.cur_count|money(1)}}</td>
              <td>{{y.unit}}</td>
              <td>{{y.single_price}}</td>
              <td>{{y.createtime|prettyDate}}</td>
              <td>
                <a @click="trace(y.qrcode_code)">追溯</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row" v-else>
          <h4>没有可匹配记录！</h4>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div class="row center-block">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>
    </div>
    <MyModal :option="modalOption" title="使用物资详情" small>
      <TraceInfo :qrcode="selqrcode" level=1></TraceInfo>
    </MyModal>
  </div>
</template>
<script>
import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
import MyModal from '@/components/MyModal'

import Excel from '@/components/Excel'
import TraceInfo from '@/components/TraceInfo'
export default {

  data() {
    return {
      menus: [],
      key: this.$route.params["key"] || 2,
      comp: null,

      gathergoods: null,

      searchText: "",

      modalOption: {},
      selqrcode: 0
    }
  },
  computed: {
    filterData() {
      return filterArr(this.gathergoods, this.searchText)
    }
  },
  watch: {

  },
  mounted() {
    this.init()
    console.log(this.key)

  },
  methods: {
    handleClickForSearch() {
      this.search()
    },
    init() {

      this.search()
    },
    search() {
      this.$store.dispatch("store_index_search", { key: this.key }).then((resp) => {
        this.gathergoods = resp.body.items
        setTimeout(() => {
          $("#storeIndexSearchTable").freezeHeader();
        }, 1000)
      })

    },
    trace(qrcode) {
      this.selqrcode = qrcode
      this.modalOption = { visable: true }
    }
  },
  components: {
    Chart, MyMenu, MyModal, Excel, TraceInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
a:hover,
a:focus {
  text-decoration: none;
  outline: none;
  border-bottom: none;
  padding-bottom: 0;
}

.title {
  position: relative;
  top: -2.4em;
}

[type='search'] {
  margin: 1em 0.5em;
}

.table {
  td {
    min-width: 4em;
    max-width: 10em;
  }
}

.unilineText {
  max-width: 40em;
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: nowrap;
}
</style>


<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    <div class="container title">
      <div class="row">
        <h3 v-if="comp">{{comp.name}}入库物资信息</h3>
      </div>
    </div>
    <div class="container">
      <div class="row" style="line-height:48px;">
        入库时间选择：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从
        <mu-date-picker hintText="开始日期" v-model="start_date" autoOk/>到
        <mu-date-picker hintText="结束日期" v-model="end_date" autoOk/>
        <mu-flat-button label="查看" backgroundColor="#03a9f4" color="#FFF" @click="handleClickForSearch" />
      </div>
    </div>
    <div class="container" v-if="gathergoods.length">
      <div class="row">
        <div class="col-sm-11">
          <div class="pull-left">
            <input type="search" class="form-control" placeholder="搜索" v-model="searchText">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-11">
          <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel panel-default" v-for="x of filterData" :key="x">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#'+x.code" class="box">
                    <div class="box-cell-1 box">
                      <div class="unilineText" v-html="x.name"></div>
                      <div>（{{x.left_count}}）</div>
                    </div>
                    <div>￥{{x.in_amount|money}}</div>
                  </a>
                </h4>
              </div>
              <div :id="x.code" class="panel-collapse collapse">
                <div class="panel-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>物资编号</th>
                        <!-- <th>物资名称</th> -->
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
                      <tr v-for="(y,index) of x.goods" :key="y.id">
                        <td>{{index+1}}</td>
                        <td>{{y.goodstype_code}}</td>
                        <!-- <td>{{x.goodstype_name}}</td> -->
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
                </div>
              </div>
            </div>
  
          </div>
        </div>
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

      comp_id: this.$route.params["comp_id"] || 2,
      comp: null,
      start_date: null,
      end_date: null,
      gathergoods: [],

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

  },
  methods: {
    handleClickForSearch() {
      this.search()
    },
    init() {
      this.$store.dispatch("store_city_ingoods", { comp_id: this.comp_id }).then((resp) => {
        this.comp = resp.body.itemMap.comp
      })
      var date_ = new Date()
      var year = date_.getYear() + 1900
      var month = date_.getMonth() + 1

      this.start_date = year + '-' + month + '-01'
      this.end_date = year + '-' + (month + 1) + '-01'
      this.search()
    },
    search() {
      this.$store.dispatch("store_city_ingoods_detail", { comp_id: this.comp_id, start_date: this.start_date, end_date: this.end_date }).then((resp) => {
        let groups = _.groupBy(resp.body.items, 'goodstype_code')
        this.gathergoods = _.map(groups, (val, key) => {
          return { code: key, name: val[0].goodstype_name, in_amount: _.sum(val, "in_amount"), left_count: _.sum(val, "cur_count"), goods: val }
        })
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


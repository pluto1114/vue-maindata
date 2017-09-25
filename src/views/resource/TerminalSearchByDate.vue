<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    <!-- <div class="container title">
            <div class="row">
              <h3>关键词 "{{key}}" 库存搜索结果</h3>
            </div>
          </div> -->

    <div class="container">
      <div class="row">

        <div class="col-sm-12">
          <div class="form-inline">
            <div class="form-group">
              <span class="ext">从</span>
              <mu-date-picker hintText="开始日期" v-model="startDate" autoOk/>
            </div>
            <div class="form-group">
              <span class="ext">到</span>
              <mu-date-picker hintText="截止日期" v-model="endDate" autoOk/>
            </div>
            <button class="btn btn-default btn-search" @click="handleClickForSearch">查询</button>
          </div>
        </div>
      </div>
      <div class="row">

        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>地区</th>
              <th>终端数量</th>
              <th style="text-align:center;width:5em;">分布情况</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(x,index) of gathergoods" :key="x.id">
              <td>{{index+1}}</td>
              <td>{{x.name}}</td>
              <td>{{x.value}}</td>
              <td align="center" class="chart">
                <Chart v-if="optionPies[index]" width="99%" height="150px" :option="optionPies[index]" theme="macarons" @chartClick="handlePieClick" loading></Chart>
              </td>

            </tr>
          </tbody>
        </table>

      </div>
    </div>

    <MyModal :option="modalOption" :title="organName" small>
      <ul v-if="stateInfo.length">
        <li v-for="x of stateInfo" :key="x.code" class="my-item">
          <span class="badge">{{x.value}}</span>{{x.name}}
        </li>

      </ul>
      <div v-else class="row center-block">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>
    </MyModal>
  </div>
</template>
<script>
import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
import MyModal from '@/components/MyModal'


export default {

  data() {
    return {
      menus: [],


      gathergoods: null,
      startDate: this.$route.params["startDate"],
      endDate: this.$route.params["endDate"] || formatDate(new Date),
      optionPies: [],
      organCode: '',
      organName: '',
      stateInfo: [],
      modalOption: {},

    }
  },
  computed: {

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
    handlePieClick(params) {
      console.log(params)
      this.organCode = params.data.code
      this.organName = params.data.name

      this.stateInfo = []
      this.modalOption = { visable: true }
      this.$store.dispatch("terminal_index_search_by_date_and_organ", { begindate: this.startDate, enddate: this.endDate, organ_code: this.organCode }).then((resp) => {
        this.stateInfo = resp.data
      })
    },
    init() {

      this.search()
    },
    search() {
      this.$store.dispatch("terminal_index_search_by_date", { begindate: this.startDate, enddate: this.endDate }).then((resp) => {
        this.gathergoods = resp.data
        this.gathergoods.forEach(function(element, i) {
          console.log(element)
          this.optionPies[i] = {
            title: {
              left: 'right'
            },
            tooltip: {},
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.4)'
              }
            },
            series: [
              {
                name: '终端分布',
                type: 'pie',
                radius: ['0', '55%'],
                data: element.list1
              }
            ]
          }
        }, this)

      })

    },

  },
  components: {
    Chart, MyMenu, MyModal
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

.btn-search {
  margin-top: -0.8em;
}

th,
td {
  min-width: 8em;
  vertical-align: middle;
}

td:not(.chart) {
  line-height: 150px;
}

td.chart {
  width: 30em;
}

.ext {
  margin-right: 2em;
}

.my-item {
  padding: 1em 0;
  margin: 0 2em;
  .badge {
    float: right;
  }
}
</style>


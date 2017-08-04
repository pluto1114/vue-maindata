<template>
  <div class="tarce-info">
    <div v-if="loading" class="row center-block">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    </div>
    <div v-else class="row">
      <div class="col-md-12">
        <div class="content">
          <article>
            <h4>
              <span v-html="info.goodstype_descp"></span> {{info.in_count}}{{info.unit}}（现存数量 {{info.cur_count}}）</h4>
            <br>
            <section>
              <span class="point-time point-red"></span>
              <time :datetime="info.createtime|prettyDate">
                <span>{{info.createtime|prettyDate}}</span>
                <span v-if="info.order_type!='normal'">{{info.order_type_descp}}</span>
                <span v-else-if="level==1">
                  <a @click="handleClickForNormal">{{info.order_type_descp}}</a>
                </span>
                <span v-else-if="level==1">
                  <a @click="handleClickForNormal">{{info.order_type_descp}}</a>
                </span>
                <span v-else>
                  迁移入库
                </span>
              </time>
              <aside>
                <p class="things"> {{info.createtime}} 通过{{info.order_type_descp}}入库
                  <strong>{{info.in_count}}</strong>{{info.unit}}</p>
                <p class="brief">
                  <span class="text-red">入库信息</span>
                </p>
              </aside>
            </section>
            <div v-for="y of info.requireInfo" :key="y.order_code">
              <section>
                <span class="point-time point-green"></span>
                <time :datetime="y.date">
                  <span>{{y.date}}</span>
                  <span>{{y.realname}}</span>
                </time>
                <aside>
                  <p class="things">{{y.realname}}在 {{y.createtime}} 提出需求
                    <strong>{{y.ready_out_count|fix(2)}}</strong>{{info.unit}}</p>
                  <p v-if="y.project_name" class="things ">项目名称：
                    <span class="my-link" @click="handleClickForPro(y.start_comp_id,y.project_code,y.storecomp_code)">{{y.project_name}}</span>
                  </p>
                  <p v-if="y.follow_comp_name" class="things">施工单位：{{y.follow_comp_name}}</p>
                  <p v-if="y.require_descp" class="things">需求描述：{{y.require_descp}}</p>
                  <p class="brief">
                    <span class="text-green">需求信息{{y.is_allocation?"（迁移）":""}}</span>
                  </p>
                </aside>
              </section>
              <section v-for="z of y.outInfo" :key="z.order_code">
                <span class="point-time point-blue"></span>
                <time :datetime="z.date">
                  <span>{{z.date}}</span>
                  <span>{{z.realname}}</span>
                </time>
                <aside>
                  <p class="things">{{z.realname}}在 {{z.createtime}} 发起出库单{{z.order_code}}</p>
                  <p class="things" v-if="z.order_status=='over'">{{z.storer}}在 {{z.endtime}} 扫码出库</p>
                  <p class="brief">
                    <span class="text-blue">物资出库</span>
                  </p>
                </aside>
              </section>
            </div>
  
          </article>
        </div>
      </div>
    </div>
  
    <MyModal :option="modalOption" title="采购单详情" small>
      <table class="table">
        <tr>
          <td class="td-label">
            <label>制单时间：</label>
          </td>
          <td class="td-content">{{buyOrder.createtime|prettyDate}}</td>
  
        </tr>
        <tr>
          <td class="td-label">
            <label>订单总金额：</label>
          </td>
          <td class="td-content">{{buyOrder.amount}}</td>
        </tr>
        <tr>
          <td class="td-label">
            <label>订单编号：</label>
          </td>
          <td class="td-content">{{buyOrder.buyorder_code}}</td>
        </tr>
        <tr>
          <td class="td-label">
            <label>ERP订单编号：</label>
          </td>
          <td class="td-content">{{buyOrder.erporder_code}}</td>
        </tr>
        <tr>
          <td class="td-label">
            <label>协议名称：</label>
          </td>
          <td class="td-content">{{buyOrder.protocol_name}}</td>
  
        </tr>
        <tr>
          <td class="td-label">
            <label>协议编号：</label>
          </td>
          <td class="td-content">{{buyOrder.protocol_code}}</td>
        </tr>
        <tr>
          <td class="td-label">
            <label>采购经理：</label>
          </td>
          <td class="td-content">{{buyOrder.buy_user}}</td>
        </tr>
        <tr>
          <td class="td-label">
            <label>描述：</label>
          </td>
          <td class="td-content" v-html="buyOrder.descp"></td>
        </tr>
  
      </table>
    </MyModal>
  
  </div>
</template>

<script>

import MyModal from '@/components/MyModal'
export default {
  name: 'traceInfo',
  props: {
    qrcode: {
      required: true
    },
    level: {
      required: true
    },
    myinfo: null
  },
  data() {
    return {
      info: {},
      loading: true,
      modalOption: {},
      buyOrder: {}
    }
  },
  watch: {
    'qrcode': 'fetch'
  },
  mounted() {
    console.log("myinfo", this.myinfo)
    if (this.myinfo != null) {
      this.loading = false
      this.info = this.myinfo
    }
  },
  methods: {
    handleClickForNormal() {
      if (this.level != 1) {
        return
      }
      this.buyOrder = {}
      this.modalOption = { visable: true }
      this.$store.dispatch("trace_storeGoodsInfo_buyOrder", { qrcode: this.qrcode }).then(resp => {
        this.buyOrder = resp.body.itemMap.buyOrder
      })
    },
    handleClickForPro(comp_id, project_code, storecomp_code) {
      this.$store.commit("setProCompId", comp_id)
      this.$store.commit("setProProjectCode", project_code)
      this.$store.commit("setProStoreCompCode", storecomp_code)
      this.$root.$emit("modalHideAll")
      this.$router.push("/project/one")
    },
    fetch() {
      if (this.myinfo == null) {
        this.loading = true
        this.$store.dispatch("trace_storeGoodsInfo", { qrcode: this.qrcode, level: this.level }).then(resp => {
          this.info = resp.body.itemMap.storeGoodsInfo
          this.loading = false
        })
      }

    },

  },
  components: {
    MyModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.p3 {
  border: 1px solid #d5d5d5;
  border-radius: 1em;
  padding: 1em;
  padding-top: 0;
  margin-bottom: 1.0em;
  >h4 {
    padding: 0.3em 1em 0.8em;
    border-bottom: 1px solid #dfdfdf;
  }
}

.content {
  max-height: 750px;
  overflow-y: scroll;
}

.table {
  label {
    min-width: 8em;
  }
}
</style>

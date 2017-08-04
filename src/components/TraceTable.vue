<template>
  <div class="tarce-info">
    <div v-if="loading" class="row center-block">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    </div>
    <div v-else class="row">
      <div class="col-md-12">
        <h5>
          <span v-html="info.goodstype_descp"></span> </h5>
          <h5>{{info.createtime|prettyDate}} 入库 {{info.in_count}}{{info.unit}}，当前 {{info.cur_count}}{{info.unit}}</h5>
        <div class="content">
          <table class="table">
            <caption>需求列表 <a @click="handleClickForShowD">（详情）</a></caption>
            <tr v-for="(x,index) of info.requireInfo" :key="x">
              <td>
                第{{index+1}}次
              </td>
              <td>【{{x.realname}}】{{x.date}}发起需求</td>
             
              <td>{{x.ready_out_count|fix(2)}}{{info.unit}}</td>
              <td>{{x.storer_already_out?"已出库":"未出"}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    
  </div>

  
</template>

<script>

import MyModal from '@/components/MyModal'
import TraceInfo from '@/components/TraceInfo'
export default {
  name: 'traceInfo',
  props: {
    qrcode: {
      required: true
    },
    level: {
      required: true
    },
  },
  data() {
    return {
      info: {},
      loading: true,
      modalOption: {},
    }
  },
  watch: {
    'qrcode': 'fetch'
  },
  mounted() {

  },
  methods: {
    handleClickForShowD(){
      console.log("emit showD")
      this.$emit("showD",this.qrcode)
    },
    handleClickForPro(n) {
      this.$store.commit("setProCompId", n.comp_id)
      this.$store.commit("setProProjectCode", n.project_code)
      this.$store.commit("setProStoreCompCode", n.storecomp_code)
      this.$root.$emit("modalHideAll")
      this.$router.push("/project/one")
    },
    fetch() {
      if (!this.qrcode) {
        return
      }
      this.loading = true
      this.$store.dispatch("trace_storeGoodsInfo", { qrcode: this.qrcode, level: this.level }).then(resp => {
        this.info = resp.body.itemMap.storeGoodsInfo
        this.loading = false
      })
    },

  },
  components: {
    MyModal,TraceInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
a{
  text-decoration: none;
}
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
  line-height: 2em;
}

.table {
  label {
    min-width: 8em;
  }
}
</style>

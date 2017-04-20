<template>
  <div class="index">
    <div class="menu">
        <div class="container">
            <div style="float:right;">
                <div v-for="x of menus" class="menu-item">
                    <router-link :to="x.to">{{x.name}}</router-link>
                </div>
            </div>
        </div>
    </div>
    

    <div class="container">
        <div v-if="inInfo.length==0" class="row">         
            <div class="col-md-12">
              <div class="alert alert-danger" role="alert">此物资目前未入库</div>
            </div>
        </div>
        <div v-else class="row">        	
            <div v-for="x of inInfo" class="col-md-6">
              <div class="content">
                <article>
                  <h4>{{x.goodstype_descp}}  {{x.recv_count}}{{x.unit}}</h4>
                  <br/>
                  <section>
                    <span class="point-time point-red"></span>
                    <time :datetime="x.date">
                      <span>{{x.date}}</span>
                      <span>{{x.realname}}</span>
                    </time>
                    <aside>
                      <p class="things">{{x.realname}}在 {{x.createtime}} 接收物资 {{x.recv_count}}{{x.unit}}</p>
                      <p class="brief"><span class="text-red">到货信息</span></p>
                    </aside>
                  </section>
                  <div v-for="y of x.requireInfo">
                    <section>
                      <span class="point-time point-green"></span>
                      <time :datetime="y.date">
                        <span>{{y.date}}</span>
                        <span>{{y.realname}}</span>
                      </time>
                      <aside>
                        <p class="things">{{y.realname}}在 {{y.createtime}} 提出需求 {{y.ready_out_count}}{{x.unit}}</p>
                        <p class="brief"><span class="text-green">需求信息</span></p>
                      </aside>
                    </section>
                    <section v-for="z of y.outInfo">
                      <span class="point-time point-blue"></span>
                      <time :datetime="z.date">
                        <span>{{z.date}}</span>
                        <span>{{z.realname}}</span>
                      </time>
                      <aside>
                        <p class="things">{{z.realname}}在 {{z.createtime}} 收到出库单</p>
                        <p class="things" v-if="z.order_status=='over'">{{z.realname}}在 {{z.endtime}} 扫码出库</p>
                        <p class="brief"><span class="text-blue">物资出库</span></p>
                      </aside>
                    </section>
                  </div>
                  
                  
                </article>
              </div>               
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>


export default {
  name:"traceTimeLine",
  data () {
    return {
        comp_id:this.$route.params["comp_id"],
        menus:[],
        buygoods_id:this.$route.params["buygoods_id"],
        inInfo:[],
        outInfo:{},
        requireInfo:{}
    }
    
  },
  mounted(){
    this.$store.dispatch("trace_buyGoodsInfo",{id:this.buygoods_id}).then(resp=>{
        this.inInfo=resp.body.itemMap.inInfo
        // this.outInfo=resp.body.itemMap.outInfo
        // this.requireInfo=resp.body.itemMap.requireInfo
        // if (this.requireInfo.length>0) {

        // }
    });

    
  },
  methods:{
  	handleClick(params){
        console.log(params)
    }
  },
  components:{
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 @import "../../assets/timeline.css";


</style>

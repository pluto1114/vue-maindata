<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    

    <div class="container">
        <div class="row">    	
            <div class="col-md-12">             
                <Chart width="100%" height="300px" :option="optionLine" theme='shine' @chartClick="handleChartClick" loading></Chart>
            </div>
            <div class="col-md-12">
                <div class="alert alert-info" role="alert">请点击采购单对应月份</div>
            
            </div>
        </div>
    </div>
    <div id="panels" class="container">
        <div v-for="x of buyorders" class="panel panel-default">
            <div class="panel-heading">{{x.buyorder_code}}<span style="margin-left:2em;">{{x.buy_user}}</span><span style="float:right;">{{x.importtime}}</span></div>
            <div class="panel-body">
                <div class="list-group">
                  <div v-for="y of x.buygoods" class="list-group-item" :key="y.id" @click="handleItemClick(y.id)">
                    <div class="row">
                        <div class="col-md-1">{{y.goodstype_code}}</div>
                        <div class="col-md-9">{{y.goodstype_descp}}</div>
                        <div class="col-md-2" style="text-align:right;">{{y.buy_count}}{{y.unit}}</div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">物资详情</h4>
          </div>
          <div class="modal-body">
         
            <div v-if="inInfo.length==0" class="row">         
                <div class="col-md-12">
                  <div class="alert alert-danger" role="alert">此物资目前未入库</div>
                </div>
            </div>
            <div v-else class="row">            
                <div v-for="x of inInfo" class="col-md-12">
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
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
export default {
  data () {
    return {
        comp_id:this.$route.params["comp_id"],
        menus:[],
        buyorders:[],
        year:'2017',
        month:'01',
        optionLine:{},
        inInfo:[]
    }
    
  },
  mounted(){

    this.$store.dispatch("trace_index",{comp_id:this.comp_id}).then((resp)=>{
        this.optionLine={
            title: {
                text: resp.body.message+'(万元)',
                left:'center'
            },
            tooltip: {},
            legend: {
                left:'left',
                data:['2015','2016','2017']
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : resp.body.itemMap.months
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series: [{
                name: '2015',
                type: 'line',
                data: resp.body.itemMap["2015"]
            },
            {
                name: '2016',
                type: 'line',
                data: resp.body.itemMap["2016"]
            },
            {
                name: '2017',
                type: 'line',
                data: resp.body.itemMap["2017"]
            }]
        }       
    });

    $('#myModal').on('hidden.bs.modal', e=>{
        this.inInfo=[]
    })
  },
  methods:{
  	handleChartClick(params){
        console.log(params)
       
        // this.$router.push({name:"TraceBuyGoods",params:{comp_id:this.comp_id},query:{year:params.seriesName,month:params.name}})
        this.year=params.seriesName
        this.month=params.name
        this.$store.dispatch("trace_buyGoods",{comp_id:this.comp_id,year:this.year,month:this.month}).then(resp=>{
            // console.log(resp.body.items)
            this.buyorders = resp.body.items;
        });
    },
    handleItemClick(id){
        this.$store.dispatch("trace_buyGoodsInfo",{id:id}).then(resp=>{
            this.inInfo=resp.body.itemMap.inInfo
            $('#myModal').modal()
            
        });
        
    }
  },
  components:{
  	Chart,MyMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../assets/timeline.css";


.table{
    td:not(:first-child),th:not(:first-child){
        text-align: right;
    }
}   


</style>

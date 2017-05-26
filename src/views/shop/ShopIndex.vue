<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    <div class="container">
    	<div class="row">
    		<div class="col-md-9">
                <Chart width="100%" height="600px" :option="optionBar1" theme='macarons' @chartClick="handleCityClick" loading></Chart>
            </div>
            <div class="col-md-3">
                <h4 class="">商城采购信息</h4>
                <div class="panel-group" id="accordion" role="tablist" v-if="buyInfos">
                  <div class="panel panel-default" v-for="x of buyInfos">
                    <div class="panel-heading" role="tab">
                      <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#'+x.code">
                            <span class="pull-right">{{x.value|money}}</span>{{x.name}}
                        </a>
                      </h4>
                    </div>
                    <div :id="x.code" class="panel-collapse collapse" role="tabpanel">
                      <div class="panel-body">
                        <ul class="list-group">
                          <li class="list-group-item" v-for="y of x.list1">
                          <span class="pull-right">{{y.value|money}}</span><a @click="handleBuyClick(x.code,y.code)">{{y.name}}</a>
                          </li>
                         
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                </div>
            </div>
    	</div>
    	<div class="row">
            <div class="col-md-12">
                <table class="table" v-if="cities && storeValues  && inValues && outValues">
                    <thead>
                        <tr>
                            <th>盟市</th>
                            <th>库存金额</th>
                     
                            <th>入库金额</th>
                            <th>出库金额</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x,index) of cities">
                            <td>{{x.name}}</td>
                            <td v-show="storeValues">{{storeValues[index]|money}}</td>
                       
                            <td v-show="inValues">{{inValues[index]|money}}</td>
                            <td v-show="outValues">{{outValues[index]|money}}</td>
                            <td ><a @click="handleTRClick(x)">详情</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>   
        </div>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="myModalBuy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">采购详情</h4>
          </div>
          <div class="modal-body content">
            <div style="height:430px;overflow-y:scroll;">
                      
                <table class="table">
                    <thead>
                        <tr>
                            <th>商品名称</th>
                            <th>项目编号</th>
                            <th>供应商名称</th>
                            <th>采购需求人</th>
                            <th>计量单位</th>
                            <th>购买数量</th>
                            <th>单价</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of buygoods">
                            <td><span v-html="x.comdity_name"></span></td>
                            <td>{{x.project_code}}</td>
                            <td>{{x.supplier_name}}</td>
                            <td>{{x.demand_name}}</td>
                            <td>{{x.units}}</td>
                            <td>{{x.buy_number}}</td>
                            <td>{{x.real_price}}</td>
                                                  
                        </tr>
                    </tbody>
                </table>
           
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
        menus:[],
        cities:null,
 		optionBar1:{},
        storeValues:null,
        buyInfos:null,
        inValues:null,
        outValues:null,
        buygoods:[]
    }
    
  },
  mounted(){

    this.$store.dispatch("shop_index_storegoods").then((resp)=>{
        this.cities=resp.data
        this.storeValues=_.pluck(resp.data,'value')
        this.optionBar1 = {
            title: {
                text: '商城当前库存'
            },
            tooltip: {},
            legend: {
                data:['库存']
            },
            xAxis: {
                data: _.map(resp.data,item=>item.name.substring(0,2))
            },
            yAxis: {},
            series: [{
                name: '库存',
                type: 'bar',
                data: _.pluck(resp.data,'value')
            }]
        };
    });

    this.$store.dispatch("shop_index_buy").then((resp)=>{
        this.buyInfos=resp.data
    });
    this.$store.dispatch("shop_index_in").then((resp)=>{
        this.inValues=_.pluck(resp.data,'value')
    });
    this.$store.dispatch("shop_index_out").then((resp)=>{
        this.outValues=_.pluck(resp.data,'value')
    });
    
  },
  methods:{
  	handleCityClick(params){
       
    },
    handleBuyClick(category_id,comp_id){
       $('#myModalBuy').modal()
        this.$store.dispatch("shop_city_index_buy",{category_id,comp_id}).then((resp)=>{
            this.buygoods=resp.data          
        });
    },
    handleTRClick(params){
       this.$router.push({name:'ShopCityIndex','params':{comp_id:params.code,category_id:0}})
    },

  },
  components:{
  	Chart,MyMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.modal{
    td{
        max-width:8em;
    }
}

    


</style>

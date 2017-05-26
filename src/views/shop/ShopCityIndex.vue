<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    <div class="container" v-if="comp">
        <div class="row">
            <h3>{{comp.name}}商城数据信息</h3>
        </div>
    </div>
    <div class="container">
    	<div>

          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">商城库存明细</a></li>
            <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">商城入库明细</a></li>
            <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">商城出库明细</a></li>
            <li role="presentation" v-if="category_id!=0"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in active" id="home">
                <table class="table" v-if="storeInfos">
                    <thead>
                        <tr>
                            <th>商品编号</th>
                            <th>商品名称</th>
                            
                            <th>供应商名称</th>
                            <th>入库批次号</th>
                            <th>所属仓库</th>
                            <th>计量单位</th>
                            <th>库存数量</th>
                            <th>企业价</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x,index) of storeInfos">
                            <td>{{x.comdity_code}}</td>
                            <td>{{x.comdity_name}}</td>
                            <td>{{x.supplier_name}}</td>
                            <td>{{x.storage_batch}}</td>
                            <td>{{x.storage_name}}</td>
                            <td>{{x.units}}</td>
                            <td>{{x.number}}</td>
                            <td>{{x.real_price}}</td>                        
                        </tr>
                    </tbody>
                </table>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="profile">
                <table class="table" v-if="inInfos">
                    <thead>
                        <tr>
                            <th>商品编号</th>
                            <th>商品名称</th>
                            
                            <th>供应商名称</th>
                            <th>入库批次号</th>
                            <th>所属仓库</th>
                            <th>计量单位</th>
                            <th>库存数量</th>
                            <th>企业价</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x,index) of inInfos">
                            <td>{{x.comdity_code}}</td>
                            <td>{{x.comdity_name}}</td>
                            <td>{{x.supplier_name}}</td>
                            <td>{{x.storage_batch}}</td>
                            <td>{{x.storage_name}}</td>
                            <td>{{x.units}}</td>
                            <td>{{x.number}}</td>
                            <td>{{x.real_price}}</td>                        
                        </tr>
                    </tbody>
                </table>
            </div>
            <div role="tabpanel" class="tab-pane fade" id="messages">
                <table class="table" v-if="outInfos">
                    <thead>
                        <tr>
                            <th>商品编号</th>
                            <th>商品名称</th>
                            
                            <th>出库单号</th>
                            <th>出库批次</th>
                            <th>商品用途</th>
                            <th>需求人</th>
                            <th>计量单位</th>
                            <th>出库数量</th>
                            <th>出库时间</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x,index) of outInfos">
                            <td>{{x.comdity_code}}</td>
                            <td>{{x.comdity_name}}</td>
                            <td>{{x.dlivry_code}}</td>
                            <td>{{x.dlivry_batch}}</td>
                            <td>{{x.comdity_use}}</td>
                            <td>{{x.demand_name}}</td>
                            <td>{{x.units}}</td>
                            <td>{{x.number}}</td>                        
                            <td>{{x.out_date}}</td>                        
                        </tr>
                    </tbody>
                </table>
            </div>
            <div role="tabpanel" class="tab-pane" id="settings" v-if="category_id!=0">settings...</div>
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
        comp_id:this.$route.params["comp_id"],
        category_id:this.$route.params["category_id"],
        comp:null,
        storeInfos:null,
        buyInfos:null,
        inInfos:null,
        outInfos:null,
    }
    
  },
  mounted(){
    this.$store.dispatch("shop_index_storegoods").then((resp)=>{
        this.comp=_.find(resp.data,{code:this.comp_id})   
    });
    this.$store.dispatch("shop_city_index_storegoods",{comp_id:this.comp_id}).then((resp)=>{
        this.storeInfos=resp.data   
    });

    this.$store.dispatch("shop_city_index_in",{comp_id:this.comp_id}).then((resp)=>{
        this.inInfos=resp.data
    });
    this.$store.dispatch("shop_city_index_out",{comp_id:this.comp_id}).then((resp)=>{
        this.outInfos=resp.data
    });
    
  },
  methods:{
  	handleCityClick(params){
       
    },
    handleTRClick(params){
       
    },

  },
  components:{
  	Chart,MyMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.nav-tabs{
    font-size: 1.2em;
    font-weight: bold;
}
.table{
    margin-top: 1em;
    td{
        max-width:12em;
    }
}

    


</style>

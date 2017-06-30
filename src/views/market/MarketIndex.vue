<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    <div class="container">
    	<div class="row">
            <div class="col-md-6">
                <Chart width="95%" height="480px" :option="optionBar1" theme='macarons' loading></Chart>
            </div>
            <div class="col-md-6">
                <table class="table">
                    <thead>
                        <tr>
                            <th>盟市</th>
                            <th>库存金额</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x,index) of shopStock">
                            <td>{{x.name}}</td>
                            <td>{{x.value|money}}</td>
                            
                            <td ><a @click="handleTRClickForShop(x.code)">详情</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>   
        </div>
    </div>	
    <MyModal :option='compModalOption' title="盟市详情">
    
        <div style="height:630px;overflow-y:scroll;">
            <table class="table">
                <thead>
                    <tr>
                        <th>物资编号</th>
                        <th>物资名称</th>
                        <th>所属仓库</th>
                        <th>仓库用途</th>
                        <th>入库日期</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>单位</th>
                        <th>单价</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="x of shopStockDetail">
                        <td>{{x.comdity_code}}</td>
                        <td>{{x.comdity_name}}</td>
                        <td>{{x.storage_name}}</td>
                        <td>{{x.storage_yt}}</td>
                        <td>{{x.in_date|prettyDate}}</td>
                        <td>{{x.money|money}}</td>
                        <td>{{x.number}}</td>
                        <td>{{x.units}}</td>
                        <td>{{x.price}}</td>
                    </tr>
                </tbody>
            </table>             
        </div>
    </MyModal>

    <MyModal :option='countyModalOption' title="物资明细">
    
        <div style="height:430px;overflow-y:scroll;">
            <table class="table">
                
            </table>          
            
       
        </div>
    </MyModal>

  </div>
</template>

<script>

import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
import MyModal from '@/components/MyModal'

export default {

  data () {
    return {
        menus:[],
        cities:null,
 		optionBar1:{},
       
        compModalOption:{},
        countyModalOption:{},

        shopStock:[],
        optionBar1:{},

        shopStockDetail:[]
    }
    
  },
  mounted(){
    
    
    this.$store.dispatch("marketing_index").then(resp=>{
        this.shopStock=resp.data
    
        this.optionBar1={
            title: {
                text: '商城库存营销物资(万)'
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
                data: _.map(resp.data,item=>{
                    return {name:item.name,value:(item.value/10000).toFixed(2)}
                })
            }]
        }
    })
  },
  methods:{
  	
    handleTRClickForShop(comp_id){
        this.compModalOption={visable:true}

        this.$store.dispatch("marketing_index_comp",{comp_id}).then(resp=>{
            this.shopStockDetail=resp.data
        })
    },
   
  },
  components:{
  	Chart,MyMenu,MyModal
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

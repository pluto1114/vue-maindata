<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
        <h2 class="comp-title" v-if="infoMap.dept">{{infoMap.dept.name}}</h2>    
        <br/>
        <div class="row">
            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-3"><i class="fa fa-database fa-4x" aria-hidden="true"></i></div>
                    <div class="col-md-9 total">
                        <div class="title">库存物资总额</div>
                        <div class="number">￥{{infoMap.totalValue|money}}</div>
                    </div>
                </div>
                <div class="row store-year">
                    <div v-for="(x,index) of infoMap.agesAmount" class="col-md-3">
                        <div class="percent" v-if="infoMap.totalValue>0">{{parseInt(x.amount*100/infoMap.totalValue)}}%</div>
                        <div class="">{{x.age}}</div>
                    </div>  
                </div>
                <div class="row store-amount" style="margin-top:2em;">
                    <div class="col-md-6">物资库龄</div>
                    <div class="col-md-6">当前余量</div>
                </div>
                <div v-for="(x,index) of infoMap.agesAmount" class="row store-amount">
                    <div class="col-md-6">{{x.age}}天</div>
                    <div class="col-md-6">￥{{x.amount|money}}元</div>                 
                </div>
            </div>

            <div class="col-md-6">
                <Chart width="100%" height="400px" :option="optionPie" theme='macarons' @chartClick="handlePieClick" loading></Chart>
            </div>
            <div class="col-md-2"></div>
            
            
            
        </div>

        
    </div>
    
   

    <div class="container">
        <transition  name="fade"  mode="out-in">
        <div v-if="goodstypeOrderBy.length > 0" class="row">
            <div class="col-sm-1">包含类型</div>
            <div class="col-sm-11">         
                <mu-checkbox name="group" v-for="x of goodstypeOrderBy" :nativeValue="x.code" :key="x.code" v-model="selTypes" :label="x.name" class="type-checkbox" @change="handleTypeChange"/> 
            </div>    
        </div> 
        </transition>
        <!-- <div class="row">
            <div class="col-sm-1">可用物资</div>
            <div class="col-sm-11">         
                <mu-checkbox name="group2" v-model="useable" label="去除全部预占物资" class="type-checkbox" @change="handleUseableChange"/> 
            </div>   
        </div> -->
        
    </div>

   
    <div class="container">
        <div class="row">
            <transition  name="fade"  mode="out-in">
            <table v-if="results.length > 0" class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        
                        <th>物资编号</th>
                        <th style="width:15em;">物资名称</th>
                        <th>供应商</th>
                    
                        <th>逻辑库</th>
                        <th>实体库</th>
                        
                        <th>单位</th>
                        <th>入库数量</th>                  
                        <th>当前数量</th>  
                        <th>单价</th>  
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(x,index) of results">
                        <td>{{index+1}}</td>
                        <td>{{x.goodstype_code}}</td>
                        <td>{{x.goodstype_name}}</td>
                        <td>{{x.factory}}</td>
                        <td>{{x.logic_store_name}}</td>
                        <td>{{x.store_name}}</td>
                        <td>{{x.unit}}</td>
                        <td>{{x.in_count}}</td>
                        <td>{{x.cur_count}}</td>
                        <td>{{x.single_price}}</td>
                    </tr>
                </tbody>
            </table>
            </transition>
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
        infoMap:{},
        dept_code:this.$route.params["dept_code"] || 2,
       
        optionPie:{},
        goodstypeOrderBy:[],
        
        items:{},
        results:{},
       
        selTypes:[],
        useable:false,
        
    }    
  },
  computed:{
    
  },
  watch:{
   
  },
  mounted(){

    this.$store.dispatch("store_county_index",{dept_code:this.dept_code}).then((resp)=>{
        this.infoMap=resp.body.itemMap;
    });
    this.$store.dispatch("store_county_index_goodstype",{dept_code:this.dept_code}).then((resp)=>{
        this.goodstypeOrderBy=resp.body.items;
    });
    this.showPie();

    // this.showItems();
  },
  methods:{
  	handlePieClick(params){
        console.log(params)
       
        // this.showItems();
       
    },
    handleTypeChange(value){      
        this.selTypes=value;
        this.showItems();
        this.handleAllStore();
    },
    handleUseableChange(value){

        this.useable=value;
        this.showItems();
        this.handleAllStore();
    },
    
    showPie(){
        this.$store.dispatch("store_county_index_goodstype",{dept_code:this.dept_code}).then((resp)=>{
            this.optionPie={
                title: { 
                    text: '物资类型占比',
                    left:'left'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                // roseType: 'radius',
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: true,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 30,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
                series : [
                    {
                        name: '物资类型',
                        type: 'pie',
                        radius: ['20%','60%'],
                        data:resp.body.items
                    }
                ]
            }        
        
        });

    },
    showItems(){

        this.$store.dispatch("store_county_index_storegoods",{dept_code:this.dept_code,selTypes:this.selTypes,useable:this.useable}).then((resp)=>{
            this.items=resp.body.items;
            this.results=resp.body.items;
            
            
        });

    },
    
  },
  components:{
  	Chart,MyMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.comp-title{
    margin-top: 0;
}

.total{ 
    .title{

    }
    .number{
        font-size: 2em;
        line-height: 1.8em;
    }
}
.store-year{
    .percent{
        font-size: 1.6em;
        line-height: 1.8em;
    }
}
.store-amount{
    line-height: 2em;
    font-size: 1.2em;
}
.goodstype-order{
    h3{
        margin-top: 0;
    }
    ol{
        margin-top:1.5em;
        margin-left: 1em;
        li{
            line-height: 2em;
            font-size: 1.12em;
            span{
                float:right;
            }

        }
    }
}

.content{
    padding: 2em;
    border: 1px solid #ddd;
    margin-bottom: 2em;
}
th{
    min-width:6em;
}

.mu-radio{
    min-width:180px;

    .mu-radio-label{
        font-size: 12px;
    }
}

</style>

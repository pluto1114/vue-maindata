<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
        
        
        <div class="row">
            <div class="col-md-3">
                <div class="row">
                    <div class="col-md-3"><i class="fa fa-database fa-4x" aria-hidden="true"></i></div>
                    <div class="col-md-9 total">
                        <div class="title">全区库存物资总额</div>
                        <div class="number">{{infoMap.totalValue}}</div>
                    </div>
                </div>
                <div class="row store-year">
                    <div v-for="(x,index) of infoMap.yearValues" class="col-md-3">
                        <div class="percent">{{parseInt(x*100/infoMap.totalValue)}}%</div>
                        <div class="">{{2014+index}}</div>
                    </div>  
                </div>
                <div class="row store-amount" style="margin-top:2em;">
                    <div class="col-md-6">入库年份</div>
                    <div class="col-md-6">当前余量</div>
                </div>
                <div v-for="(x,index) of infoMap.yearValues" class="row store-amount">
                    <div class="col-md-6">{{2014+index}}</div>
                    <div class="col-md-6">￥{{(x/10000).toFixed()}}万元</div>                 
                </div>
            </div>

            <div class="col-md-6">
                <Chart width="100%" height="400px" :option="optionPie" theme='shine' @chartClick="handlePieClick" loading></Chart>
            </div>

            <div class="col-md-3 goodstype-order">                
                <h3>物资类型排行</h3>
                <ol>
                    <li v-for="(x,index) of goodstypeOrderBy" v-if="index<10">{{x.name}}<span>{{parseInt(x.value/10000)}}万</span></li>
                </ol>                
            </div>
            
            
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
        <div class="row">
            <div class="col-sm-1">可用物资</div>
            <div class="col-sm-11">         
                <mu-checkbox name="group2" v-model="useable" label="去除全部占用物资" class="type-checkbox" @change="handleUseableChange"/> 
            </div>   
        </div>
    </div>
    <div class="container">
        <div class="row">
            <transition  name="fade"  mode="out-in">
            <table v-if="items.length > 0" class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        
                        <th>物资编号</th>
                        <th style="width:20em;">物资名称</th>
                        <th>供应商</th>
                    
                        <th>逻辑库</th>
     
                        <th style="width:4em;">单位</th>
                        <th>入库数量</th>                  
                        <th>当前数量</th>  
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(x,index) of items">
                        <td>{{index+1}}</td>
                        <td>{{x.goodstype_code}}</td>
                        <td>{{x.goodstype_name}}</td>
                        <td>{{x.factory}}</td>
                        <td>{{x.logic_store_name}}</td>
                        <td>{{x.unit}}</td>
                        <td>{{x.in_count}}</td>
                        <td>{{x.cur_count}}</td>
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
        comp_id:this.$route.params["comp_id"] || 2,
        optionNormal:{},
        optionProject:{},
        optionBar:{},
        optionPie:{},
        goodstypeOrderBy:[],
        logicStores:[],
        items:{},
        selTypes:[],
        useable:false
    }    
  },
  computed:{
    comp_id(){
        return this.$store.state.myStore.comp_id
    }
  },
  watch:{
    
  },
  mounted(){

    this.$store.dispatch("store_city_index",{comp_id:this.comp_id}).then((resp)=>{
        this.infoMap=resp.body.itemMap;
    });
    this.$store.dispatch("store_city_index_goodstype",{comp_id:this.comp_id}).then((resp)=>{
        this.goodstypeOrderBy=resp.body.items;
    });
    this.$store.dispatch("store_city_index_logicStore",{comp_id:this.comp_id}).then((resp)=>{
        this.logicStores=resp.body.items;
        this.optionPie={
            title: { 
                text: '各逻辑库占比(万元)',
                left:'right'
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
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: [0,'60%'],
                    data:this.logicStores
                }
            ]
        }        
    
    });

    // this.showItems();
  },
  methods:{
  	handlePieClick(params){
        console.log(params)
    },
    handleTypeChange(value){
        console.log(value)
        this.selTypes=value;
        this.showItems();
    },
    handleUseableChange(value){
        console.log(value)
        this.useable=value;
        this.showItems();
    },
    showItems(){
        this.$store.dispatch("store_city_index_storegoods",{comp_id:this.comp_id,selTypes:this.selTypes,useable:this.useable}).then((resp)=>{
            this.items=resp.body.items;
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

.banner{
    border-bottom: 0.2em solid #CC0226;   
    line-height:2.8em;
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

 


</style>

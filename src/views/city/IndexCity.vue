<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
        <div class="row">
        	<div class="col-md-12" style="padding:0;">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#storegoods1" role="tab" data-toggle="tab">物资平台库存</a></li>
                    <li role="presentation"><a href="#storegoods2" role="tab" data-toggle="tab">商城库存分析</a></li> 
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="storegoods1">
                        <div class="content">             
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style="width:12em;">地域</th>
                                        <th>0-90天</th>
                                        <th>91-180天</th>
                                        <th>180天以上</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="city">
                                        <td>{{city.name}}</td>
                                        <td>{{city.storegoods.lt90}}</td>
                                        <td>{{city.storegoods.lt180}}</td>
                                        <td>{{city.storegoods.gt180}}</td>
                                      
                                    </tr>
                                    <tr v-if="counties" v-for="x of counties">
                                        <td>{{x.name}}</td>
                                        <td>{{x.storegoods.lt90}}</td>
                                        <td>{{x.storegoods.lt180}}</td>
                                        <td>{{x.storegoods.gt180}}</td>
                                       
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="storegoods2">
                        <div class="content">             
                           商城数据 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
        	<div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-4">在建项目分析</div>
                    <div class="total col-sm-offset-6 col-sm-2">
                            
                    </div>
                </div>
            </div>
        	
            <div class="col-md-12 content">            
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width:12em;">地域</th>
                            <th>库存量</th>
                            <th>使用量</th>
                            <th>损坏量</th>
                            <th>维修量</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="city">
                            <td>{{city.name}}</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                          
                        </tr>
                        
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12" style="padding:0;">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#modem1" role="tab" data-toggle="tab">光猫</a></li>
                    <li role="presentation"><a href="#modem2" role="tab" data-toggle="tab">机顶盒</a></li> 
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="modem1">
                        <div class="content">             
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style="width:12em;">地域</th>
                                        <th>物资平台</th>
                                        <th>商城</th>
                                       
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="city">
                                        <td>{{city.name}}</td>
                                        <td>{{city.storegoods.lt90}}</td>
                                        <td>{{city.storegoods.lt180}}</td>
                                      
                                    </tr>
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="modem2">
                        <div class="content">             
                           商城数据 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-4">运维物资使用情况</div>
                    <div class="total col-sm-offset-6 col-sm-2">
                            
                    </div>
                </div>
            </div>
            
            <div class="col-md-12 content">            
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width:12em;">地域</th>
                            <th>物资平台</th>
                            <th>商城</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="city">
                            <td>{{city.name}}</td>
                            <td>0</td>
                            <td>0</td>
                          
                        </tr>
                        
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-4">营销物资使用情况</div>
                    <div class="total col-sm-offset-6 col-sm-2">
                            
                    </div>
                </div>
            </div>
            
            <div class="col-md-12 content">            
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width:12em;">地域</th>
                            <th>物资平台</th>
                            <th>商城</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="city">
                            <td>{{city.name}}</td>
                            <td>0</td>
                            <td>0</td>
                          
                        </tr>
                        
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12" style="padding:0;">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#resource1" role="tab" data-toggle="tab">大唐资源</a></li>
                    <li role="presentation"><a href="#resource2" role="tab" data-toggle="tab">中兴资源</a></li> 
                    <li role="presentation"><a href="#resource3" role="tab" data-toggle="tab">新大陆资源</a></li> 
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="resource1">
                        <div class="content">             
                            大唐资源
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="resource2">
                        <div class="content">             
                           中兴资源 
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="resource3">
                        <div class="content">             
                           新大陆资源 
                        </div>
                    </div>
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
        year:'2016',
        counties:null,
        city:null,
        optionLine:{},
 		optionBar:{}
    }    
  },
  watch:{
    year(val,oldVal){
        this.showBuyAmountAndUseAmount()
    }
  },
  mounted(){
    this.menus=[{name:"终端设备分析",to:`/third/${this.comp_id}`},{name:"线上资源分析",to:"/third"},{name:"采购物资跟踪",to:`/trace/month/${this.comp_id}`}];
    console.log("comp_id:"+this.$route.params["comp_id"])
    this.$store.dispatch("city_index",{comp_id:this.comp_id}).then((resp)=>{
        this.counties=resp.body.itemMap.counties;    
        this.city=resp.body.itemMap.city;    
    });


  },
  methods:{
  	handleMapClick(params){
        if (params.componentType === 'series') {
            this.comp_id=params.data.id;    
        }
    },
    showBuyAmountAndUseAmount(){
        this.$store.dispatch("city_buyGoods",{comp_id:this.comp_id,year:this.year}).then((resp)=>{
            this.optionLine={
                title: {
                    text: '金额变化情况(万元)',
                    left:'center'
                },
                tooltip: {},
                legend: {
                    left:'left',
                    data:['采购量','使用量']
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
                    name: '采购量',
                    type: 'line',
                    data: resp.body.itemMap["buyInfo"]
                },{
                    name: '使用量',
                    type: 'line',
                    data: resp.body.itemMap["outInfo"]
                }]
            }       
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

.banner{
    border-bottom: 0.2em solid #CC0226;   
    line-height:2.8em;
}
.title{
    background:url(../../assets/hong.png) no-repeat;
    // background-size: cover;
    color:white;
}
.title,.total{
    font-size: 1.2em;
}
.content{
    padding: 2em;
    border: 1px solid #ddd;
    margin-bottom: 2em;
}

.table{

    td:not(:first-child),th:not(:first-child){
        text-align: right; 
    }
    td{
         padding: 0.8em 0.4em;
    }
}   

[role=tab]{
    font-size: 1.2em;
}

.nav-tabs > li.active > a{
     background-color: #CC0226;
     color: white;
}
</style>

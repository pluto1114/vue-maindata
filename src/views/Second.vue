<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
        <div class="row">
        	<div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-4">物资分布分析</div>
                    <div class="total col-sm-offset-6 col-sm-2">
                             
                    </div>
                </div>
            </div>
        	
            <div class="col-md-12 content">             
                <table class="table">
                	<thead>
                		<tr>
                			<th style="width:12em;">地域</th>
                			<th>采购量</th>
                			<th>库存量</th>
                			<th>在建项目</th>
                			<th>完成项目</th>
                			<th>闲置物资</th>
                			<th>运维物资</th>
                			<th>营销物资</th>
                		</tr>
                	</thead>
                	<tbody>
                        <tr>
                            <td>{{cityAmount.name}}</td>
                            <td>{{cityAmount.inValue}}</td>
                            <td>{{cityAmount.storeValue}}</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                		<tr v-for="x of downAmount">
                			<td>{{x.name}}</td>
                			<td>{{x.inValue}}</td>
                			<td>{{x.storeValue}}</td>
                			<td>0</td>
                			<td>0</td>
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
        	<div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-4">采购量、使用量</div>
                    <div class="total col-sm-offset-6 col-sm-2">
                            
                    </div>
                </div>
            </div>
        	
            <div class="col-md-12 content">
                <div class="row">
                    <mu-radio label="2015" name="group" nativeValue="2015" v-model="year" class="demo-radio"/> 
                    <mu-radio label="2016" name="group" nativeValue="2016" v-model="year"  class="demo-radio"/> 
                    <mu-radio label="2017" name="group" nativeValue="2017" v-model="year"  class="demo-radio"/> 
                </div>
                <br/>
                <div class="row">             
                    <Chart width="100%" height="300px" :option="optionLine" theme='shine' @chartClick="handleMapClick" loading></Chart>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
        	<div class="col-md-12 banner">
                <div class="row">
            		<div class="title col-sm-4">项目物资分析</div>
            		<div class="total col-sm-offset-6 col-sm-2">
                              
                    </div>
                </div>
        	</div>
        	
            <div class="col-md-12 content">             
                <Chart width="100%" height="300px" :option="optionBar" theme='shine' @chartClick="handleMapClick" loading></Chart>
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
        menus:[{name:"终端设备分析",to:`/third/${this.comp_id}`},{name:"线上资源分析",to:"/third"},{name:"采购物资跟踪",to:`/trace/month/${this.comp_id}`}],
        year:'2016',
        downAmount:{},
        cityAmount:{},
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
    // this.menus=[{name:"终端设备分析",to:`/third/${this.comp_id}`},{name:"线上资源分析",to:"/third"},{name:"采购物资跟踪",to:`/trace/month/${this.comp_id}`}];
    // this.$store.dispatch("city_index",{comp_id:this.comp_id}).then((resp)=>{
    //      this.downAmount=resp.body.itemMap.downAmount;    
    //      this.cityAmount=resp.body.itemMap.cityAmount;    
    // });

    this.showBuyAmountAndUseAmount();

    this.$store.dispatch("main_orderInfo").then((resp)=>{
        this.optionBar = {
		    // color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'直接访问',
		            type:'bar',
		            barWidth: '60%',
		            data:[10, 52, 200, 334, 390, 330, 220]
		        }
		    ]
		};
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
    background:url(../assets/hong.png) no-repeat;
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
}   


</style>

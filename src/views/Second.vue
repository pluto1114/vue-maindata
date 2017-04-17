<template>
  <div class="index">
    <div class="menu">
        <div class="container">
            <div style="float:right;">
                <div v-for="x of menus" class="menu-item">
                    {{x.name}}
                </div>
            </div>
        </div>
    </div>
    
    <div class="container">
        <div class="row">
        	<div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-4">物资分布分析</div>
                    <div class="total col-sm-offset-6 col-sm-2">
                        总量：58246      
                    </div>
                </div>
            </div>
        	
            <div class="col-md-12 content">             
                <table class="table">
                	<thead>
                		<tr>
                			<th>地域</th>
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
                			<td>0</td>
                			<td>0</td>
                			<td>0</td>
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
                        总量：58246      
                    </div>
                </div>
            </div>
        	
            <div class="col-md-12 content">             
                <Chart width="100%" height="300px" :option="optionLine" theme='shine' @chartClick="handleMapClick" loading></Chart>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
        	<div class="col-md-12 banner">
                <div class="row">
            		<div class="title col-sm-4">项目物资分析</div>
            		<div class="total col-sm-offset-6 col-sm-2">
                        总量：58246      
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

export default {
  name: 'index',
  data () {
    return {
        menus:[{name:"终端设备分析"},{name:"线上资源分析"}],
        optionType:{},
        optionLine:{},
 		optionBar:{}
    }
    
  },
  mounted(){

    this.$store.dispatch("main_goodsType").then((resp)=>{
        this.optionType={
            title: { 
                // text: '全区物资类型分布',
                left:'right'
            },
            tooltip:{},
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: '55%',
                    data:resp.body.items
                }
            ]
        }        
    });

    this.$store.dispatch("city_buyGoods").then((resp)=>{
        this.optionLine={
            title: {
                // text: '全区采购变化趋势(万元)',
                left:'right'
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

    this.$store.dispatch("main_orderInfo").then((resp)=>{
        this.optionBar = {
		    color: ['#3398DB'],
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
    }
  },
  components:{
  	Chart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.menu-item{
    padding-left:20px;
    float:left;
}
.menu-item::before{
    padding-right:20px;
    content: "|";
}
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

    


</style>

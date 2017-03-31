<template>
  <div class="buy-goods">
  	<mu-flexbox class="years">
  	  <h4>采购时间：</h4>
      <mu-flexbox-item class="flex-demo">
        <mu-radio name="group" v-for="x of years" :nativeValue="x" :key="x" v-model="selTime" :label="x" class="year-item" @change="handleChange"/>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-flexbox>
      <mu-flexbox-item class="flex-demo">
        <Chart width="100%" height="500px" :option="option" theme='infographic' @chartClick="handleMonthClick"></Chart>
      </mu-flexbox-item>
      
    </mu-flexbox> 
    <h4>(点击进入时段详情)</h4> 
    <div class="row">
        <transition  name="fade"  mode="out-in">
        <table v-if="items.length > 0" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    
                    <th>物资编号</th>
                    <th>物资名称</th>
                    <th>供应商</th>
                	<th>采购单号</th>
                 
 
                    <th>单位</th>
                    <th>采购数量</th>                  
                    <th>单价</th>  
                </tr>
            </thead>
            <tbody>
                <tr v-for="(x,index) of items">
                    <td>{{index+1}}</td>
                    <td>{{x.goodstype_code}}</td>
                    <td>{{x.goodstype_name}}</td>
                    <td>{{x.factory}}</td>
                    <td>{{x.buyorder_code}}</td>
                    <td>{{x.unit}}</td>
                    <td>{{x.buy_count}}</td>
                    <td>{{x.no_tax_price}}</td>
                </tr>
            </tbody>
        </table>
        </transition>
    </div> 
  </div>
</template>

<script>
import Chart from '@/components/Chart'
import { mapState } from 'vuex';
import _ from 'lodash'

var itemStyle={
	    normal: {
	        color: new echarts.graphic.LinearGradient(
	            0, 0, 0, 1,
	            [
	                {offset: 0, color: '#83bff6'},
	                {offset: 0.5, color: '#188df0'},
	                {offset: 1, color: '#188df0'}
	            ]
	        )
	    },
	    emphasis: {
	        color: new echarts.graphic.LinearGradient(
	            0, 0, 0, 1,
	            [
	                {offset: 0, color: '#2378f7'},
	                {offset: 0.7, color: '#2378f7'},
	                {offset: 1, color: '#83bff6'}
	            ]
	        )
	    }
	}
export default {
  name: 'buyGoods',
  data () {
    return {
    	years:['2017','2016','2015'],
    	selTime:"2016",
    	option:{},
    	optionType:{},
    	types:[],
    	items:[]
    }
  },
  watch:{
    'selTime':'fresh'
  },
  mounted(){
  	this.fresh()
  },
  methods:{
  	handleChange(){
  		this.items=[];
  	},
  	fresh(){
	  	this.$store.dispatch("buyGoodsChart_year",{year:this.selTime}).then((resp)=>{
	        this.option = {
			    title: {
			        text: '全年采购物资'
			    },
			    tooltip: {},
			    xAxis: {
			        data: _.map(resp.body.items,"name")
			    },
			    yAxis: {
			        
			    },
			    series: [
			        {
			            type: 'bar',
			            itemStyle:itemStyle,
			            data: _.map(resp.body.items,"amount")
			        }
			    ]
			};
	    });
	    
  	},
  	handleMonthClick(params){
  		if(params.name.length==7){
	  		this.$store.dispatch("buyGoodsChart_month",{month:params.name}).then((resp)=>{
		        this.option = {
				    title: {
				        text: params.name+'采购物资'
				    },
				    
				    xAxis: {
				        data: _.map(resp.body.items,"name")
				    },
				    
				    series: [
				        {
				            type: 'bar',
				            itemStyle: itemStyle,
				            data: _.map(resp.body.items,"amount")
				        }
				    ]
				};
		    });
		   
		}
		if(params.name.length==10){
			this.$store.dispatch("buyGoodsChart_day",{day:params.name}).then((resp)=>{
		        this.option = {
				    title: {
				        text: params.name+'采购物资'
				    },
				    tooltip: {},
				    xAxis: {
				        data: _.map(resp.body.items,"name")
				    },
				    yAxis: {
				        
				    },
				    series: [
				        {
				            type: 'bar',
				            itemStyle: itemStyle,
				            data: _.map(resp.body.items,"amount")
				        }
				    ]
				};
		    });
		    
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
.buy-goods{
	.years{
		margin: 0 0.4em 1.6em;
	}
	.year-item{
		width:8em;
	}
}
.table{
    font-size:1.15em;
    td{
        padding:0.9em 0.3em;
        max-width:8em;
    }
}
</style>

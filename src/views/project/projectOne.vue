projectOne.vue
<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
	    <div class="row">
		    <div class="col-sm-3">
		    	<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">项目信息</h3>
				  </div>
				  <div class="panel-body">
				    2016年中国联通内蒙古包头意城晶华小区光纤改造工程
				  </div>
				  <ul class="list-group project-info">
				  	<li class="list-group-item"><i class="fa fa-clock-o"></i>首次采购日期：<span class="">2017-02-02</span></li>
				  	<li class="list-group-item"><i class="fa fa-clock-o"></i>最后出库日期：<span class="">2017-05-11</span></li>			<li class="list-group-item"><i class="fa fa-paper-plane"></i>采购单数量：<span class="">2000000</span></li>
				  	<li class="list-group-item"><i class="fa fa-paper-plane"></i>出库单数量：<span class="">2000000</span></li>
				  	<li class="list-group-item"><i class="fa fa-money"></i>采购总金额：<span class="">2000000</span></li>
				  	<li class="list-group-item"><i class="fa fa-money"></i>入库总金额：<span class="">2000000</span></li>
				  	<li class="list-group-item"><i class="fa fa-money"></i>出库总金额：<span class="">2000000</span></li>
				  	<li class="list-group-item"><i class="fa fa-money"></i>库存总金额：<span class="">2000000</span></li>
				   
				  </ul>
				</div>
		    </div>	      
		    <div class="col-sm-9">
		    	
			    <div class="row">
			    	<div class="col-sm-6">
		                <div class="p3">
		                	<h4>采购物资</h4>             
		                    <Chart width="100%" height="300px" :option="optionPieZX" theme="macarons" loading></Chart>
		                    <div class="row">
		                        <div class="col-md-12">
		                        </div>
		                    </div>
		                </div>
		            </div>
		            <div class="col-sm-6">
		                <div class="p3">
		                	<h4>出库物资</h4>             
		                    <Chart width="100%" height="300px" :option="optionPieZX" theme="macarons" loading></Chart>
		                    <div class="row">
		                        <div class="col-md-12">
		                        </div>
		                    </div>
		                </div>
		            </div>
			    </div>
				
		    </div>	      
	    </div>
    </div>
    
   

    <div class="container">
       
    </div>

    <div class="container">
        <div class="row">
            
        </div>
    </div>
  </div>
</template>

<script>

import Card from '@/components/Card'
import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'

export default {

  data () {
    return {
        menus:[],
        optionScatter:{},
        comp_id:this.$route.params["comp_id"] || 2,
        project_code:this.$route.params["project_code"] || 2,
      	pieDataZX:{},
      	optionPieZX:{},
    }    
  },
  computed:{
    
  },
  watch:{
    'pieDataZX':'drawPieZX',
  },
  mounted(){
  	this.$store.dispatch("resource_status_pro",{source:"ZX"}).then((resp)=>{
    	var items=resp.data
    	items.forEach((item,i)=>{
            if(item.name==""){
                items.splice(i,1)
            }
        }) 
        this.pieDataZX=items;        
  
    });
    
  },
  methods:{
  	drawPieZX(){    	
        this.optionPieZX={
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
                    data:this.pieDataZX
                }
            ]
        }         
    }
    
  },
  components:{
  	Chart,MyMenu,Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.project-info{
	font-size: 1.05em;
	li{
		padding: 1em 1em;

		.fa{
			margin-right: 1em;
		}
	}
}

.p3{
    border: 1px solid #d5d5d5;
    border-radius: 1em;
    > h4{
        padding: 0.3em 1em 0.8em;
        border-bottom: 1px solid #dfdfdf;
    }
}
 


</style>

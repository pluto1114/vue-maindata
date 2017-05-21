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
		                    <Chart width="99%" height="300px" :option="optionPieBuy" theme="macarons" loading></Chart>
		                    <div class="row">
                          <div class="col-md-12">
                            <ul class="list-group">
                              <li class="list-group-item" v-for="(x,index) of pieDataBuy">
                                <span class="pull-right">{{x.value}}</span>
                                <span v-html="x.name"></span>
                              </li>
                            </ul>
                            
                          </div>
                    
                      </div>
		                </div>
		            </div>
		            <div class="col-sm-6">
		                <div class="p3">
		                	<h4>出库物资</h4>             
		                    <Chart width="100%" height="300px" :option="optionPieOut" theme="macarons" loading></Chart>
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
        
      	pieDataBuy:{},
      	optionPieBuy:{},
        pieDataOut:{},
        optionPieOut:{},
    }    
  },
  computed:{
    comp_id(){
      return this.$store.state.project.comp_id;
    },
    project_code(){
      return this.$store.state.project.project_code;
    }
  },
  watch:{
    'pieDataBuy':'drawPieBuy',
    'pieDataOut':'drawPieOut',
  },
  mounted(){
    
  	this.$store.dispatch("project_info_buy",{comp_id:this.comp_id,project_code:this.project_code}).then((resp)=>{
    	var items=resp.body.items
    	
      this.pieDataBuy=items;        
  
    });
    // $('#accordion').on('shown.bs.collapse', (e)=>{
    //   this.$store.dispatch("project_info_buylist",{comp_id:this.comp_id,project_code:this.project_code,level_one_code:e.target.id}).then((resp)=>{
    //     var items=resp.body.items
               
    //   });
    // })
  },
  methods:{
  	drawPieBuy(){    	
        this.optionPieBuy={
            title: { 
                // text: '全区物资类型分布',
                left:'right'
            },
            tooltip:{},
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: ['20%','55%'],
                    data:this.pieDataBuy
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
.accordion {
    a:hover,a:focus{
        text-decoration: none;
        outline: none;
        border-bottom: none;
    }
    .panel{
        border: none;
        border-top: 1px solid #e8e8e8;
        box-shadow: none;
        border-radius: 0;
        margin: 0;
        &:last-child{
            border-bottom: 1px solid #e8e8e8;
        }
    }
    .panel-heading{
        padding: 0 1em;
    }
    .panel-title{
        a{
            display: block;
            font-size: 14px;
            //font-weight: bold;
            line-height: 24px;
            background: #fff;
            padding: 15px 20px 15px 47px;
            position: relative;
            transition: all 0.5s ease 0s;
        }
        .value{
            padding-top: 1.2em;
        }
    }
    .panel-title{

        a:before{
            content: "\f068";
            font-family: 'FontAwesome';
            display: block;
            width: 30px;
            height: 30px;
            line-height: 32px;
            border-radius: 50%;
            background: #888bc2;
            font-size: 14px;
            color: #fff;
            text-align: center;
            position: absolute;
            top: 25%;
            left: 0;
            transition: all 0.3s ease 0s;
        }
        a.collapsed:before{
            content: "\f067";
        }
    }

    .panel-body{
        font-size: 15px;
        color: #635858;
        line-height: 25px;
        border: none;
        padding: 14px 10px 14px 20px;
    } 

    .dt-ul{
        li{
            padding:0.8em 1.5em;
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

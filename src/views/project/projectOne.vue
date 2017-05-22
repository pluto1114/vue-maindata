\<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container" style="min-height:700px;">
	    <div class="row" v-if="info">
		    <div class="col-sm-3">
		    	<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">项目信息</h3>
				  </div>
				  <div class="panel-body">
				    {{info.project.name}}
				  </div>
				  <ul class="list-group project-info">
				  	<li class="list-group-item"><i class="fa fa-clock-o"></i>首次采购日期：<span class="">{{info.firstBuyDate | prettyDate}}</span></li>
				  	<li class="list-group-item"><i class="fa fa-clock-o"></i>最后出库日期：<span class="">{{info.lastOutDate | prettyDate}}</span></li>
				  	<li class="list-group-item"><i class="fa fa-paper-plane"></i>采购单数量：<span class="">{{info.buyCount}}</span></li>
				  	<li class="list-group-item"><i class="fa fa-paper-plane"></i>出库单数量：<span class="">{{info.outCount}}</span></li>
				  	<li class="list-group-item"><i class="fa fa-money"></i>采购总金额：<span class="">{{info.buyAmount | money}}</span></li>
				  	<li class="list-group-item"><i class="fa fa-money"></i>入库总金额：<span class="">{{info.inAmount | money}}</span></li>
				  	<li class="list-group-item"><i class="fa fa-money"></i>出库总金额：<span class="">{{info.outAmount | money}}</span></li>
				  	<li class="list-group-item"><i class="fa fa-money"></i>库存总金额：<span class="">{{info.storeAmount | money}}</span></li>
				   
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
	                                <span class="pull-right">{{x.value | money}}</span>
	                                <a @click="handleClickBuy(x.code)">{{x.name}}</a>
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
			                        <ul class="list-group">
		                              <li class="list-group-item" v-for="(x,index) of pieDataOut">
		                                <span class="pull-right">{{x.value | money}}</span>
		                                <a @click="handleClickOut(x.code)">{{x.name}}</a>
		                              </li>
		                            </ul>
		                        </div>
		                    </div>
		                </div>
		            </div>
			    </div>
				
		    </div>	      
	    </div>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="myModalBuy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">采购详情</h4>
          </div>
          <div class="modal-body content">
            <div style="height:430px;overflow-y:scroll;">
                      
                <table class="table">
                    <thead>
                        <tr>
                            <th>物资编号</th>
                            <th>物资名称</th>
                            <th>采购单号</th>
                            <th>数量</th>
                            <th>单价</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of buygoods">
                            <td>{{x.goodstype_code}}</td>
                            <td><span v-html="x.goodstype_name"></span></td>
                            <td>{{x.buyorder_code}}</td>
                            <td>{{x.buy_count}}</td>
                            <td>{{x.no_tax_price}}</td>
                                                  
                        </tr>
                    </tbody>
                </table>
           
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>  

  	<!-- Modal -->
    <div class="modal fade" id="myModalOut" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">出库详情</h4>
          </div>
          <div class="modal-body content">
            <div style="height:430px;overflow-y:scroll;">
                      
                <table class="table">
                    <thead>
                        <tr>
                            <th>物资编号</th>
                            <th>物资名称</th>
                            <th>需求单号</th>
                            <th>数量</th>
                            <th>单价</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of outgoods">
                            <td>{{x.goodstype_code}}</td>
                            <td><span v-html="x.goodstype_name"></span></td>
                            <td>{{x.order_code}}</td>
                            <td>{{x.ready_out_count}}</td>
                            <td>{{x.single_price}}</td>
                                                  
                        </tr>
                    </tbody>
                </table>
           
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div>
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
        info:null,
      	pieDataBuy:{},
      	optionPieBuy:{},
      	buygoods:[],
        pieDataOut:{},
        optionPieOut:{},
        outgoods:[],
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
    
  	this.$store.dispatch("project_info_index").then((resp)=>{
    	this.info=resp.body.itemMap
    });
    this.$store.dispatch("project_info_buy",{comp_id:this.comp_id,project_code:this.project_code}).then((resp)=>{
    	var items=resp.body.items
      	this.pieDataBuy=items;        
    });
    this.$store.dispatch("project_info_out",{comp_id:this.comp_id,project_code:this.project_code}).then((resp)=>{
    	var items=resp.body.items
      	this.pieDataOut=items;        
    });
    // $('#accordion').on('shown.bs.collapse', (e)=>{
    //   this.$store.dispatch("project_info_buylist",{comp_id:this.comp_id,project_code:this.project_code,level_one_code:e.target.id}).then((resp)=>{
    //     var items=resp.body.items
               
    //   });
    // })
  },
  methods:{
  	handleClickBuy(level_one_code){
  		$('#myModalBuy').modal()
  		this.$store.dispatch("project_info_buylist",{comp_id:this.comp_id,project_code:this.project_code,level_one_code}).then((resp)=>{
	    	this.buygoods=resp.body.items          
	    });
  	},
  	handleClickOut(level_one_code){
  		$('#myModalOut').modal()
  		this.$store.dispatch("project_info_outlist",{comp_id:this.comp_id,project_code:this.project_code,level_one_code}).then((resp)=>{
	    	this.outgoods=resp.body.items          
	    });
  	},
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
    },
    drawPieOut(){
    	this.optionPieOut={
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
                    data:this.pieDataOut
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
    padding: 1em;
    padding-top: 0;
    > h4{
        padding: 0.3em 1em 0.8em;
        border-bottom: 1px solid #dfdfdf;
    }
}
 


</style>

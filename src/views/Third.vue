<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    <div class="container">
    	<div class="row">
    		<div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-2">物资分布</div>
                    <div class="total col-sm-offset-8 col-sm-2">
                          
                    </div>
                </div>
            </div>
    	</div>
    	<form class="form-inline">
		  <div class="form-group">
		    <label>项目编号：</label>
		    <input type="text" class="form-control" placeholder="请输入项目编号">
		  </div>
		  <div class="form-group">
		    <label>采购批次：</label>
		    <input type="text" class="form-control" placeholder="采购批次">
		  </div>
		  <div class="form-group">
		    <label>订单日期：</label>
		    <input type="date" class="form-control" required>--
		    <input type="date" class="form-control" required>
		  </div>
		  <div class="form-group">
		    <label>订单类型：</label>
		    <input type="text" class="form-control" placeholder="请输入项目编号">
		  </div>
		  <div class="form-group">
		    <label>物资类型：</label>
		    <input type="text" class="form-control" placeholder="采购批次">
		  </div>
		  <div class="form-group">
		    <button type="submit" class="btn btn-default" style="">查 询</button>
		  </div>
		</form>
        <div class="row">
        	
        	
            <div class="col-md-12 content">             
                <table class="table">
                	<thead>
                		<tr>
                			<th>订单编号</th>
                			<th>日期</th>
                			<th>业务员</th>
                			<th>终端编码</th>
                			<th>终端名称</th>
                			<th>单价</th>
                			<th>数量</th>
                			
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
                			
                		</tr>
                	</tbody>
                </table>
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
        menus:[],
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

    

    
  },
  methods:{
  	handleMapClick(params){
        if (params.componentType === 'series') {
            this.comp_id=params.data.id;    
        }
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
    margin-top: 1em;
    margin-bottom: 2em;
}
.form-inline{

}
.form-inline .form-group{
	margin-top:0.5em;
	margin-right: 1em;
}
    


</style>

<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
        <div class="row">
        	<div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-4">固网终端分析</div>
                    <div class="total col-sm-offset-6 col-sm-2">
                             
                    </div>
                </div>
            </div>
        	
            <div class="col-md-12 content">             
                <table class="table">
                	<thead>
                		<tr>
                			<th style="width:12em;">地域</th>
                			<th>终端总数</th>
                			<th>在用终端数</th>
                			<th>空闲终端数</th>
                			<th>回收终端数</th>
                			<th>其它状态终端数</th>
                			
                		</tr>
                	</thead>
                	<tbody>
                		<tr v-for="x of cityItems" @click="handleTrClick(x.comp_id)">
                			<td>{{x.comp_name}}</td>
                			<td>{{x.ont_count}}</td>
                			<td>{{x.zy_count}}</td>
                            <td>{{x.kx_count}}</td>
                            <td>{{x.hs_count}}</td>
                			<td>{{x.qt_count}}</td>             			
                		</tr>
                	</tbody>
                </table>
            </div>
        </div>
    </div>
    
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">公司详情</h4>
          </div>
          <div class="modal-body content">
            <div style="height:630px;overflow-y:scroll;">
                      
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width:10em;">地域</th>
                            <th>终端总数</th>
                            <th>在用终端数</th>
                            <th>空闲终端数</th>
                            <th>回收终端数</th>
                            <th>其它状态终端数</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of countyItems">
                            <td>{{x.kc_name}}</td>
                            <td>{{x.ont_count}}</td>
                            <td>{{x.zy_count}}</td>
                            <td>{{x.kx_count}}</td>
                            <td>{{x.hs_count}}</td>
                            <td>{{x.qt_count}}</td>                         
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

import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'

export default {

  data () {
    return {
        menus:[{name:"终端设备分析",to:`/third/${this.comp_id}`},{name:"线上资源分析",to:"/third"},{name:"采购物资跟踪",to:`/trace/month/${this.comp_id}`}],
        year:'2016',
        cityItems:[],
        countyItems:[],
        comp_id:2
    }    
  },
  watch:{
    year(val,oldVal){
       
    }
  },
  mounted(){
    
    this.$store.dispatch("terminal_index",{comp_id:2}).then((resp)=>{ 
        this.cityItems=resp.body.data; 
    });

    $('#myModal').on('hidden.bs.modal', e=>{
        this.countyItems=[]
    })
  },
  methods:{
  	handleTrClick(comp_id){
        this.comp_id=comp_id
        $('#myModal').modal()
        this.$store.dispatch("terminal_index_comp",{comp_id:comp_id}).then((resp)=>{ 
            this.countyItems=resp.body.data; 
        });
    },
    showBuyAmountAndUseAmount(){
        
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
    td{
        padding-top:0.6em;
        padding-bottom: 0.8em;
    }
    td:not(:first-child),th:not(:first-child){
        text-align: right;
    }
}   


</style>

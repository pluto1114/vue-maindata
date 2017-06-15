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
                			<th></th>
                		</tr>
                	</thead>
                	<tbody>
                		<tr v-for="x of cityItems">
                			<td>{{x.comp_name}}</td>
                			<td>{{x.ont_count}}</td>
                			<td>{{x.zy_count}}</td>
                            <td>{{x.kx_count}}</td>
                            <td>{{x.hs_count}}</td>
                			<td>{{x.qt_count}}</td>   
                            <td><a  @click="handleTrClick(x.comp_id)">详情</a></td>          			
                		</tr>
                	</tbody>
                </table>
            </div>
        </div>
    </div>
    
    <MyModal :option='compModalOption' title="公司详情">
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
                        <th></th>
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
                        <td><a @click="handleTrClickDtl(x.kc_id)">详情</a></td>                         
                    </tr>
                </tbody>
            </table>
       
        </div>
    </MyModal>

    <MyModal :option='dtlModalOption' title="终端详情">
        <div style="height:630px;overflow-y:scroll;">
                  
            <table class="table dtl-table">
                <thead>
                    <tr>
                        <th style="width:6em;">所在部门</th>
                        <th>条码信息</th>
                        <th>批次号</th>
                        <th>设备型号</th>
                        <th>供应商</th>
                        <th>领用人</th>
                        <th>设备状态</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="x of dtlItems">
                        <td>{{x.dept_name}}</td>
                        <td>{{x.bar_code}}</td>
                        <td>{{x.batch_code}}</td>
                        <td>{{x.model}}</td>
                        <td>{{x.name}}</td>
                        <td>{{x.staff_name}}</td>
                        <td>{{x.sts}}</td>                         
                    </tr>
                </tbody>
            </table>
       
        </div>
    </MyModal>

  </div>
</template>

<script>

import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
import MyModal from '@/components/MyModal'
export default {

  data () {
    return {
        menus:[],
        year:'2016',
        cityItems:[],
        countyItems:[],
        dtlItems:[],
        comp_id:2,
        dtlModalOption:{},
        compModalOption:{},
    }    
  },
  watch:{
    year(val,oldVal){
       
    }
  },
  mounted(){
    
    this.$store.dispatch("terminal_index",{comp_id:2}).then((resp)=>{ 
        this.cityItems=resp.data; 
    });

    $('#myModal').on('hidden.bs.modal', e=>{
        this.countyItems=[]
    })
  },
  methods:{
  	handleTrClick(comp_id){
        this.comp_id=comp_id
        this.compModalOption={visable:true}
        this.$store.dispatch("terminal_index_comp",{comp_id:comp_id}).then((resp)=>{ 
            this.countyItems=resp.data; 
        });
    },
    handleTrClickDtl(kc_id){
        this.dtlModalOption={visable:true}
        this.$store.dispatch("terminal_index_detail",{kc_id:kc_id}).then((resp)=>{ 
            this.dtlItems=resp.data; 
        });
    },
    showBuyAmountAndUseAmount(){
        
    }
  },
  components:{
  	Chart,MyMenu,MyModal
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
.dtl-table{
    td:not(:first-child),th:not(:first-child){
        text-align: center;
    }
}

</style>

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
                		<tr v-for="x of cityItems" @click="handleTrClick(x.comp_id)">
                			<td>{{x.comp_name}}</td>
                			<td>{{x.ont_count}}</td>
                			<td>{{x.zy_count}}</td>
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
    
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">物资详情</h4>
          </div>
          <div class="modal-body">
         
            {{comp_id}}
 
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
        comp_id:2
    }    
  },
  watch:{
    year(val,oldVal){
       
    }
  },
  mounted(){
    // this.menus=[{name:"终端设备分析",to:`/third/${this.comp_id}`},{name:"线上资源分析",to:"/third"},{name:"采购物资跟踪",to:`/trace/month/${this.comp_id}`}];
    this.$store.dispatch("city_index",{comp_id:2}).then((resp)=>{ 
         this.cityItems=[{
            "comp_id": "10",
            "comp_name": "乌市分公司",
            "hs_count": "217",
            "kc_name": "",
            "kx_count": "2641",
            "ont_count": "13900",
            "qt_count": "69",
            "zy_count": "10973"
        }, {
            "comp_id": "11",
            "comp_name": "兴安分公司",
            "hs_count": "7",
            "kc_name": "",
            "kx_count": "4062",
            "ont_count": "6497",
            "qt_count": "29",
            "zy_count": "2399"
        }, {
            "comp_id": "12",
            "comp_name": "锡盟分公司",
            "hs_count": "309",
            "kc_name": "",
            "kx_count": "7490",
            "ont_count": "19809",
            "qt_count": "95",
            "zy_count": "11915"
        }, {
            "comp_id": "13",
            "comp_name": "阿盟分公司",
            "hs_count": "19",
            "kc_name": "",
            "kx_count": "830",
            "ont_count": "3395",
            "qt_count": "172",
            "zy_count": "2374"
        }, {
            "comp_id": "2",
            "comp_name": "呼市分公司",
            "hs_count": "712",
            "kc_name": "",
            "kx_count": "13495",
            "ont_count": "52662",
            "qt_count": "97",
            "zy_count": "38358"
        }, {
            "comp_id": "3",
            "comp_name": "包头分公司",
            "hs_count": "145",
            "kc_name": "",
            "kx_count": "10512",
            "ont_count": "25101",
            "qt_count": "106",
            "zy_count": "14338"
        }, {
            "comp_id": "4",
            "comp_name": "乌海分公司",
            "hs_count": "0",
            "kc_name": "",
            "kx_count": "4432",
            "ont_count": "4646",
            "qt_count": "6",
            "zy_count": "208"
        }, {
            "comp_id": "5",
            "comp_name": "赤峰分公司",
            "hs_count": "221",
            "kc_name": "",
            "kx_count": "12583",
            "ont_count": "44474",
            "qt_count": "147",
            "zy_count": "31523"
        }, {
            "comp_id": "6",
            "comp_name": "通辽分公司",
            "hs_count": "4",
            "kc_name": "",
            "kx_count": "0",
            "ont_count": "27",
            "qt_count": "0",
            "zy_count": "23"
        }, {
            "comp_id": "7",
            "comp_name": "鄂市分公司",
            "hs_count": "48",
            "kc_name": "",
            "kx_count": "7632",
            "ont_count": "8514",
            "qt_count": "7",
            "zy_count": "827"
        }, {
            "comp_id": "8",
            "comp_name": "呼伦分公司",
            "hs_count": "1128",
            "kc_name": "",
            "kx_count": "14624",
            "ont_count": "34981",
            "qt_count": "255",
            "zy_count": "18974"
        }, {
            "comp_id": "9",
            "comp_name": "巴市分公司",
            "hs_count": "230",
            "kc_name": "",
            "kx_count": "6948",
            "ont_count": "26720",
            "qt_count": "90",
            "zy_count": "19452"
        }]
    
    });

    
  },
  methods:{
  	handleTrClick(comp_id){
        this.comp_id=comp_id
        $('#myModal').modal()
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

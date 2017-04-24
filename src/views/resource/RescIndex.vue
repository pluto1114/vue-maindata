<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
    	<div class="row">
    		<div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-2">电子运维资源</div>
                    <div class="total col-sm-offset-8 col-sm-2">
                          
                    </div>
                </div>
            </div>
    	</div>
    	
        <div class="row">      	
            <div class="col-md-5">             
                <Chart width="100%" height="400px" :option="optionPieXDL" theme="shine" @chartClick="handlePieXDLClick" loading></Chart>
            </div>
            <div class="col-md-2">
                <div style="margin-top:150px;">{{statusNameXDL}}</div>
            </div>
            <div class="col-md-4"> 
                <Chart width="100%" height="300px" :option="optionSubPieXDL" theme="shine" @chartClick="handleSubPieXDLClick" loading></Chart>
            </div>
        </div>
    </div>
    <div class="container">
    	<div class="row">
    		<div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-2">号线资源</div>
                    <div class="total col-sm-offset-8 col-sm-2">
                          
                    </div>
                </div>
            </div>
    	</div>
    	
        <div class="row">      	
            <div class="col-md-5">             
                <Chart width="100%" height="400px" :option="optionPieDT" theme="shine" @chartClick="handlePieDTClick" loading></Chart>
            </div>
            <div class="col-md-2">
                <div style="margin-top:150px;">{{statusNameDT}}</div>
            </div>
            <div class="col-md-4"> 
                <Chart width="100%" height="300px" :option="optionSubPieDT" theme="shine" @chartClick="handleSubPieDTClick" loading></Chart>
            </div>
        </div>
    </div>
    <div class="container">
    	<div class="row">
    		<div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-2">路由导航</div>
                    <div class="total col-sm-offset-8 col-sm-2">
                          
                    </div>
                </div>
            </div>
    	</div>
    	
        <div class="row">      	
            <div class="col-md-5">             
                <Chart width="100%" height="400px" :option="optionPieZX" theme="shine" @chartClick="handlePieZXClick" loading></Chart>
            </div>
            <div class="col-md-2">
                <div style="margin-top:150px;">{{statusNameZX}}</div>
            </div>
            <div class="col-md-4"> 
                <Chart width="100%" height="300px" :option="optionSubPieZX" theme="shine" @chartClick="handleSubPieZXClick" loading></Chart>
            </div>
        </div>
    </div>
    
    
  </div>
</template>

<script>

import MyMenu from '@/components/MyMenu'
import Chart from '@/components/Chart'

export default {

  data () {
    return {
        menus:[],
        optionPieXDL:{},
        optionSubPieXDL:{},
        pieDataXDL:[],
        subPieDataXDL:[],
        statusNameXDL:"",
        optionPieDT:{},
        optionSubPieDT:{},
        pieDataDT:[],
        subPieDataDT:[],
        statusNameDT:"",
        optionPieZX:{},
        optionSubPieZX:{},
        pieDataZX:[],
        subPieDataZX:[],
        statusNameZX:"",
    }   
  },
  watch:{
  	'pieDataXDL':'drawPieXDL',
  	'pieDataDT':'drawPieDT',
  	'pieDataZX':'drawPieZX',

  },
  mounted(){

  	var data={"flag":"Y","total":"7","data":[{"list1":[{"name":"备品备件","value":"426.0"},{"name":"仪器仪表","value":"1073.0"},{"name":"2G基站","value":"12081.0"},{"name":"3G基站","value":"18100.0"},{"name":"4G基站","value":"13631.0"}],
        "name":"占用","value":"45311.0",selected:true},{"list1":[{"name":"备品备件","value":"1.0"},{"name":"2G基站","value":"1.0"},{"name":"3G基站","value":"3.0"}],"name":"出租","value":"5.0"},{"list1":[{"name":"2G基站","value":"1.0"},{"name":"3G基站","value":"4.0"}],"name":"闲置不可用","value":"5.0"},{"list1":[{"name":"3G基站","value":"1.0"},{"name":"4G基站","value":"2.0"},{"name":"2G基站","value":"3.0"}],"name":"闲置机房待报废","value":"6.0"},{"list1":[{"name":"3G基站","value":"134.0"},{"name":"2G基站","value":"9.0"},{"name":"4G基站","value":"2070.0"}],"name":"空闲","value":"2213.0"},{"list1":[{"name":"仪器仪表","value":"42.0"},{"name":"备品备件","value":"1174.0"}],"name":"闲置待报废","value":"1216.0"},{"list1":[{"name":"3G基站","value":"49.0"},{"name":"备品备件","value":"7500.0"},{"name":"2G基站","value":"40.0"},{"name":"4G基站","value":"10.0"},{"name":"仪器仪表","value":"71.0"}],"name":"闲置可利用","value":"7670.0"}]};
  	
    this.$store.dispatch("resource_status_pro",{source:"XDL"}).then((resp)=>{
    	var items=resp.body.data
    	for (var i = items.length - 1; i >= 0; i--) {
    	    items[i].selected=false;
    	}    
        this.pieDataXDL=items;        

        setTimeout(()=>{
        	this.handlePieXDLClick(items[0]);
        },1000)    
    });

    this.$store.dispatch("resource_status_pro",{source:"DT"}).then((resp)=>{
    	var items=resp.body.data
    	for (var i = items.length - 1; i >= 0; i--) {
    	    items[i].selected=false;
    	}    
        this.pieDataDT=items;        

        setTimeout(()=>{
        	this.handlePieDTClick(items[0]);
        },1000)    
    });
    this.$store.dispatch("resource_status_pro",{source:"ZX"}).then((resp)=>{
    	var items=resp.body.data
    	for (var i = items.length - 1; i >= 0; i--) {
    	    items[i].selected=false;
    	}    
        this.pieDataZX=items;        

        setTimeout(()=>{
        	this.handlePieZXClick(items[0]);
        },1000)    
    });

    
  },
  methods:{
  	handlePieXDLClick(params){
        // console.log(params)
        this.statusNameXDL=params.name;
        var selectedObj=_.where(this.pieDataXDL,{name:params.name});
        this.optionSubPieXDL={
            title: { 
                left:'right'
            },
            tooltip:{},
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: '55%',
                    data:selectedObj[0].list1
                }
            ]
        }  
    },
    handleSubPieXDLClick(params){
        console.log(params)
    },
    drawPieXDL(){    	
        this.optionPieXDL={
            title: { 
                // text: '全区物资类型分布',
                left:'right'
            },
            tooltip:{},
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: '75%',
                    data:this.pieDataXDL
                }
            ]
        }         
    },
    handlePieDTClick(params){
        // console.log(params)
        this.statusNameDT=params.name;
        var selectedObj=_.where(this.pieDataDT,{name:params.name});
        this.optionSubPieDT={
            title: { 
                left:'right'
            },
            tooltip:{},
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: '55%',
                    data:selectedObj[0].list1
                }
            ]
        }  
    },
    handleSubPieDTClick(params){
        console.log(params)
    },
    drawPieDT(){    	
        this.optionPieDT={
            title: { 
                // text: '全区物资类型分布',
                left:'right'
            },
            tooltip:{},
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: '75%',
                    data:this.pieDataDT
                }
            ]
        }         
    },
    handlePieZXClick(params){
        // console.log(params)
        this.statusNameZX=params.name;
        var selectedObj=_.where(this.pieDataZX,{name:params.name});
        this.optionSubPieZX={
            title: { 
                left:'right'
            },
            tooltip:{},
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: '55%',
                    data:selectedObj[0].list1
                }
            ]
        }  
    },
    handleSubPieZXClick(params){
        console.log(params)
    },
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
                    radius: '75%',
                    data:this.pieDataZX
                }
            ]
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
    margin-top: 1em;
    margin-bottom: 2em;
}

    


</style>

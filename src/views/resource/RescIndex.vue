<template>
  <div class="index">
    <div class="menu">
        <div class="container">
            <div style="float:right;">
                <div v-for="x of menus" class="menu-item">
                    <router-link :to="x.to">{{x.name}}</router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
    	<button type="button" class="btn btn-default btn-lg">
		  <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star
		</button>
    </div>
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
    	
        <div class="row">      	
            <div class="col-md-12 content">             
                
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>

import Chart from '@/components/Chart'

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

  	var data={"flag":"Y","total":"7","data":[{"list1":[{"name":"备品备件","value":"426.0"},{"name":"仪器仪表","value":"1073.0"},{"name":"2G基站","value":"12081.0"},{"name":"3G基站","value":"18100.0"},{"name":"4G基站","value":"13631.0"}],"name":"占用","value":"45311.0"},{"list1":[{"name":"备品备件","value":"1.0"},{"name":"2G基站","value":"1.0"},{"name":"3G基站","value":"3.0"}],"name":"出租","value":"5.0"},{"list1":[{"name":"2G基站","value":"1.0"},{"name":"3G基站","value":"4.0"}],"name":"闲置不可用","value":"5.0"},{"list1":[{"name":"3G基站","value":"1.0"},{"name":"4G基站","value":"2.0"},{"name":"2G基站","value":"3.0"}],"name":"闲置机房待报废","value":"6.0"},{"list1":[{"name":"3G基站","value":"134.0"},{"name":"2G基站","value":"9.0"},{"name":"4G基站","value":"2070.0"}],"name":"空闲","value":"2213.0"},{"list1":[{"name":"仪器仪表","value":"42.0"},{"name":"备品备件","value":"1174.0"}],"name":"闲置待报废","value":"1216.0"},{"list1":[{"name":"3G基站","value":"49.0"},{"name":"备品备件","value":"7500.0"},{"name":"2G基站","value":"40.0"},{"name":"4G基站","value":"10.0"},{"name":"仪器仪表","value":"71.0"}],"name":"闲置可利用","value":"7670.0"}]};
  	
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
  	Chart
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

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
        <div class="row">    	
            <div class="col-md-12">             
                <Chart width="100%" height="300px" :option="optionLine" theme='shine' @chartClick="handleClick" loading></Chart>
            </div>
            <div class="col-md-12">
                <div class="alert alert-info" role="alert">请点击采购单对应月份</div>
            
            </div>
        </div>
    </div>
    <div id="panels" class="container">
        <div v-for="x of buyorders" class="panel panel-default">
            <div class="panel-heading">{{x.buyorder_code}}<span style="margin-left:2em;">{{x.buy_user}}</span><span style="float:right;">{{x.importtime}}</span></div>
            <div class="panel-body">
                <div class="list-group">
                  <a :href="'/traceTimeLine?buygoods_id='+y.id" v-for="y of x.buygoods" class="list-group-item">
                    <span>{{y.goodstype_code}}</span><span style="margin-left:2em;">{{y.goodstype_descp}}</span><span style="float:right;">{{y.buy_count}}{{y.unit}}</span>
                  </a>
                </div>
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
        comp_id:this.$route.params["comp_id"],
        menus:[],
        buyorders:[],
        year:'2017',
        month:'01',
        optionLine:{}
    }
    
  },
  mounted(){
   

    this.$store.dispatch("trace_index",{comp_id:this.comp_id}).then((resp)=>{
        this.optionLine={
            title: {
                text: resp.body.message+'(万元)',
                left:'center'
            },
            tooltip: {},
            legend: {
                left:'left',
                data:['2015','2016','2017']
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : resp.body.itemMap.months
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series: [{
                name: '2015',
                type: 'line',
                data: resp.body.itemMap["2015"]
            },
            {
                name: '2016',
                type: 'line',
                data: resp.body.itemMap["2016"]
            },
            {
                name: '2017',
                type: 'line',
                data: resp.body.itemMap["2017"]
            }]
        }       
    });

    
  },
  methods:{
  	handleClick(params){
        console.log(params)
        // this.$router.push({name:"TraceBuyGoods",params:{comp_id:this.comp_id},query:{year:params.seriesName,month:params.name}})
        this.year=params.seriesName
        this.month=params.name
        this.$store.dispatch("trace_buyGoods",{comp_id:this.comp_id,year:this.year,month:this.month}).then(resp=>{
            console.log(resp.body.items)
            this.buyorders = resp.body.items;
        });
    }
  },
  components:{
  	Chart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>



.table{
    td:not(:first-child),th:not(:first-child){
        text-align: right;
    }
}   


</style>

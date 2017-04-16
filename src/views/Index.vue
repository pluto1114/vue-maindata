<template>
  <div class="index">
    <div class="menu">
        <div class="container">
            <div style="float:right;">
                <div v-for="x of menus" class="menu-item">
                    {{x.name}}
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-7">
                <Chart width="100%" height="500px" :option="optionMap" theme='infographic' @chartClick="handleMapClick" loading></Chart>
            </div>
            <div class="col-md-5">
                <Chart width="100%" height="300px" :option="optionType" theme='shine' @chartClick="handleMapClick" loading></Chart>
                <Chart width="100%" height="200px" :option="optionLine" theme='shine' @chartClick="handleMapClick" loading></Chart>
            </div>
        </div>
    </div>
    <div class="container order-list">
        <div class="row">
            <div class="col-md-3">
                <div class="title">库存排名</div>
                <ul>
                    <li v-for="x of orderInfo1"><span class="amount">{{x.value}}</span>{{x.name}}</li>
                </ul>
            </div>
            <div class="col-md-3">
                <div class="title">项目建设排名</div>
                <ul>
                    <li v-for="x of orderInfo1"><span class="amount">{{x.value}}</span>{{x.name}}</li>
                </ul>
            </div>
            <div class="col-md-3">
                <div class="title">装机排名</div>
                <ul>
                    <li v-for="x of orderInfo1"><span class="amount">{{x.value}}</span>{{x.name}}</li>
                </ul>
            </div>
            <div class="col-md-3">
                <div class="title">物资使用排名</div>
                <ul>
                    <li v-for="x of orderInfo1"><span class="amount">{{x.value}}</span>{{x.name}}</li>
                </ul>
            </div>

        </div>
    </div>
  </div>
</template>

<script>

import Chart from '@/components/Chart'
export default {
  name: 'index',
  data () {
    return {
        menus:[{name:"物资分布分析"},{name:"项目建设分析"},{name:"闲置物资分析"},{name:"终端设备分析"},{name:"线上资源分析"}],
        optionMap:{},
        optionType:{},
        optionLine:{},
        orderInfo1:[],
        orderInfo2:[],
        orderInfo3:[],
        orderInfo4:[]
    }
    
  },
  mounted(){
    var users = [
      { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
      { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
    ];

    // console.log(_.where(users, { 'age': 36, 'active': false }));
  	this.$store.dispatch("main_map").then((resp)=>{
        this.optionMap = {
            title: {
                text: '全区物资分布情况',
                //subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params, ticket, callback) {
                    return this.toHTML(params,resp);
                }.bind(this)
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:['当前量']
            },
            visualMap: {
                min: 0,
                max: 30000000,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'left',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '当前量',
                    type: 'map',
                    mapType: '内蒙古',
                    zoom:1.26,
                    label: {
                        normal: {
                            show: true,
                           
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:resp.body.itemMap.curValues
                }
            ]
        };
    });
    
    

    this.$store.dispatch("main_goodsType").then((resp)=>{
        this.optionType={
            title: { 
                text: '全区物资类型分布(万元)',
                left:'right'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            roseType: 'radius',
            avoidLabelOverlap: true,
            label: {
                normal: {
                    show: true,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: ['40%','55%'],
                    data:resp.body.items
                }
            ]
        }        
    });

    this.$store.dispatch("main_buyGoods").then((resp)=>{
        this.optionLine={
            title: {
                text: '全区采购变化趋势(万元)',
                left:'right'
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

    this.$store.dispatch("main_orderInfo").then((resp)=>{
        this.orderInfo1=resp.body.itemMap.storeGoods;
    });
  },
  methods:{
  	handleMapClick(params){
        console.log("push")
        this.$router.push('/second') 
        if (params.componentType === 'series') {
            this.comp_id=params.data.id; 
            this.$router.push('/second')   
        }
    },
    toHTML(params,resp){
        var buyInfo=_.where(resp.body.itemMap.buyInfo,{id:params.data.id});
        var outInfo=_.where(resp.body.itemMap.outInfo,{id:params.data.id});
        if(buyInfo.length==0){
            buyInfo[0]={order_count:0,value:0};
        }
        if(outInfo.length==0){
            outInfo[0]={order_count:0,value:0};
        }
        return params.name+"<br/>库存金额      "+params.data.value
        +"<br/><br/>本年采购单数  "+buyInfo[0].order_count+"<br/>本年采购金额  "+buyInfo[0].value
        +"<br/><br/>本年出库单数  "+outInfo[0].order_count+"<br/>本年出库金额  "+outInfo[0].value;
    }
  },
  components:{
  	Chart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.menu-item{
    padding-left:20px;
    float:left;
}
.menu-item::before{
    padding-right:20px;
    content: "|";
}
.order-list{
    .title{

    }
    .amount{
        float:right;
    }
    ul{
        padding-left: 1em;
        li{
            list-style: none;
            text-align: left;
            padding-right: 1em;
        }
    }
    
}

</style>

<template>
  <div class="index">
    <MyMenu :items="menus"></MyMenu>
    <div class="container">
        <div class="row">
            <div class="col-md-7">
                <Chart width="100%" height="600px" :option="optionMap" theme='infographic' @chartClick="handleMapClick" loading></Chart>
            </div>
            <div class="col-md-5">
                <Chart width="100%" height="300px" :option="optionType" theme='infographic' @chartClick="handleMapClick" loading></Chart>
                <Chart width="100%" height="280px" :option="optionLine" theme='shine' @chartClick="handleMapClick" loading></Chart>
            </div>
        </div>
    </div>
    <div class="container order-list">
        <div class="row">
            <div class="col-md-3 order-1">
                <div class="title"><img src="static/img/t-icon-1.fw.png"/>全区ERP物资</div>
                <ul>
                    <li v-for="x of orderInfo1">
                        <div><span class="amount">{{x.value}}</span>{{x.d_name}}</div>
                    </li>
                </ul>
            </div>
            <div class="col-md-3 order-2">
                <div class="title"><img src="static/img/t-icon-2.fw.png"/>全区商城物资</div>
                <ul>
                    <li v-for="x of orderInfo2">
                        <div><span class="amount">{{x.value}}</span>{{x.d_name}}</div>
                    </li>
                </ul>
            </div>
            <div class="col-md-3 order-3">
                <div class="title"><img src="static/img/t-icon-3.fw.png"/>全区工程项目</div>
                <ul>
                    <li v-for="x of orderInfo3">
                        <div><span class="amount">{{x.value}}</span>{{x.d_name}}</div>
                    </li>
                </ul>
            </div>
            <div class="col-md-3 order-4">
                <div class="title"><img src="static/img/t-icon-4.fw.png"/>全区固网终端</div>
                <ul>
                    <li v-for="x of orderInfo4">
                        <div><span class="amount">{{x.value}}</span>{{x.d_name}}</div>
                    </li>
                </ul>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import MyMenu from '@/components/MyMenu'
import Chart from '@/components/Chart'
export default {
  name: 'index',
  data () {
    return {
        menus:[
            {name:"库存物资分析",to:"/store"},
            {name:"工程项目分析",to:"/"},
            {name:"营销物资分析",to:"/"},
            {name:"固网终端分析",to:"/resource/terminalIndex"},
            {name:"运维物资分析",to:"/resource"},
            {name:"网络资源分析",to:"/resource"},
            {name:"综合查询",to:"/resource"},
        ],
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
                    return this.toHTML(params,resp.body.items);
                }.bind(this)
            },
            
            visualMap: {
                min: 0,
                max: 30000000,
                left: 'left',
                top: 'top',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true
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
                    data:resp.body.items
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
            // roseType: 'radius',
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
                    radius: ['20%','55%'],
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
        this.orderInfo1=_.where(resp.body.items,{group_index:1});
        this.orderInfo2=_.where(resp.body.items,{group_index:2});
        this.orderInfo3=_.where(resp.body.items,{group_index:3});
        this.orderInfo4=_.where(resp.body.items,{group_index:4});
    });
    // this.orderInfo1=[
    //     {name:"正常库存",value:0,to:""},
    //     {name:"非正常库存",value:0,to:""},
    //     {name:"工程物资总额",value:0,to:""},
    //     {name:"闲置物资数量",value:0,to:""},
    // ]
    // this.orderInfo2=[
    //     {name:"工程物资总额",value:0,to:""},
    //     {name:"运维物资总额",value:0,to:""},
    //     {name:"营销物资总额",value:0,to:""},
       
    // ]
    // this.orderInfo3=[
    //     {name:"工程项目总数",value:0,to:""},
    //     {name:"工程物资总额",value:0,to:""},
    //     {name:"在建项目总数",value:0,to:""},
    //     {name:"在建项目总额",value:0,to:""},
    // ]
    // this.orderInfo4=[
    //     {name:"光猫入库量",value:0,to:""},
    //     {name:"光猫装机量",value:0,to:""},
    //     {name:"机顶盒在库量",value:0,to:""},
    //     {name:"机顶盒装机量",value:0,to:""},
    // ]
  },
  methods:{
  	handleMapClick(params){
        this.$router.push({name:'IndexCity', params: { comp_id: params.data.comp_id }})
    },
    toHTML(params,items){
        var arr=_.where(items,{comp_id:params.data.comp_id});
        var str="";
        for (var i = 0;i<arr.length;i++){
            str+="<br />"+arr[i].d_name+"  "+arr[i].value
        }
        return params.name+str;
        // return params.data.comp_id;
    }
  },
  components:{
  	Chart,MyMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.order-list{
    a{
        color:#333;
    }
    .title{
        font-size:1.25em;
        img{
            margin-right: 0.3em;
        }
        margin: 0.5em 0;
    }
    .amount{
        float:right;
    }
    ul{
        padding-left: 0;
        li{
            list-style: none;
            text-align: left;
            padding-left: 1.5em;
            padding-right: 1em;
            line-height:2.4em;
        }
    }
    .order-1{
        li:nth-child(2n-1){
            background-color:#D4999F;
        }
    }
    .order-2{
        li:nth-child(2n-1){
            background-color:#EBCF26;
        }
    }
    .order-3{
        li:nth-child(2n-1){
            background-color:#8ECFC7;
        }
    }
    .order-4{
        li:nth-child(2n-1){
            background-color:#BBC9A6;
        }
    }
    
}

</style>

<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
        
        <div class="row">
            <div class="col-md-3">
                <Chart width="100%" height="400px" :option="optionNormal" theme='macarons' @chartClick="handleNormalClick" loading></Chart>
            </div>
            <div class="col-md-3">
                <Chart width="100%" height="400px" :option="optionProject" theme='macarons' @chartClick="handleNormalClick" loading></Chart>
            </div>
            <div class="col-md-6">
                <Chart width="100%" height="300px" :option="optionBar" theme='macarons' @chartClick="handleNormalClick" loading></Chart>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <div class="row">
                    <div class="col-md-3"><i class="fa fa-database fa-4x" aria-hidden="true"></i></div>
                    <div class="col-md-9 total">
                        <div class="title">全区库存物资总额</div>
                        <div class="number">243026</div>
                    </div>
                </div>
                <div class="row store-year">
                    <div class="col-md-4">
                        <div class="percent">33%</div>
                        <div class="">2015</div>
                    </div>
                    <div class="col-md-4">
                        <div class="percent">35%</div>
                        <div class="">2016</div>
                    </div>
                    <div class="col-md-4">
                        <div class="percent">32%</div>
                        <div class="">2017</div>
                    </div>
                    
                </div>
            </div>
            
            <div class="col-md-9">
                <Chart width="100%" height="300px" :option="optionBarCity" theme='macarons' @chartClick="handleNormalClick" loading></Chart>
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
        optionNormal:{},
        optionProject:{},
        optionBar:{},
        optionBarCity:{}
    }    
  },
  watch:{
    
  },
  mounted(){
    // this.menus=[{name:"终端设备分析",to:`/third/${this.comp_id}`},{name:"线上资源分析",to:"/third"},{name:"采购物资跟踪",to:`/trace/month/${this.comp_id}`}];
    this.$store.dispatch("city_index",{comp_id:2}).then((resp)=>{ 
        this.optionNormal = {
            title:{
                text:"账龄180天内",
                left:"center"
            },
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: 50, name: '正常率'}]
                }
            ]
        };
        this.optionProject = {
            title:{
                text:"工程物资占比",
                left:"center"
            },
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: 50, name: '工程'}]
                }
            ]
        };
    });

    this.optionBar = {
        // color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };

  

    this.optionBarCity = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        series: [
            {
                name: '直接访问',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: '邮件营销',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
                name: '搜索引擎',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320]
            }
        ]
    };    
  },
  methods:{
  	handleNormalClick(){

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

.total{ 
    .title{

    }
    .number{
        font-size: 2em;
        line-height: 1.8em;
    }
}
.store-year{
    .percent{
        font-size: 1.6em;
        line-height: 1.8em;
    }
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

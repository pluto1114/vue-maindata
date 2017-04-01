<template>
  <div class="dashboard">
    <div id="fullpage">
        <div class="section">
            <Chart width="100%" height="80%" :option="optionMap" theme='infographic' @chartClick="handleMapClick" loading></Chart>
        </div>
        <div class="section active">
            <Chart width="100%" height="80%" :option="optionTreeMap" loading></Chart>
        </div>
        <div class="section">Some section</div>
        <div class="section">Some section</div>
    </div>
    <mu-flexbox>
      <mu-flexbox-item class="flex-demo">
        
      </mu-flexbox-item>
    </mu-flexbox> 
  </div>
</template>

<script>
import Card from '@/components/Card'
import Chart from '@/components/Chart'
import _ from 'lodash'
export default {
  name: 'dashboard',
  data () {
    return {
        optionMap:{},
      option1:{
        title: {
            text: '堆叠区域图'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
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
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {normal: {}},
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
      },
      option2:{
        title: { text: '饼图示例' },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data:[
                    {value:400, name:'搜索引擎'},
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:274, name:'联盟广告'},
                    {value:235, name:'视频广告'}
                ]
            }
        ]
      },
      option3:{
        title: { text: '示例' },
        tooltip: {},
        xAxis: {
           data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"] 
        },
        yAxis: {
          
        },
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
      },
      option4:{},
      option5:{},
      optionTreeMap:{}
    }
    
  },
  mounted(){
    $('#fullpage').fullpage();
  	this.$store.dispatch("main_map").then((resp)=>{
        this.optionMap = {
            title: {
                text: resp.body.itemMap.title,
                //subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params, ticket, callback) {
                   
                    return params.name+"<br />"+JSON.stringify(params.data);
                }
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
    
    this.$store.dispatch("main_treemap").then((resp)=>{
        console.log(resp.body.itemMap)
        this.optionTreeMap={
            title: {
                text: 'ECharts 配置项查询分布',
                subtext: '2016/04',
                left: 'leafDepth'
            },
            tooltip: {},
            series: [{
                name: 'option_1',
                type: 'treemap',
                visibleMin: 300,
                data: [resp.body.itemMap],
                leafDepth: 2
            }]
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
  	Card,Chart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.dashboard{
	padding:20px;

  .chip-container{
    margin:1em 0.6em;
    .my-chip{
      margin-right: 1.8em;
      padding: 0.4em 0.8em;
    }
  }
}

</style>

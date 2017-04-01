<template>
  <div class="index">
    <div id="fullpage">
        <div class="section">
            <Chart width="100%" height="80%" :option="optionMap" theme='infographic' @chartClick="handleMapClick" loading></Chart>
        </div>
        <div class="section">
            <Chart width="100%" height="80%" :option="optionTreeMap" theme='infographic' loading></Chart>
        </div>
        <div class="section active">
            <mu-flexbox>
              <mu-flexbox-item class="flex-demo">
                <Chart width="40%" height="400px" :option="optionProject" theme='shine' loading></Chart>
              </mu-flexbox-item>
              全区项目库存物资总金额:{{projectTotal}}
            </mu-flexbox> 
        </div>
        <div class="section">Some section</div>
    </div>
    
  </div>
</template>

<script>

import Chart from '@/components/Chart'
import _ from 'lodash'
export default {
  name: 'index',
  data () {
    return {
        optionMap:{},
        optionTreeMap:{},
        optionProject:{},
        projectTotal:0
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
        // console.log(resp.body.itemMap)
        this.optionTreeMap={
            title: {
                text: '全区物资类别总体情况',
                left: 'leafDepth'
            },
            tooltip: {},
            series: [{
                name:"大类",
                type: 'treemap',
                visibleMin: 300,
                roam:false,
                data: [resp.body.itemMap],
                leafDepth: 2,
                label:{
                    normal:{
                        textStyle:{
                            fontSize:20
                        }
                    }
                },
                levels: [
                    {
                        itemStyle: {
                            normal: {
                                color:'#90C0E5',
                                borderColor: '#555',
                                borderWidth: 4,
                                gapWidth: 4
                            }
                        }
                    },
                    {
                        colorSaturation: [0.3, 0.6],
                        itemStyle: {
                            normal: {
                                borderColorSaturation: 0.7,
                                gapWidth: 2,
                                borderWidth: 2
                            }
                        }
                    },
                    {
                        colorSaturation: [0.3, 0.5],
                        itemStyle: {
                            normal: {
                                borderColorSaturation: 0.6,
                                gapWidth: 1
                            }
                        }
                    },
                    {
                        colorSaturation: [0.3, 0.5]
                    }
                ],
                breadcrumb:{
                    height:36,
                    itemStyle:{
                        normal:{
                            textStyle:{
                                fontSize:18
                            }
                        }
                    }
                }
        
            }]
        }
    });

    this.$store.dispatch("main_projectPie").then((resp)=>{
        this.optionProject={
            title: { text: '饼图示例' },
            tooltip:{},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '75%',
                    data:resp.body.items
                }
            ]
        },
        this.projectTotal=resp.body.itemMap.total;
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



</style>

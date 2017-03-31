<template>
  <div class="storegoods">
    <mu-flexbox>
      <mu-flexbox-item class="flex-demo">
        <Chart width="100%" height="600px" :option="optionMap" theme='infographic' @chartClick="handleMapClick" loading></Chart>
      </mu-flexbox-item>
      <Chart width="600px" height="600px" :option="option2" theme='infographic'></Chart>
    </mu-flexbox>  
    
    
    <transition  name="fade"  mode="out-in">
    <div v-if="types.length > 0" class="row">
        <div class="col-sm-1">包含类型</div>
        <div class="col-sm-11">         
            <mu-checkbox name="group" v-for="x of types" :nativeValue="x.code" :key="x.code" v-model="selTypes" :label="x.name" class="type-checkbox" @change="handleChange"/> 
        </div>    
    </div> 
    </transition>
    <transition name="fade"  mode="out-in">
    <div v-if="types.length > 0" class="row">
        <div class="col-sm-1">所选地区</div>   
        <div class="col-sm-11">         
            <mu-radio v-for="x of curValues" :label="x.name" name="comp_id" :nativeValue="x.id" :key="x.id" v-model="comp_id" class="demo-radio"/>
        </div>
    </div>
    </transition>
    <div class="row">
        <transition  name="fade"  mode="out-in">
        <table v-if="items.length > 0" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    
                    <th>物资编号</th>
                    <th>物资名称</th>
                    <th>供应商</th>
                
                    <th>逻辑库</th>
 
                    <th>单位</th>
                    <th>入库数量</th>                  
                    <th>当前数量</th>  
                </tr>
            </thead>
            <tbody>
                <tr v-for="(x,index) of items">
                    <td>{{index+1}}</td>
                    <td>{{x.goodstype_code}}</td>
                    <td>{{x.goodstype_name}}</td>
                    <td>{{x.factory}}</td>
                    <td>{{x.logic_store_name}}</td>
                    <td>{{x.unit}}</td>
                    <td>{{x.in_count}}</td>
                    <td>{{x.cur_count}}</td>
                </tr>
            </tbody>
        </table>
        </transition>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart'
import { mapState } from 'vuex';
import _ from 'lodash'

export default {
  name: 'storegoods',
  data () {
    return {
        optionMap:{},
        option2:{},
        types:[],
        selTypes:[],
        items:[],
        curValues:[],
        comp_id:'1'
    }
  },
  watch:{
    'comp_id':'showItems',
    'selTypes':'showItems'
  },
  mounted(){
    console.log(this.$store.state.moduleA.mm)
    this.fresh();
    
    this.$store.dispatch("storeGoodsChart_goodstype").then((resp)=>{
        this.types=resp.body.items;
        // this.types.forEach((item)=>{
        //     this.selTypes.push(item.code)
        // })
    });
    
    
  },
  methods:{
  	handleMapClick(params){
  		if (params.componentType === 'series') {
            this.comp_id=params.data.id;    
        }
  	},
    handleChange(value){
        console.log(value)
        this.selTypes=value;
        this.$store.commit("selTypes",{selTypes:this.selTypes})
        this.fresh();
    },
    fresh(){
        this.$store.dispatch("storeGoodsChart_map",{selTypes:this.selTypes}).then((resp)=>{
            this.curValues=resp.body.itemMap.curValues
            this.optionMap = {
                title: {
                    text: resp.body.itemMap.title,
                    //subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
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
                        data:this.curValues
                    }
                ]
            };

            this.option2={
                title: { text: '地区' },
                tooltip: {},
                xAxis: {
                    
                },
                yAxis: {
                  data: _.map(this.curValues,"name")
                },
                series: [{
                    name: '金额',
                    type: 'bar',
                    data: _.map(this.curValues,"value")
                }]
            }
        });
    },
    showItems(){
        this.fresh();
        this.$store.dispatch("storeGoodsChart_items",{selTypes:this.selTypes,comp_id:this.comp_id}).then((resp)=>{
            this.items=resp.body.items;
        });
    },
    randomData() {
        return Math.round(Math.random()*1000);
    }
  },
  components:{
  	Chart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.storegoods{
    
}
.row{
    margin-top: 1.5em;  
}
.type-checkbox{
    margin-right: 1em;
    line-height:2em;   
}
.demo-raised-button{
    margin-top:1em;
}
.table{
    font-size:1.15em;
    td{
        padding:0.9em 0.3em;
        max-width:8em;
    }
}
</style>

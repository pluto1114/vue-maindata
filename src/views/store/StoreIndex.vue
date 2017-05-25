<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
        
        <div class="row">
            <div class="col-md-3">
                <Chart width="100%" height="400px" :option="optionNormal" theme='macarons' loading></Chart>
            </div>
            <div class="col-md-3">
                <Chart width="100%" height="400px" :option="optionProject" theme='macarons' loading></Chart>
            </div>
            <div class="col-md-6">
                <Chart width="100%" height="300px" :option="optionBar" theme='macarons' @chartClick="handleCityClick" loading></Chart>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <div class="row">
                    <div class="col-md-3"><i class="fa fa-database fa-4x" aria-hidden="true"></i></div>
                    <div class="col-md-9 total">
                        <div class="title">全区库存物资总额</div>
                        <div class="number">{{infoMap.totalValue|money}}</div>
                    </div>
                </div>
                <div class="row store-year">
                    <div v-for="(x,index) of infoMap.yearValues" class="col-md-3">
                        <div class="percent">{{parseInt(x*100/infoMap.totalValue)}}%</div>
                        <div class="">{{2014+index}}</div>
                    </div>  
                </div>
                <div class="row store-amount" style="margin-top:2em;">
                    <div class="col-md-6">入库年份</div>
                    <div class="col-md-6">当前余量</div>
                </div>
                <div v-for="(x,index) of infoMap.yearValues" class="row store-amount">
                    <div class="col-md-6">{{2014+index}}</div>
                    <div class="col-md-6">￥{{(x/10000).toFixed()}}万元</div>                 
                </div>
            </div>

            <div class="col-md-6">
                <Chart width="100%" height="400px" :option="optionPie" theme='macarons' @chartClick="handleNormalClick" loading></Chart>
            </div>

            <div class="col-md-3 goodstype-order">                
                <h3>物资类型排行</h3>
                <transition name="fade"  mode="out-in">
                <ol v-if="goodstypeOrderBy.length>0">
                    <li v-for="x of goodstypeOrderBy">{{x.name}}<span>{{parseInt(x.value/10000)}}万</span></li>
                </ol>                
                </transition>
            </div>    
        </div>

        <div class="row age">
            <div class="col-sm-3">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <i class="fa fa-anchor fa-2x pull-left"></i>
                    <div class="pull-left">
                        <div class="title">库龄90天以内</div>
                        <div class="total">{{totals[0]|money}}</div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="progress">
                        <div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" :style="{width: percents[0]+'%'}">
                            {{percents[0]|fix(1)}}%
                        </div>
                    </div>
                  </div>
                </div>
                <ul class="list-group" v-show="showD">
                  <li class="list-group-item" v-for="(x,index) of d90">
                    <span class="pull-right">{{x.value|money}}</span>
                    <span>{{x.name}}</span>
                  </li>
                </ul>
            </div>

            <div class="col-sm-3">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <i class="fa fa-anchor fa-2x pull-left"></i>
                    <div class="pull-left">
                        <div class="title">库龄90到180天</div>
                        <div class="total">{{totals[1]|money}}</div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="progress">
                        <div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" :style="{width: percents[1]+'%'}">
                            {{percents[1]|fix(1)}}%
                        </div>
                    </div>
                  </div> 
                </div>
                <ul class="list-group" v-show="showD">
                  <li class="list-group-item" v-for="(x,index) of d180">
                    <span class="pull-right">{{x.value | money}}</span>
                    <span>{{x.name}}</span>
                  </li>
                </ul>
            </div>

            <div class="col-sm-3">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <i class="fa fa-anchor fa-2x pull-left"></i>
                    <div class="pull-left">
                        <div class="title">库龄180到360天</div>
                        <div class="total">{{totals[2]|money}}</div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="progress">
                        <div class="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" :style="{width: percents[2]+'%'}">
                            {{percents[2]|fix(1)}}%
                        </div>
                    </div>
                  </div>
                </div>
                <ul class="list-group" v-show="showD">
                  <li class="list-group-item" v-for="(x,index) of d360">
                    <span class="pull-right">{{x.value | money}}</span>
                    <span>{{x.name}}</span>
                  </li>
                </ul>
            </div>

            <div class="col-sm-3">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <i class="fa fa-anchor fa-2x pull-left"></i>
                    <div class="pull-left">
                        <div class="title">库龄360天以上</div>
                        <div class="total">{{totals[3]|money}}</div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="progress">
                        <div class="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" :style="{width: percents[3]+'%'}">
                            {{percents[3]|fix(1)}}%
                        </div>
                    </div>
                  </div>
                </div>
                <ul class="list-group" v-show="showD">
                  <li class="list-group-item" v-for="(x,index) of d360up">
                    <span class="pull-right">{{x.value | money}}</span>
                    <span>{{x.name}}</span>
                  </li>
                </ul>
            </div>

            <div class="col-sm-12">
                <button type="button" class="btn btn-default btn-block" v-if="!showD" @click="showD=true">查看库龄详情</button>
            </div>
        </div>
        
        <div class="panel panel-default compare">
            <div class="panel-body">
            body
            </div>
        </div>

        <div class="panel panel-default compare">
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-2">
                        <div class="list-group">
                          <button type="button"  @click="handleCompSel(1)" class="list-group-item" :class="{active:1==comp_id}">
                            <i class="fa fa-map-o" aria-hidden="true"></i>全区库存
                          </button>
                          <button type="button" v-for="x of cities" @click="handleCompSel(x.id)" class="list-group-item" :class="{active:x.id==comp_id}"><i class="fa fa-info-circle" aria-hidden="true"></i>{{x.name}}库存</button>
                         
                        </div>
                    </div>
                    <div class="col-md-10">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <Chart width="100%" height="550px" :option="optionYear" theme='macarons' @chartClick="handleNormalClick" loading></Chart>
                            </div>
                        </div>
                    </div>
                </div>
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
        menus:[{name:"线上资源分析",to:"/third"}],
        infoMap:{},
        cities:[],
        optionNormal:{},
        optionProject:{},
        optionBar:{},
        optionPie:{},
        goodstypeOrderBy:[],
        d90:[],
        d180:[],
        d360:[],
        d360up:[],
        totals:[],
        percents:[],
        showD:false,
        optionYear:{},
    }    
  },
  computed:{
    comp_id(){
        return this.$store.state.myStore.comp_id
    }
  },
  watch:{
    
  },
  mounted(){
    console.log("comp",this.comp_id)
    this.$store.dispatch("store_index").then((resp)=>{
        this.infoMap=resp.body.itemMap;
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
                    name: '正常库存',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: parseInt(this.infoMap.normalValue*100/this.infoMap.totalValue), name: '正常率'}]
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
                    name: '工程物资',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: parseInt(this.infoMap.projectValue*100/this.infoMap.totalValue), name: '工程'}]
                }
            ]
        };

        this.cities=this.infoMap.cityValues;
        for (var i = this.cities.length - 1; i >= 0; i--) {
            this.cities[i].to={name:"StoreCityIndex",params:{comp_id:this.cities[i].id}};
        }

        this.menus=this.cities;
        this.optionBar = {
            title:{
                text:'全区库存分布'
            },
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
                    data : _.pluck(this.cities,'name'),
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
                    name:'库存金额',
                    type:'bar',
                    barWidth: '60%',
                    data:_.pluck(this.cities,'value')
                }
            ]
        };


        
    });

    this.$store.dispatch("store_index_goodstype").then((resp)=>{
        this.goodstypeOrderBy=resp.body.items;
    });

    this.$store.dispatch("store_index_logic").then((resp)=>{
        this.optionPie={
            title: { 
                text: '各逻辑库占比(万元)',
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
                    radius: ['20%','60%'],
                    data:resp.body.items
                }
            ]
        }        
    });

    this.$store.dispatch("store_index_age").then((resp)=>{
        this.d90=_.sortByOrder(resp.body.itemMap.d90,['value'],['desc']);
        this.d180=_.sortByOrder(resp.body.itemMap.d180,['value'],['desc']);
        this.d360=_.sortByOrder(resp.body.itemMap.d360,['value'],['desc']);
        this.d360up=_.sortByOrder(resp.body.itemMap.d360up,['value'],['desc']);

        this.totals[0]=_.reduce(_.pluck(this.d90,'value'), (total, next)=>total+=next)
        this.totals[1]=_.reduce(_.pluck(this.d180,'value'), (total, next)=>total+=next)
        this.totals[2]=_.reduce(_.pluck(this.d360,'value'), (total, next)=>total+=next)
        this.totals[3]=_.reduce(_.pluck(this.d360up,'value'), (total, next)=>total+=next)

        let total=_.reduce(this.totals,(total,n)=>total+=n)
        this.totals.forEach((item,i)=>{this.percents[i]=this.totals[i]/total*100});

    });

    this.showCompareHis(1)

    

    
  },
  methods:{
    handleCityClick(params){
        console.log(params)
        let city=_.find(this.cities,{name:params.name});
        console.log(city)
        this.$store.commit("setCompId",city.id);
        this.$router.push({name:"StoreCityIndex",params:{comp_id:city.id}});
    },
  	handleNormalClick(){

    },
    handleCompSel(comp_id){
        this.$store.commit("setCompId",comp_id);
        this.showCompareHis(comp_id);
    },
    showCompareHis(comp_id){
        this.$store.dispatch("store_index_compareHis",{comp_id:comp_id}).then((resp)=>{
        this.optionYear = {
            title: {
                text: '库存去年同期比较'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['2016','2017']
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : _.pluck(resp.body.itemMap.lastYear,'month')
                }
            ],
            yAxis: [
                {
                    type : 'value'
                }
            ],
            series: [{
                name: '2016',
                type: 'line',
                data: _.pluck(resp.body.itemMap.lastYear,'value')
            },{
                name: '2017',
                type: 'line',
                data: _.pluck(resp.body.itemMap.thisYear,'value')
            }]
        }
    });
    }
  },
  components:{
  	Chart,MyMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../assets/animate.less';
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
.store-amount{
    line-height: 2em;
    font-size: 1.2em;
}
.goodstype-order{
    h3{
        margin-top: 0;
    }
    ol{
        margin-top:1.5em;
        margin-left: 1em;
        li{
            line-height: 2em;
            font-size: 1.12em;
            span{
                float:right;
            }

        }
    }
}

.age{
    .panel{
        i{
            font-size: 2.5em;
            line-height: 1.8em;
            margin-right: 0.5em;
        }
        .title{
            opacity: 0.8;
        }
        .total{
            padding: 0.2em 0;
            font-size: 1.8em;
        }
        .progress{
            margin-top: 0.8em;
        }
    }
    .list-group{
        .animated; // Initiate animation library
        .bounceInUp;
    }
}

.compare{
    margin-top: 2em;
    .fa{
        margin-right: 1.5em;
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

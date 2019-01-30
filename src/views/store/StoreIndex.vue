<template>
    <div class="index">
        <MyMenu :items="menus" back=true @click:search="handleSearch" @click:all="handleAll"></MyMenu>

        <div class="container">

            <div class="row">
                <div class="col-md-3">
                    <Chart width="100%" height="400px" :option="optionNewAge" theme='macarons' @chartClick="handleClickForAgePie" loading></Chart>
                </div>
                <div class="col-md-3">
                    <Chart width="100%" height="400px" :option="optionFree" theme='macarons' @chartClick="handleClickForFreePie" loading></Chart>
                </div>
                <div class="col-md-6">
                    <Chart width="100%" height="300px" :option="optionBar" theme='macarons' @chartClick="handleCityClick" loading></Chart>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="row">
                        <div class="col-md-3">
                            <i class="fa fa-database fa-4x" aria-hidden="true"></i>
                        </div>
                        <div class="col-md-9 total">
                            <div class="title">全区库存物资总额</div>
                            <div class="number">￥{{infoMap.totalValue|money}}</div>
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
                    <Chart width="100%" height="400px" :option="optionPie" theme='macarons' loading></Chart>
                </div>

                <div class="col-md-3 goodstype-order">
                    <h3>物资类型排行</h3>

                    <ol v-if="goodstypeOrderBy.length>0">
                        <li v-for="x of goodstypeOrderBy" class="my-item" :key="x">{{x.name}}
                            <span>{{parseInt(x.value/10000)}}万</span>
                        </li>
                    </ol>

                </div>
            </div>

            <div id="age" class="row age">

                <div class="col-sm-4">
                    <div class="panel panel-default" @click="handleShowD">
                        <div class="panel-body">
                            <i class="fa fa-anchor fa-2x pull-left"></i>
                            <div class="pull-left">
                                <div class="title">正常库存（150天以内）</div>
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

                    <ul class="list-group text-success" v-show="showD">
                        <li class="list-group-item" v-for="(x,index) of d150" :key="x" @click="handleClickForAge('d150',x.code)">
                            <span class="pull-right">{{x.value|money}}</span>
                            <span>{{x.name}}</span>
                        </li>
                    </ul>

                </div>

                <div class="col-sm-4">
                    <div class="panel panel-default" @click="handleShowD">
                        <div class="panel-body">
                            <i class="fa fa-anchor fa-2x pull-left"></i>
                            <div class="pull-left">
                                <div class="title">临界库存（150到180天）</div>
                                <div class="total">{{totals[1]|money}}</div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="progress">
                                <div class="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" :style="{width: percents[1]+'%'}">
                                    {{percents[1]|fix(1)}}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="list-group text-warning" v-show="showD">
                        <li class="list-group-item" v-for="(x,index) of d180" :key="x" @click="handleClickForAge('d180',x.code)">
                            <span class="pull-right">{{x.value | money}}</span>
                            <span>{{x.name}}</span>
                        </li>
                    </ul>
                </div>

                <div class="col-sm-4">
                    <div class="panel panel-default" @click="handleShowD">
                        <div class="panel-body">
                            <i class="fa fa-anchor fa-2x pull-left"></i>
                            <div class="pull-left">
                                <div class="title">非正常库存（180天以上）</div>
                                <div class="total">{{totals[2]|money}}</div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="progress">
                                <div class="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" :style="{width: percents[2]+'%'}">
                                    {{percents[2]|fix(1)}}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="list-group text-danger" v-show="showD">
                        <li class="list-group-item" v-for="(x,index) of u180" :key="x" @click="handleClickForAge('u180',x.code)">
                            <span class="pull-right">{{x.value | money}}</span>
                            <span>{{x.name}}</span>
                        </li>
                    </ul>
                </div>

                <div class="col-sm-12">
                    <button type="button" class="btn btn-default btn-block" @click="handleShowD">{{showD?"收起":"查看库龄详情"}}</button>
                </div>

            </div>

            <div class="panel panel-default compare">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="list-group">
                                <button type="button" @click="handleCompSel(1)" class="list-group-item" :class="{active:1==comp_id}">
                                    <i class="fa fa-map-o" aria-hidden="true"></i>全区库存
                                </button>
                                <button type="button" v-for="x of cities" @click="handleCompSel(x.id)" class="list-group-item" :class="{active:x.id==comp_id}">
                                    <i class="fa fa-lightbulb-o" aria-hidden="true"></i>{{x.name}}库存</button>

                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="panel panel-default">
                                <div class="panel-body cur-month">
                                    <h4>
                                        <a @click="handleInAmountClick(comp_id)" class="pull-right">详情</a>
                                        <i class="fa fa-tree"></i>本月入库金额：
                                        <transition name="fade" mode="out-in">
                                            <span class="money" v-show="curMonthShow">{{curMonthIn|money}}</span>
                                        </transition>
                                    </h4>
                                    <h4>
                                        <a @click="handleOutAmountClick(comp_id)" class="pull-right">详情</a>
                                        <i class="fa fa-sign-out"></i>本月出库金额：
                                        <transition name="fade" mode="out-in">
                                            <span class="money" v-show="curMonthShow">{{curMonthOut|money}}</span>
                                        </transition>
                                    </h4>
                                </div>
                            </div>
                            <Chart width="100%" height="500px" :option="optionYear" theme='macarons' loading></Chart>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel panel-default l2">
                <div class="panel-heading">
                    <h4>二级库库存信息</h4>
                </div>
                <div class="panel-body">
                    <div v-for="(x,index) of l2Info" class="city-one">
                        <h4>{{x.name}}</h4>
                        <ul v-for="y of x.l2_depts">
                            <li @click="handleCountyClick(y.code)">{{y.name}}（{{y.value|money}}）</li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>

        <MyModal :option='monthModalOption' title="物资详情" small>
            <Chart width="550px" height="400px" :option="optionPieMonth" theme='macarons' @chartClick="handleClickForPie" loading></Chart>
            <ul class="list-group" style="font-size:1.125em;">
                <li class="list-group-item" v-for="x of goodstypeMonth" :key="x" @click="handleClickForType(comp_id,x.code)">
                    <span class="pull-right">{{x.value|money}}</span>
                    <span>{{x.name}}</span>
                </li>
            </ul>
        </MyModal>
        <MyModal :option='monthDtlModalOption' title="物资明细">
            <div class="row">
                <div class="col-md-12">
                    <Excel selector="#storeIndexTable1" class="pull-right" :filename="selMonthType=='in'?'当月入库物资':'当月出库物资'">
                        <button class="btn btn-default">
                            <span class="fa fa-download"></span>
                        </button>
                    </Excel>
                </div>
            </div>
            <div style="height:630px;overflow-y:scroll;">
                <table id="storeIndexTable1" class="table">
                    <thead>
                        <tr>
                            <th>物资编号</th>
                            <th>物资名称</th>
                            <th>公司</th>
                            <th>订单号</th>
                            <th>逻辑库</th>
                            <th>实体库</th>
                            <th>单位</th>
                            <th>数量</th>
                            <th>单价</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of goodsMonth" :key="x">
                            <td>{{x.goodstype_code}}</td>
                            <td>
                                <span v-html="x.goodstype_name"></span>
                            </td>
                            <td>{{x.comp_name|sub(0,2)}}</td>
                            <td>{{x.order_code}}</td>
                            <td>{{x.logic_store_name}}</td>
                            <td>{{x.store_name}}</td>
                            <td>{{x.unit}}</td>
                            <td>{{x.count|money(2)}}</td>
                            <td>{{x.single_price}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MyModal>
        <MyModal :option='ageModalOption' title="物资明细">
            <div class="row">
                <div class="col-md-12">
                    <Excel selector="#storeIndexTable3" class="pull-right">
                        <button class="btn btn-default">
                            <span class="fa fa-download"></span>
                        </button>
                    </Excel>
                </div>
            </div>
            <div style="height:630px;overflow-y:scroll;">
                <table id="storeIndexTable3" class="table">
                    <thead>
                        <tr>
                            <th>物资编号</th>
                            <th>物资名称</th>
                            <th>公司</th>
                            <th>逻辑库</th>
                            <th>实体库</th>
                            <th>单位</th>
                            <th>入库数量</th>
                            <th>当前数量</th>
                            <th>单价</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of goodsAge" :key="x">
                            <td>{{x.goodstype_code}}</td>
                            <td>
                                <span v-html="x.goodstype_name"></span>
                            </td>
                            <td>{{x.comp_name|sub(0,2)}}</td>
                            <td>{{x.logic_store_name}}</td>
                            <td>{{x.store_name}}</td>
                            <td>{{x.unit}}</td>
                            <td>{{x.in_count}}</td>
                            <td>{{x.cur_count}}</td>
                            <td>{{x.single_price}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MyModal>
        <MyModal :option='freeModalOption' title="物资明细">
            <div class="row">
                <div class="col-md-12">
                    <Excel selector="#storeIndexTable4" class="pull-right">
                        <button class="btn btn-default">
                            <span class="fa fa-download"></span>
                        </button>
                    </Excel>
                </div>
            </div>
            <div style="height:630px;overflow-y:scroll;">
                <table id="storeIndexTable4" class="table">
                    <thead>
                        <tr>
                            <th>物资编号</th>
                            <th>物资名称</th>
                            <th>公司</th>
                            <th>逻辑库</th>
                            <th>实体库</th>
                            <th>单位</th>
                            <th>入库数量</th>
                            <th>当前数量</th>
                            <th>单价</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of goodsFree" :key="x">
                            <td>{{x.goodstype_code}}</td>
                            <td>
                                <span v-html="x.goodstype_name"></span>
                            </td>
                            <td>{{x.comp_name|sub(0,2)}}</td>
                            <td>{{x.logic_store_name}}</td>
                            <td>{{x.store_name}}</td>
                            <td>{{x.unit}}</td>
                            <td>{{x.in_count}}</td>
                            <td>{{x.cur_count}}</td>
                            <td>{{x.single_price}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MyModal>
        <MyModal :option='searchModalOption' title="库存搜索" small>
            <div class="row">
                <div class="col-sm-12">
                    <input type="text" v-model="searchText" class="form-control" placeholder="请输入搜索信息..." @keyup.enter="startSearch">
                </div>

            </div>

        </MyModal>
        <MyModal :option='allModalOption' title="库存导出" small>
            <div v-if="allStoreGoods.length==0" class="row center-block">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
            <div v-else class="row center-block ">
                <Excel selector="#storeIndexAllTable">
                    <button class="btn btn-block btn-default">
                        <span class="fa fa-download"></span>导出Excel</button>
                </Excel>
            </div>
            <div class="row hide">
                <div class="col-sm-12">

                    <table id="storeIndexAllTable" class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>物资编号</th>
                                <th>物资名称</th>
                                <th>所属公司</th>
                                <th>入库数量</th>
                                <th>占用数量</th>
                                <th>现存数量</th>
                                <th>单位</th>
                                <th>单价</th>
                                <th>入库时间</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(y,index) of allStoreGoods" :key="y.id">
                                <td>{{index+1}}</td>
                                <td>{{y.goodstype_code}}</td>
                                <td>{{y.goodstype_name}}</td>
                                <td>{{y.comp_name}}</td>
                                <td>{{y.in_count|money(1)}}</td>
                                <td>{{y.ready_out_count|money(1)}}</td>
                                <td>{{y.cur_count|money(1)}}</td>
                                <td>{{y.unit}}</td>
                                <td>{{y.single_price}}</td>
                                <td>{{y.createtime|prettyDate}}</td>
                               
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </MyModal>
    </div>
</template>

<script>

import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
import MyModal from '@/components/MyModal'
import Excel from '@/components/Excel'

export default {

    data() {
        return {
            menus: [],
            infoMap: {},
            cities: [],
            optionNewAge: {},
            optionFree: {},

            optionBar: {},
            optionPie: {},
            goodstypeOrderBy: [],
            d150: [],
            d180: [],
            u180: [],
            totals: [],
            percents: [],
            goodsAge: [],
            goodsFree: [],

            showD: false,
            optionYear: {},
            curMonthIn: 0,
            curMonthOut: 0,
            curMonthShow: true,
            optionPieMonth: {},
            goodstypeMonth: [],
            selMonthType: 'in',
            goodsMonth: [],


            l2Info: [],

            allStoreGoods: [],
            allModalOption: {},

            searchModalOption: {},
            searchText: "",
            ageModalOption: {},
            freeModalOption: {},
            monthModalOption: {},
            monthDtlModalOption: {},
        }
    },
    computed: {
        comp_id() {
            return this.$store.state.myStore.comp_id
        }
    },
    watch: {

    },
    mounted() {
        this.$store.dispatch("store_index_new_age").then((resp) => {
            this.optionNewAge = {
                title: {
                    text: '库存库龄',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                // roseType: 'radius',
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['正常', '临界', '非正常']
                },
                color: ["#5cb85c", "#f0ad4e", "#ac2925"],
                itemStyle: {
                    normal: {
                        shadowBlur: 30,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
                series: [
                    {
                        name: '状态',
                        type: 'pie',
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                        },
                        radius: ['45%', '65%'],
                        data: resp.body.items
                    }
                ]
            }
        })
        this.$store.dispatch("store_index_free").then((resp) => {
            this.optionFree = {
                title: {
                    text: '无成本库存',
                    subtext: '共计' + money(_.sum(resp.body.items, 'value')),
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                // roseType: 'radius',
                legend: {
                    orient: 'vertical',
                    left: 'left',

                },
                // color:["#5cb85c","#f0ad4e","#ac2925"],
                itemStyle: {
                    normal: {
                        shadowBlur: 30,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
                series: [
                    {
                        name: '逻辑库',
                        type: 'pie',
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                        },
                        radius: ['45%', '65%'],
                        data: resp.body.items
                    }
                ]
            }

        })
        this.$store.dispatch("store_index").then((resp) => {
            this.infoMap = resp.body.itemMap;
            this.optionNormal = {
                title: {
                    text: "账龄180天内",
                    left: "center"
                },
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },

                series: [
                    {
                        name: '正常库存',
                        type: 'gauge',
                        detail: { formatter: '{value}%' },
                        data: [{ value: parseInt(this.infoMap.normalValue * 100 / this.infoMap.totalValue), name: '正常率' }]
                    }
                ]
            };
            this.optionProject = {
                title: {
                    text: "工程物资占比",
                    left: "center"
                },
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                series: [
                    {
                        name: '工程物资',
                        type: 'gauge',
                        detail: { formatter: '{value}%' },
                        data: [{ value: parseInt(this.infoMap.projectValue * 100 / this.infoMap.totalValue), name: '工程' }]
                    }
                ]
            };

            this.cities = this.infoMap.cityValues;
            for (var i = this.cities.length - 1; i >= 0; i--) {
                this.cities[i].to = { name: "StoreCityIndex", params: { comp_id: this.cities[i].id } };
            }

            this.cities.forEach(n => {
                this.menus.push(n)
            })
            // this.menus = this.cities;
            this.menus.push({ name: "搜索", customEvent: "click:search", type: 'search' })
            this.menus.push({ name: "全区物资导出", customEvent: "click:all", type: 'all' })

            this.optionBar = {
                title: {
                    text: '全区库存分布'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: _.pluck(this.cities, 'name'),
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                itemStyle: {
                    normal: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
                series: [
                    {
                        name: '库存金额',
                        type: 'bar',
                        barWidth: '60%',
                        data: _.pluck(this.cities, 'value')
                    }
                ]
            };



        });

        this.$store.dispatch("store_index_goodstype").then((resp) => {
            this.goodstypeOrderBy = resp.body.items;
        });

        this.$store.dispatch("store_index_logic").then((resp) => {
            this.optionPie = {
                title: {
                    text: '各逻辑库占比',
                    left: 'right'
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
                itemStyle: {
                    normal: {
                        shadowBlur: 30,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
                series: [
                    {
                        name: '物资类型',
                        type: 'pie',
                        radius: ['20%', '60%'],
                        data: resp.body.items
                    }
                ]
            }
        });

        this.$store.dispatch("store_index_age").then((resp) => {
            this.d150 = _.sortByOrder(resp.body.itemMap.d150, ['value'], ['desc']);
            this.d180 = _.sortByOrder(resp.body.itemMap.d180, ['value'], ['desc']);
            this.u180 = _.sortByOrder(resp.body.itemMap.u180, ['value'], ['desc']);

            let none = { name: '无', value: 0 }
            this.d150 = this.d150.length == 0 ? [none] : this.d150;
            this.d180 = this.d180.length == 0 ? [none] : this.d180;
            this.u180 = this.u180.length == 0 ? [none] : this.u180;

            this.totals[0] = _.sum(_.pluck(this.d150, 'value'))
            this.totals[1] = _.sum(_.pluck(this.d180, 'value'))
            this.totals[2] = _.sum(_.pluck(this.u180, 'value'))

            let total = _.sum(this.totals)
            this.totals.forEach((item, i) => { this.percents[i] = this.totals[i] / total * 100 });
        });

        this.showCompareHis(1)

        this.showL2Info()

        this.$root.$emit("bannerHidden")

    },
    methods: {
        handleClickForPie(params) {
            console.log(params)
            this.handleClickForType(this.comp_id, params.data.code)
        },
        handleCityClick(params) {
            console.log(params)
            let city = _.find(this.cities, { name: params.name });
            console.log(city)
            this.$store.commit("setCompId", city.id);
            this.$router.push({ name: "StoreCityIndex", params: { comp_id: city.id } });
        },
        handleShowD() {
            if (!this.showD)
                this.showD = true
            else {
                $(".age ul").slideUp("slow", () => {
                    this.showD = false
                })
            }
        },
        handleClickForAgePie() {
            $("body,html").animate({ scrollTop: $("#age").offset().top }, 1000)
        },
        handleClickForAge(tag, level_one_code) {
            this.ageModalOption = { visable: true }
            this.goodsAge = []
            this.$store.dispatch("store_index_age_detail", { tag, level_one_code }).then((resp) => {
                this.goodsAge = resp.body.items
            })
        },
        handleClickForFreePie(params) {
            this.freeModalOption = { visable: true }
            this.goodsFree = []
            this.$store.dispatch("store_index_free_detail", { logic_store_id: params.data.id }).then((resp) => {
                this.goodsFree = resp.body.items
            })
        },
        handleInAmountClick(comp_id) {
            this.selMonthType = "in"
            this.monthModalOption = { visable: true }
            this.$store.dispatch("store_index_in_amount", { comp_id }).then((resp) => {
                this.optionPieMonth = {
                    title: {
                        text: '本月入库物资分布',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 30,
                            shadowColor: 'rgba(0, 0, 0, 0.4)'
                        }
                    },
                    series: [
                        {
                            name: '物资类型',
                            type: 'pie',
                            radius: ['20%', '60%'],
                            data: resp.body.items
                        }
                    ]
                }
                this.goodstypeMonth = resp.body.items
            });
        },
        handleOutAmountClick(comp_id) {
            this.selMonthType = "out"
            this.monthModalOption = { visable: true }
            this.$store.dispatch("store_index_out_amount", { comp_id }).then((resp) => {
                this.optionPieMonth = {
                    title: {
                        text: '本月出库物资分布',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 30,
                            shadowColor: 'rgba(0, 0, 0, 0.4)'
                        }
                    },
                    series: [
                        {
                            name: '物资类型',
                            type: 'pie',
                            radius: ['20%', '60%'],
                            data: resp.body.items
                        }
                    ]
                }
                this.goodstypeMonth = resp.body.items
            });
        },
        handleClickForType(comp_id, level_one_code) {
            this.goodsMonth = []
            if (this.selMonthType == "in") {
                this.monthDtlModalOption = { visable: true }
                this.$store.dispatch("store_index_in_detail", { comp_id, level_one_code }).then((resp) => {
                    this.goodsMonth = resp.body.items
                })
            } else {
                this.monthDtlModalOption = { visable: true }
                this.$store.dispatch("store_index_out_detail", { comp_id, level_one_code }).then((resp) => {
                    this.goodsMonth = resp.body.items
                })
            }
        },
        handleCompSel(comp_id) {
            this.$store.commit("setCompId", comp_id);
            this.showCompareHis(comp_id);
        },
        handleCountyClick(dept_code) {
            this.$router.push({ name: 'StoreCountyIndex', params: { dept_code } })
        },

        showCompareHis(comp_id) {
            this.curMonthShow = false

            this.$store.dispatch("store_index_compareHis", { comp_id: comp_id }).then((resp) => {
                let thisYear = _.pluck(resp.body.itemMap.thisYear, 'value')
                this.curMonthIn = resp.body.itemMap.curMonthIn
                this.curMonthOut = resp.body.itemMap.curMonthOut
                this.curMonthShow = true
                // console.log(thisYear[thisYear.length-2]-thisYear[thisYear.length-1])
                // console.log(this.curMonthOut-this.curMonthIn)
                this.optionYear = {
                    title: {
                        text: '库存去年同期比较'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['2018', '2019']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: _.pluck(resp.body.itemMap.lastYear, 'month')
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [{
                        name: '2018',
                        type: 'line',
                        data: _.pluck(resp.body.itemMap.lastYear, 'value')
                    }, {
                        name: '2019',
                        type: 'line',
                        data: thisYear,
                        markLine: {
                            data: [
                                { name: "上月库存", yAxis: thisYear[thisYear.length>1?thisYear.length-2:0] },
                                { name: "本月库存", yAxis: thisYear[thisYear.length - 1] },
                            ]
                        }
                    }]
                }
            });
        },
        showL2Info() {
            this.$store.dispatch("store_index_l2_info").then((resp) => {
                this.l2Info = resp.body.items
            })
        },
        handleSearch() {
            this.searchModalOption = { visable: true }
        },
        handleAll() {
            this.allModalOption = { visable: true }
            this.$store.dispatch("store_index_all").then((resp) => {
                this.allStoreGoods = resp.body.items
            })
        },
        startSearch() {
            if (this.searchText != '') {
                this.$root.$emit("modalHideAll")
                this.$router.push({ name: "StoreSearch", params: { key: this.searchText } })
            }
        }
    },
    components: {
        Chart, MyMenu, MyModal, Excel
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../assets/animate.less';
.index {}

.total {
    .title {}
    .number {
        font-size: 2em;
        line-height: 1.8em;
    }
}

.store-year {
    .percent {
        font-size: 1.6em;
        line-height: 1.8em;
    }
}

.store-amount {
    line-height: 2em;
    font-size: 1.2em;
}

.goodstype-order {
    h3 {
        margin-top: 0;
    }
    ol {
        margin-top: 1.5em;
        margin-left: 1em;
        li {
            line-height: 2em;
            font-size: 1.12em;

            span {
                float: right;
            }
        }
    }
}

.age {
    .panel {
        // background-color:#F0F8FF;
        i {
            font-size: 2.5em;
            line-height: 1.8em;
            margin-right: 0.5em;
        }
        .title {
            opacity: 0.8;
        }
        .total {
            padding: 0.2em 0;
            font-size: 1.8em;
        }
        .progress {
            margin-top: 0.8em;
        }
    }
    .list-group {
        .animated;
        .bounceInUp;
    }

    .shown-loop(@n, @i: 1) when (@i <=@n) {
        .col-sm-4:nth-child(@{i}) {
            .list-group {
                animation-duration: @i*600ms;
            }
        }
        .shown-loop(@n, (@i + 1));
    }

    .shown-loop(3);

    .btn:focus {
        background-color: #f1f1f1;
        outline-color: #ddd;
        border-color: #ddd;
    }
}

.compare {
    margin-top: 2em;
    .fa {
        margin-right: 1.5em;
    }
    .list-group {
        line-height: 2em;
        .active {
            animation-name: greenPulse;
            animation-duration: 2s;
            animation-iteration-count: infinite;
        }
    }
    .cur-month {
        h4 {
            line-height: 2em;
            width: 18em;
        }
    }
}

.l2 {
    .city-one {
        margin-top: 0.5em;
        margin-bottom: 2em;
    }
    ul {

        li {
            float: left;
            margin-right: 2em;
            padding: 0.5em;
            cursor: pointer;
            color: #226DEF;
            &:hover {
                color: #926D9f;
                animation: neon2 1.5s ease-in-out infinite alternate;
            }
        }
    }
}

.content {
    padding: 2em;
    border: 1px solid #ddd;
    margin-bottom: 2em;
}

.table {
    // td {
    //     padding-top: 0.6em;
    //     padding-bottom: 0.8em;
    // }
    // td:not(:first-child),
    // th:not(:first-child) {
    //     text-align: right;
    // }
    td {
        min-width: 4.2em;
        max-width: 16em;
    }
}

.modal {
    li {
        cursor: pointer;
    }
}

@keyframes greenPulse {
    from {
        background-color: #66CCCC;
    }
    50% {
        background-color: #5bc0de;
    }
    to {
        background-color: #66CCCC;
    }
}

@keyframes neon2 {
    from {
        text-shadow: 0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #fff,
        0 0 20px #228DFF,
        0 0 35px #228DFF,
        0 0 40px #228DFF,
        0 0 50px #228DFF,
        0 0 75px #228DFF;
    }
    to {
        text-shadow: 0 0 1px #fff,
        0 0 5px #fff,
        0 0 8px #fff,
        0 0 10px #228DFF,
        0 0 18px #228DFF,
        0 0 20px #228DFF,
        0 0 25px #228DFF,
        0 0 38px #228DFF;
    }
}
</style>

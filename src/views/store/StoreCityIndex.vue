<template>
    <div class="index">
        <MyMenu :items="menus" back=true @click:l2="handleClickForL2"></MyMenu>
    
        <div id="my-wrapper">
            <div class="container">
                <div class="row" v-if="infoMap.comp">
                    <div class="col-md-12">
                        <h2 class="comp-title pull-left">{{infoMap.comp.name}}</h2>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-3">
                        <div class="row">
                            <div class="col-md-3">
                                <i class="fa fa-database fa-4x" aria-hidden="true"></i>
                            </div>
                            <div class="col-md-9 total">
                                <div class="title">库存物资总额</div>
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
                        <Chart width="100%" height="400px" :option="optionPie" theme='macarons' @chartClick="handlePieClick" loading></Chart>
                    </div>
    
                    <div class="col-md-3 goodstype-order">
                        <h3>物资类型排行</h3>
                        <ol>
                            <li v-for="(x,index) of goodstypeOrderBy" v-if="index<10" :key="x" class="my-item">{{x.name}}
                                <span>{{parseInt(x.value/10000)}}万</span>
                            </li>
                        </ol>
                    </div>
    
                </div>
    
            </div>
            <table id="test">
            </table>
            <div class="container">
                <transition name="fade" mode="out-in">
                    <div v-if="goodstypeOrderBy.length > 0" class="row">
                        <div class="col-sm-1">包含类型</div>
                        <div class="col-sm-11">
                            <mu-checkbox name="group" v-for="x of goodstypeOrderBy" :nativeValue="x.code" :key="x.code" v-model="selTypes" :label="x.name" class="type-checkbox" @change="handleTypeChange" />
                        </div>
                    </div>
                </transition>
                <!-- <div class="row">
                        <div class="col-sm-1">可用物资</div>
                        <div class="col-sm-11">         
                            <mu-checkbox name="group2" v-model="useable" label="去除全部预占物资" class="type-checkbox" @change="handleUseableChange"/> 
                        </div>   
                    </div> -->
    
            </div>
    
            <div v-if="logicStores.length>0" class="container">
                <hr>
    
                <div class="row">
                    <div class="col-sm-1">逻辑库</div>
                    <div class="col-sm-11">
                        <mu-radio :label="x" name="logic_store" v-for="x of logicStores" :nativeValue="x" :key="x" v-model="selLogicStore" labelClass="my-label" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-1">实体库</div>
                    <div class="col-sm-11">
                        <mu-radio :label="x" name="store" v-for="x of stores" :nativeValue="x" :key="x" v-model="selStore" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-11">
                        <button class="btn btn-default blue" type="button" @click="handleAllStore">所有库</button>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    
        <transition name="fade" mode="out-in">
            <div class="container" v-if="results.length > 0">
                <div class="row">
                    <div class="col-sm-6 btn-ext">
                        <Excel selector="#storeCityIndexTable">
                            <button class="btn blue">
                                <span class="fa fa-download"></span>导出Excel</button>
                        </Excel>
                    </div>
                    <div class="col-sm-6">
                        <div class="pull-right">
                            <input type="search" class="form-control" placeholder="搜索" v-model="searchText">
                        </div>
                    </div>
                </div>
                <div class="row">
    
                    <table class="table table-striped table-hover" id="storeCityIndexTable">
                        <thead>
                            <tr>
                                <th>#</th>
    
                                <th>物资编号</th>
                                <th style="width:15em;">物资名称</th>
                                <th>供应商</th>
    
                                <th>逻辑库</th>
                                <th>实体库</th>
    
                                <th>单位</th>
                                <th>入库数量</th>
                                <th>占用数量</th>
                                <th>当前数量</th>
                                <th>单价</th>
                                <th hidden>入库时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(x,index) of filterData" :key="x.id" :class="x.logic_store_id==9||x.logic_store_id==10?'text-danger':''">
                                <td>{{index+1}}</td>
                                <td>{{x.goodstype_code}}</td>
                                <td>{{x.goodstype_name}}</td>
                                <td>{{x.factory}}</td>
                                <td>{{x.logic_store_name}}</td>
                                <td>{{x.store_name}}</td>
                                <td>{{x.unit}}</td>
                                <td>{{x.in_count}}</td>
                                <td>{{x.ready_out_count|money(2)}}</td>
                                <td>{{x.cur_count|money(2)}}</td>
                                <td>{{x.single_price|money(2)}}</td>
                                <td hidden>{{x.createtime}}</td>
                                <td>
                                    <a @click="trace(x.qrcode_code)">追溯</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    
                </div>
    
            </div>
        </transition>
        <MyModal :option="modalOption" title="使用物资详情" small>
            <TraceInfo :qrcode="selqrcode" level=1></TraceInfo>
        </MyModal>
        <MyModal :option="l2ModalOption" title="二级库列表" small>
            <table class="table">
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>库存金额</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="x of l2s" :key="x">
                        <td>{{x.name}}</td>
                        <td>{{x.value|money}}</td>
                        <td>
                            <a @click="handleCountyClick(x.code)">详情</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </MyModal>
    
    </div>
</template>

<script>

import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
import MyModal from '@/components/MyModal'

import Excel from '@/components/Excel'
import TraceInfo from '@/components/TraceInfo'

export default {

    data() {
        return {
            comp_id: this.$route.params["comp_id"] || 2,
            menus: [],
            infoMap: {},

            optionPie: {},
            goodstypeOrderBy: [],

            items: {},
            results: {},

            selTypes: [],
            useable: false,
            stores: [],
            logicStores: [],
            selStore: "",
            selLogicStore: "",

            l2s: [],
            l2ModalOption: {},
            modalOption: {},
            selqrcode: 0,

            searchText: "",
        }
    },
    computed: {
        filterData() {
            return filterArr(this.results, this.searchText)
        }
    },
    watch: {
        selStore(newVal, oldVal) {
            if (newVal == "") {
                this.results = this.items;
            } else {
                if (this.selLogicStore == "") {
                    this.results = _.where(this.items, { store_name: newVal });
                } else {
                    this.results = _.where(this.items, { store_name: newVal, logic_store_name: this.selLogicStore });
                }
                console.log(this.selLogicStore, this.results)
                this.logicStores = _.uniq(_.pluck(this.results, 'logic_store_name'));
                // this.selLogicStore=0;
            }
        },
        selLogicStore(newVal, oldVal) {
            if (newVal == "") {
                this.results = this.items;
            } else {
                if (this.selStore == "") {
                    this.results = _.where(this.items, { logic_store_name: newVal });
                } else {
                    this.results = _.where(this.items, { logic_store_name: newVal, store_name: this.selStore });
                }
                this.stores = _.uniq(_.pluck(this.results, 'store_name'));
                // this.selStore=0;
            }
        },
    },
    mounted() {
        this.menus = [
            { name: "入库物资跟踪", to: { name: "StoreCityInGoods", params: { comp_id: this.comp_id } } },
            { name: "二级库库存", customEvent: "click:l2" },
            { name: "历史库存", to: { name: "StoreHisIndex", params: { comp_id: this.comp_id, dept_code: 0 } } },

        ]

        this.$store.dispatch("store_city_index", { comp_id: this.comp_id }).then((resp) => {
            this.infoMap = resp.body.itemMap;
        });
        this.$store.dispatch("store_city_index_goodstype", { comp_id: this.comp_id }).then((resp) => {
            this.goodstypeOrderBy = resp.body.items;
        });
        this.showPie();

    },
    methods: {

        handleClickForL2() {
            this.l2ModalOption = { visable: true }
            this.$store.dispatch("store_city_index_l2", { comp_id: this.comp_id }).then((resp) => {
                this.l2s = resp.body.items
            })
        },
        handleCountyClick(dept_code) {
            this.l2ModalOption = { visable: false }
            this.$nextTick(() => {
                this.$router.push({ name: 'StoreCountyIndex', params: { dept_code } })
            })

        },
        handlePieClick(params) {
            console.log(params)
            // this.showItems();
        },
        handleTypeChange(value) {
            this.selTypes = value;
            this.showItems();
            this.handleAllStore();
        },
        handleUseableChange(value) {

            this.useable = value;
            this.showItems();
            this.handleAllStore();
        },
        handleAllStore() {
            this.selStore = "";
            this.selLogicStore = "";
            this.stores = _.uniq(_.pluck(this.items, 'store_name'));
            this.logicStores = _.uniq(_.pluck(this.items, 'logic_store_name'));
            console.log("allStore")
        },
        showPie() {
            this.$store.dispatch("store_city_index_logicStore", { comp_id: this.comp_id }).then((resp) => {
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

        },
        showItems() {

            this.$store.dispatch("store_city_index_storegoods", { comp_id: this.comp_id, selTypes: this.selTypes, useable: this.useable }).then((resp) => {
                this.items = resp.body.items;
                this.results = resp.body.items;
                this.stores = _.uniq(_.pluck(this.items, 'store_name'));
                this.logicStores = _.uniq(_.pluck(this.items, 'logic_store_name'));

                this.$nextTick(() => {
                    $("#storeCityIndexTable").freezeHeader();
                })
            });

        },
        trace(qrcode_code) {
            this.selqrcode = qrcode_code
            this.modalOption = { visable: true }
        }
    },
    components: {
        Chart, MyMenu, MyModal, Excel, TraceInfo
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.comp-title {
    margin-top: 0;
}

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

.content {
    padding: 2em;
    border: 1px solid #ddd;
    margin-bottom: 2em;
}

.table {
    td {
        min-width: 6em;
        max-width: 16em;
    }
}

.mu-radio {
    min-width: 180px;

    .mu-radio-label {
        font-size: 12px;
    }
}
</style>

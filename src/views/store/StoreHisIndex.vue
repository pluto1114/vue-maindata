<template>
    <div class="index">
        <MyMenu :items="menus" back=true></MyMenu>
        <div class="container title">
            <div class="row">
                <h3 v-if="comp">{{comp.name}}历史库存信息</h3>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class='tabbed skin-turquoise col-md-12'>
                    <ul>
                        <li v-for="(x,index) of years" :key="x" @click="handleClickForYear(x)" :class="x==selYear?'active':''">{{x}}</li>
                    </ul>
                </div>
            </div>
            <transition name="fade" mode="out-in">
                <div class="row" v-show="show">
    
                    <div class="col-sm-6 btn-ext">
                        <Excel selector="#storeHisIndexTable">
                            <button class="btn green">
                                <span class="fa fa-download"></span>导出Excel</button>
                        </Excel>
    
                    </div>
                    <div class="col-sm-6">
                        <div class="pull-right">
                            <input type="search" class="form-control" placeholder="搜索" v-model="searchText">
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <table class="table table-striped table-hover" id="storeHisIndexTable">
                            <thead>
                                <tr>
                                    <th>#</th>
    
                                    <th>物资编号</th>
                                    <th style="width:15em;">物资名称</th>
                                    <th>供应商</th>
    
                                    <th>逻辑库</th>
    
                                    <th>单位</th>
                                    <th>入库数量</th>
                                    <!--<th>当前数量</th>-->
                                    <th>单价</th>
                                    <th>入库日期</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(x,index) of filterData" :key="x.id">
                                    <td>{{index+1}}</td>
                                    <td>{{x.goodstype_code}}</td>
                                    <td>{{x.goodstype_name}}</td>
                                    <td>{{x.factory}}</td>
                                    <td>{{x.logic_store_name}}</td>
    
                                    <td>{{x.unit}}</td>
                                    <td>{{x.in_count}}</td>
                                    <!--<td>{{x.cur_count}}</td>-->
                                    <td>{{x.single_price|money(2)}}</td>
                                    <td>{{x.createtime|prettyDate}}</td>
                                    <td>
                                        <a @click="trace(x.id)">追溯</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
                </div>
            </transition>
        </div>
    
        <MyModal :option="modalOption" title="使用物资详情" small>
            <TraceInfo :id="selId" level=1></TraceInfo>
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
            menus: [],

            comp_id: this.$route.params["comp_id"] || 2,
            years: [2014, 2015, 2016, 2017],
            selYear: 2017,
            comp: null,
            items: [],
            show: true,
            searchText: "",

            modalOption: {},
            selId: 0
        }
    },
    computed: {
        filterData() {
            var data = this.items
            var filterKey = this.searchText && this.searchText.toLowerCase()
            if (filterKey.length > 0) {
                data = data.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }
            return data
        }
    },
    watch: {
        // show:'showItems'
    },
    mounted() {
        this.showItems()

    },
    methods: {
        handleClickForYear(year) {
            this.selYear = year
            this.show = false
            this.showItems()
        },
        showItems() {
            this.$store.dispatch("store_his_index_storegoods", { comp_id: this.comp_id, year: this.selYear }).then((resp) => {
                this.items = resp.body.items;
                this.comp = resp.body.itemMap.comp
                this.show = true
            });

        },
        trace(id) {
            this.selId = id
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
/* Tabbed Styles */

.tabbed {
    min-width: 400px;
    margin: 0 auto;
    margin-bottom: 28px;
    border-bottom: 4px solid #000;
    overflow: hidden;
    transition: border 250ms ease;
}

.tabbed ul {
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    float: left;
    padding-left: 48px;
    list-style-type: none;
}

.tabbed ul * {
    margin: 0px;
    padding: 0px;
}

.tabbed ul li {
    display: block;
    float: right;
    padding: 10px 24px 8px;
    background-color: #FFF;
    margin-right: 46px;
    z-index: 2;
    position: relative;
    cursor: pointer;
    color: #777;

    text-transform: uppercase;
    font: 600 13px/20px roboto, "Open Sans", Helvetica, sans-serif;

    transition: all 250ms ease;
}

.tabbed ul li:before,
.tabbed ul li:after {
    display: block;
    content: " ";
    position: absolute;
    top: 0;
    height: 100%;
    width: 44px;
    background-color: #FFF;
    transition: all 250ms ease;
}

.tabbed ul li:before {
    right: -24px;
    transform: skew(30deg, 0deg);
    box-shadow: rgba(0, 0, 0, .1) 3px 2px 5px, inset rgba(255, 255, 255, .09) -1px 0;
}

.tabbed ul li:after {
    left: -24px;
    transform: skew(-30deg, 0deg);
    box-shadow: rgba(0, 0, 0, .1) -3px 2px 5px, inset rgba(255, 255, 255, .09) 1px 0;
}

.tabbed ul li:hover,
.tabbed ul li:hover:before,
.tabbed ul li:hover:after {
    background-color: #F4F7F9;
    color: #444;
}

.tabbed ul li.active {
    z-index: 3;
}

.tabbed ul li.active,
.tabbed ul li.active:before,
.tabbed ul li.active:after {
    background-color: #000;
    color: #fff;
}








/* Round Tabs */

.tabbed.round ul li {
    border-radius: 8px 8px 0 0;
}

.tabbed.round ul li:before {
    border-radius: 0 8px 0 0;
}

.tabbed.round ul li:after {
    border-radius: 8px 0 0 0;
}

.switcher-box a.skin-turquoise span {
    background: #1ABC9C;
}

.tabbed.skin-turquoise {
    border-bottom-color: #1ABC9C;
}

.tabbed.skin-turquoise ul li,
.tabbed.skin-turquoise ul li:before,
.tabbed.skin-turquoise ul li:after {
    background-color: #34D6B6;
    color: white;
}

.tabbed.skin-turquoise ul li:hover,
.tabbed.skin-turquoise ul li:hover:before,
.tabbed.skin-turquoise ul li:hover:after {
    background-color: #40E2C2;
}

.tabbed.skin-turquoise ul li.active,
.tabbed.skin-turquoise ul li.active:before,
.tabbed.skin-turquoise ul li.active:after {
    background-color: #1ABC9C;
}

.title {
    position: relative;
    top: -2.4em;
}

.table {
    td {
        min-width: 4em;
        max-width: 16em;
    }
}
</style>

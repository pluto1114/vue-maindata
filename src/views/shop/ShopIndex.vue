<template>
    <div class="index">
        <MyMenu :items="menus" back=true></MyMenu>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <Chart width="100%" height="350px" :option="optionBar1" theme='macarons' @chartClick="handleCityClick" loading></Chart>
                </div>
    
            </div>
    
            <div class="row">
                <div class="col-md-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>公司名称</th>
                                <th>当前库存</th>
                                <th>当月订单总金额</th>
                                <th>当月订单总数</th>
                                <th>当年订单总金额</th>
                                <th>当年订单总数</th>
                                <th>当月入库总金额</th>
                                <th>当月出库总金额</th>
    
                                <th>当年入库总金额</th>
                                <th>当年出库总金额</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(x,index) of globalInfo" :key="index">
                                <td>{{x.comp_name}}</td>
                                <td>{{x.current_store|money}}</td>
                                <td>{{x.month_order_amount|money}}</td>
                                <td>{{x.month_order_count|money}}</td>
                                <td>{{x.year_order_amount|money}}</td>
                                <td>{{x.year_order_count|money}}</td>
                                <td>{{x.month_in_amount|money}}</td>
                                <td>{{x.month_out_amount|money}}</td>
                                <td>{{x.year_in_amount|money}}</td>
                                <td>{{x.year_out_amount|money}}</td>
    
                                <td>
                                    <a @click="handleTRClick(x)">详情</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    
            <div class="row">
                <div class="col-sm-6">
                    <div class="p3">
                        <h4>当年商城直发采购信息</h4>
                        <Chart width="100%" height="300px" :option="optionPie1" theme="macarons" loading></Chart>
                        <div class="panel-group" id="accordion" role="tablist" v-if="buyInfos">
                            <div class="panel panel-default" v-for="x of buyInfos" :key="x">
                                <div class="panel-heading" role="tab">
                                    <h4 class="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#'+x.code">
                                            <span class="pull-right">{{x.value|money}}</span>{{x.name}}
                                        </a>
                                    </h4>
                                </div>
                                <div :id="x.code" class="panel-collapse collapse" role="tabpanel">
                                    <div class="panel-body">
                                        <ul class="list-group">
                                            <li class="list-group-item" v-for="y of x.list1" :key="y">
                                                <span class="pull-right">{{y.value|money}}</span>
                                                <a @click="handleBuyClick(x.code,y.code)">{{y.name}}</a>
                                            </li>
    
                                        </ul>
                                    </div>
                                </div>
                            </div>
    
                        </div>
    
                    </div>
    
                </div>
                <div class="col-sm-6">
                    <div class="p3">
                        <h4>当年商城经仓采购信息</h4>
                        <Chart width="100%" height="300px" :option="optionPie2" theme="macarons" loading></Chart>
                        <div class="panel-group" id="accordion2" role="tablist" v-if="buyInfos">
                            <div class="panel panel-default" v-for="x of buyInfos2" :key="x">
                                <div class="panel-heading" role="tab">
                                    <h4 class="panel-title">
                                        <a role="button" data-toggle="collapse" data-parent="#accordion2" :href="'#'+x.code+'-2'">
                                            <span class="pull-right">{{x.value|money}}</span>{{x.name}}
                                        </a>
                                    </h4>
                                </div>
                                <div :id="x.code+'-2'" class="panel-collapse collapse" role="tabpanel">
                                    <div class="panel-body">
                                        <ul class="list-group">
                                            <li class="list-group-item" v-for="y of x.list1" :key="y">
                                                <span class="pull-right">{{y.value|money}}</span>
                                                <a @click="handleBuy2Click(x.code,y.code)">{{y.name}}</a>
                                            </li>
    
                                        </ul>
                                    </div>
                                </div>
                            </div>
    
                        </div>
    
                    </div>
    
                </div>
                
            </div>
        </div>
    
        <MyModal :option='modalOption' title="采购详情">
            <div style="height:430px;overflow-y:scroll;">
    
                <table class="table">
                    <thead>
                        <tr>
                            <th>商品名称</th>
                            <th>项目编号</th>
                            <th>供应商名称</th>
                            <th>采购需求人</th>
                            <th>计量单位</th>
                            <th>购买数量</th>
                            <th>单价</th>
    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of buygoods" :key="x">
                            <td>
                                <span v-html="x.comdity_name"></span>
                            </td>
                            <td>{{x.project_code}}</td>
                            <td>{{x.supplier_name}}</td>
                            <td>{{x.demand_name}}</td>
                            <td>{{x.units}}</td>
                            <td>{{x.buy_number}}</td>
                            <td>{{x.real_price}}</td>
    
                        </tr>
                    </tbody>
                </table>
    
            </div>
        </MyModal>
    
    </div>
</template>

<script>

import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
import MyModal from '@/components/MyModal'

export default {

    data() {
        return {
            menus: [],

            optionBar1: {},
            optionPie1: {},
            optionPie2: {},
            buyInfos: null,
            buyInfos2: null,

            globalInfo: [],
            buygoods: [],
            modalOption: {}
        }

    },
    mounted() {



        this.$store.dispatch("shop_index_buy").then((resp) => {
            this.buyInfos = resp.data
            this.optionPie1 = {
                title: {
                    // text: '全区物资类型分布',
                    left: 'right'
                },
                tooltip: {},
                itemStyle: {
                    normal: {
                        shadowBlur: 30,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
                series: [
                    {
                        name: '物资用途',
                        type: 'pie',
                        radius: '55%',
                        data: this.buyInfos
                    }
                ]
            }
        });
        this.$store.dispatch("shop_index_buy2").then((resp) => {
            this.buyInfos2 = resp.data
            this.optionPie2 = {
                title: {
                    // text: '全区物资类型分布',
                    left: 'right'
                },
                tooltip: {},
                itemStyle: {
                    normal: {
                        shadowBlur: 30,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
                series: [
                    {
                        name: '物资用途',
                        type: 'pie',
                        radius: '55%',
                        data: this.buyInfos2
                    }
                ]
            }
        });

        this.$store.dispatch("shop_index_global").then((resp) => {
            this.globalInfo = resp.data
            this.optionBar1 = {
                title: {
                    text: '商城当前库存'
                },
                tooltip: {},
                legend: {
                    data: ['库存']
                },
                xAxis: {
                    data: _.map(resp.data, item => item.comp_name.replace(/分公司/, ''))
                },
                yAxis: {},
                series: [{
                    name: '库存',
                    type: 'bar',
                    data: _.pluck(resp.data, 'current_store')
                }]
            }

            
        });

    },
    methods: {
        handleCityClick(params) {

            console.log(params)
            this.$router.push({ name: 'ShopCityIndex', 'params': { comp_id: params.data.code, category_id: 0 } })

        },
        handleBuyClick(category_id, comp_id) {
            this.modalOption = { visable: true}
            this.$store.dispatch("shop_city_index_buy", { category_id, comp_id }).then((resp) => {
                this.buygoods = resp.data
            });
        },
        handleBuy2Click(category_id, comp_id) {
            this.modalOption = { visable: true}
            this.$store.dispatch("shop_city_index_buy2", { category_id, comp_id }).then((resp) => {
                this.buygoods = resp.data
            });
        },
        handleTRClick(params) {
            this.$router.push({ name: 'ShopCityIndex', 'params': { comp_id: params.comp_id, category_id: 0 } })
        },

    },
    components: {
        Chart, MyMenu, MyModal
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.modal {
    td {
        max-width: 8em;
    }
}

.p3 {
    border: 1px solid #d5d5d5;
    border-radius: 1em;
    >h4 {
        padding: 0.3em 1em 0.8em;
        border-bottom: 1px solid #dfdfdf;
    }
}
</style>

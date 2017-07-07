<template>
    <div class="index">
        <MyMenu :items="menus" back=true></MyMenu>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <Chart width="100%" height="480px" :option="optionBar1" theme='macarons' loading></Chart>
                </div>
                <div class="col-md-6">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>盟市</th>
                                <th>库存金额</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(x,index) of shopStock">
                                <td>{{x.name}}</td>
                                <td>{{x.value|money}}</td>
    
                                <td>
                                    <a @click="handleClickForStock(x.code)">详情</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <h4>当年商城直发运维物资</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>盟市</th>
                                <th>库存金额</th>
    
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(x,index) of shopByYear">
                                <td>{{x.name}}</td>
                                <td>{{x.value|money}}</td>
    
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-6">
                    <h4>当月商城直发运维物资</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>盟市</th>
                                <th>库存金额</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(x,index) of shopByMonth">
                                <td>{{x.name}}</td>
                                <td>{{x.value|money}}</td>
    
                                <td>
                                    <a @click="handleClickForMonth(x.code)">详情</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h4>出库运维物料2017年数据分析</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>盟市</th>
                                <th v-for="x of erpMaterialNames">{{x}}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(x,index) of erpCompGroup">
                                <td>{{x.name}}</td>
                                <td v-for="y of x.group">{{y.value}}</td>
    
                                <td>
                                    <a @click="handleTRClick(x)">详情</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    
            
        </div>
    
        <MyModal :option='compModalOption' title="盟市详情">
    
            <div style="height:430px;overflow-y:scroll;">
                <table class="table">
                    <thead>
                        <tr>
                            <th>旗县</th>
                            <th v-for="x of erpMaterialNames">{{x}}</th>
    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(county,index) of erpCountyGroup">
                            <td>{{county.name}}</td>
                            <td v-for="(x1,index1) of erpMaterialNames">
                                <a @click="handleNumberClick(county,x1)">{{fill(county,x1)}}</a>
                            </td>
    
                        </tr>
                    </tbody>
                </table>
            </div>
        </MyModal>
    
        <MyModal :option='countyModalOption' title="物资明细">
    
            <div style="height:430px;overflow-y:scroll;">
                <table class="table">
                    <thead>
                        <tr>
                            <th>工单号</th>
                            <th>物料名称</th>
                            <th>领用人</th>
                            <th>时间</th>
                            <th>数量</th>
    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x,index) of erpGoods">
                            <td>{{x.wo_nbr}}</td>
                            <td>{{x.name}}</td>
                            <td>{{x.staff_name}}</td>
                            <td>{{x.sts_date|prettyDate}}</td>
                            <td>{{x.amount}}</td>
    
                        </tr>
                    </tbody>
                </table>
            </div>
        </MyModal>
    
        <MyModal :option='compModalOptionForShop' title="商城库存盟市详情">
    
            <div style="height:630px;overflow-y:scroll;">
                <table class="table">
                    <thead>
                        <tr>
                            <th>物资编号</th>
                            <th>物资名称</th>
                            <th>所属仓库</th>
                            <th>仓库用途</th>
                            <th>入库日期</th>
                            <th>金额</th>
                            <th>数量</th>
                            <th>单位</th>
                            <th>单价</th>
    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of shopGoods">
                            <td>{{x.comdity_code}}</td>
                            <td>{{x.comdity_name}}</td>
                            <td>{{x.storage_name}}</td>
                            <td>{{x.storage_yt}}</td>
                            <td>{{x.in_date|prettyDate}}</td>
                            <td>{{x.money|money}}</td>
                            <td>{{x.number}}</td>
                            <td>{{x.units}}</td>
                            <td>{{x.price}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MyModal>

        <MyModal :option='monthModalOptionForShop' title="采购物资明细">
    
            <div style="height:630px;overflow-y:scroll;">
                <table class="table">
                    <thead>
                        <tr>
                            <th>物资分类</th>
                            <th>物资名称</th>
                            <th>需求部门</th>
                            <th>需求人</th>
                            <th>采购日期</th>
                            <th>供应商</th>
                            <th>数量</th>
                            <th>单位</th>
                            <th>单价</th>
    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of shopMonthDetail">
                            <td>{{x.category}}</td>
                            <td>{{x.comdity_name}}</td>
                            <td>{{x.demand_deprt_name}}</td>
                            <td>{{x.demand_name}}</td>
                            <td>{{x.order_date|prettyDate}}</td>
                            <td>{{x.supplier_name}}</td>
                            <td>{{x.buy_number}}</td>
                            <td>{{x.units}}</td>
                            <td>{{x.real_price|money}}</td>
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
            cities: null,
            optionBar1: {},
            erpCompGroup: [],
            erpMaterialNames: [],
            erpCountyGroup: [],
            erpGoods: [],
            compModalOption: {},
            countyModalOption: {},

            shopStock: [],
            shopByYear: [],
            shopByMonth: [],
            optionBar1: {},
            compModalOptionForShop: {},
            monthModalOptionForShop: {},
            shopGoods: [],
            shopMonthDetail: []
        }

    },
    mounted() {
        this.$store.dispatch("operation_erp_index").then((resp) => {
            let data = _.sortByAll(resp.data, ['comp_name', 'material_name'])
            let compGroupBy = _.groupBy(data, 'comp_name')
            compGroupBy = this.groupByAfter(compGroupBy)
            compGroupBy.forEach((comp, index) => {
                let materialGroupBy = _.groupBy(comp.list, 'material_name')
                materialGroupBy = this.groupByAfter(materialGroupBy, 'total')
                comp.group = materialGroupBy
                comp.groupLabel = _.pluck(materialGroupBy, 'name')
            })

            console.log(compGroupBy)
            this.erpCompGroup = compGroupBy;
            // this.erpMaterialNames=_.uniq(_.pluck(resp.data,'material_name'))
            this.erpMaterialNames = compGroupBy[0].groupLabel
        });

        this.$store.dispatch("operation_shop_index").then(resp => {
            this.shopStock = resp.data

            this.optionBar1 = {
                title: {
                    text: '商城库存运维物资(万)'
                },
                tooltip: {},
                legend: {
                    data: ['库存']
                },
                xAxis: {
                    data: _.map(resp.data, item => item.name.substring(0, 2))
                },
                yAxis: {},
                series: [{
                    name: '库存',
                    type: 'bar',
                    data: _.map(resp.data, item => {
                        return { name: item.name, value: (item.value / 10000).toFixed(2) }
                    })
                }]
            }
        })
        this.$store.dispatch("operation_shop_year").then(resp => {
            this.shopByYear = resp.data
        })
        this.$store.dispatch("operation_shop_month").then(resp => {
            this.shopByMonth = resp.data
        })
    },
    methods: {

        handleNumberClick(county, material_name) {

            let r = _.find(county.list, { material_name })
            if (r == null) { return }
            this.countyModalOption = { visable: true }
            this.erpGoods = []
            this.$store.dispatch("operation_erp_detail", { area_id: r.area_id, material_spec_id: r.material_spec_id }).then((resp) => {
                this.erpGoods = resp.data
            });
        },
        handleTRClick(comp) {
            let data = _.sortByAll(comp.list, ['area_name', 'material_name'])
            let countyGroupBy = _.groupBy(data, 'area_name')
            countyGroupBy = this.groupByAfter(countyGroupBy)
            countyGroupBy.forEach((county, index) => {
                let materialGroupBy = _.groupBy(county.list, 'material_name')
                materialGroupBy = this.groupByAfter(materialGroupBy, 'total')
                county.group = materialGroupBy
                county.groupLabel = _.pluck(materialGroupBy, 'name')
            })
            this.erpCountyGroup = countyGroupBy
            this.compModalOption = { visable: true }
        },
        handleClickForStock(comp_id) {
            this.compModalOptionForShop = { visable: true }
            this.$store.dispatch("operation_shop_detail", { comp_id }).then((resp) => {
                this.shopGoods = resp.data
            });
        },
        handleClickForMonth(comp_id) {
            this.monthModalOptionForShop = { visable: true }

            this.$store.dispatch("operation_shop_month_detail", { comp_id }).then(resp => {
                this.shopMonthDetail = resp.data
            })
        },
        groupByAfter(obj, sumField) {
            let arr = []
            _.forIn(obj, (v, k) => {
                if (sumField) {
                    let value = _.sum(v, sumField)
                    arr.push({ name: k, list: v, showlist: false, value })
                } else {
                    arr.push({ name: k, list: v, showlist: false })
                }
            })
            return arr
        },
        fill(county, material_name) {
            let r = _.find(county.group, { name: material_name })
            if (r) {
                return r.value
            } else {
                return 0
            }
        }
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
</style>

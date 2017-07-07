<template>
    <div class="index">
        <MyMenu :items="menus" back=true></MyMenu>
        <div class="container" v-if="comp">
            <div class="row">
                <h3>{{comp.comp_name}}商城数据信息</h3>
            </div>
        </div>
        <div class="container">
            <div>
    
                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#tab1" role="tab" data-toggle="tab">商城库存明细</a>
                    </li>
                    <li role="presentation">
                        <a href="#tab2" role="tab" data-toggle="tab">当年入库明细</a>
                    </li>
                    <li role="presentation">
                        <a href="#tab3" role="tab" data-toggle="tab">当年出库明细</a>
                    </li>
                    <li role="presentation">
                        <a href="#tab4" role="tab" data-toggle="tab">当月入库明细</a>
                    </li>
                    <li role="presentation">
                        <a href="#tab5" role="tab" data-toggle="tab">当月出库明细</a>
                    </li>
    
                </ul>
    
                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane fade in active" id="tab1">
                        <table class="table" v-if="storeInfos">
                            <thead>
                                <tr>
                                    <th>商品编号</th>
                                    <th>商品名称</th>
    
                                    <th>供应商名称</th>
                                    <th>入库批次号</th>
                                    <th>所属仓库</th>
                                    <th>计量单位</th>
                                    <th>库存数量</th>
                                    <th>企业价</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(x,index) of storeInfos">
                                    <td>{{x.comdity_code}}</td>
                                    <td>{{x.comdity_name}}</td>
                                    <td>{{x.supplier_name}}</td>
                                    <td>{{x.storage_batch}}</td>
                                    <td>{{x.storage_name}}</td>
                                    <td>{{x.units}}</td>
                                    <td>{{x.number}}</td>
                                    <td>{{x.real_price}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="tab2">
                        <table class="table" v-if="inInfos">
                            <thead>
                                <tr>
                                    <th>商品编号</th>
                                    <th>商品名称</th>
    
                                    <th>供应商名称</th>
                                    <th>入库批次号</th>
                                    <th>所属仓库</th>
                                    <th>计量单位</th>
                                    <th>库存数量</th>
                                    <th>企业价</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(x,index) of inInfos">
                                    <td>{{x.comdity_code}}</td>
                                    <td>{{x.comdity_name}}</td>
                                    <td>{{x.supplier_name}}</td>
                                    <td>{{x.storage_batch}}</td>
                                    <td>{{x.storage_name}}</td>
                                    <td>{{x.units}}</td>
                                    <td>{{x.number}}</td>
                                    <td>{{x.real_price}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="tab3">
                        <table class="table" v-if="outInfos">
                            <thead>
                                <tr>
                                    <th>商品编号</th>
                                    <th>商品名称</th>
    
                                    <th>出库单号</th>
                                    <th>出库批次</th>
                                    <th>商品用途</th>
                                    <th>需求人</th>
                                    <th>计量单位</th>
                                    <th>出库数量</th>
                                    <th>出库时间</th>
    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(x,index) of outInfos">
                                    <td>{{x.comdity_code}}</td>
                                    <td>{{x.comdity_name}}</td>
                                    <td>{{x.dlivry_code}}</td>
                                    <td>{{x.dlivry_batch}}</td>
                                    <td>{{x.comdity_use}}</td>
                                    <td>{{x.demand_name}}</td>
                                    <td>{{x.units}}</td>
                                    <td>{{x.number}}</td>
                                    <td>{{x.out_date}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
    
                    <div role="tabpanel" class="tab-pane fade" id="tab4">
                        <table class="table" v-if="inInfosMonth">
                            <thead>
                                <tr>
                                    <th>商品编号</th>
                                    <th>商品名称</th>
    
                                    <th>供应商名称</th>
                                    <th>入库批次号</th>
                                    <th>所属仓库</th>
                                    <th>计量单位</th>
                                    <th>库存数量</th>
                                    <th>企业价</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(x,index) of inInfosMonth">
                                    <td>{{x.comdity_code}}</td>
                                    <td>{{x.comdity_name}}</td>
                                    <td>{{x.supplier_name}}</td>
                                    <td>{{x.storage_batch}}</td>
                                    <td>{{x.storage_name}}</td>
                                    <td>{{x.units}}</td>
                                    <td>{{x.number}}</td>
                                    <td>{{x.real_price}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div role="tabpanel" class="tab-pane fade" id="tab5">
                        <table class="table" v-if="outInfosMonth">
                            <thead>
                                <tr>
                                    <th>商品编号</th>
                                    <th>商品名称</th>
    
                                    <th>出库单号</th>
                                    <th>出库批次</th>
                                    <th>商品用途</th>
                                    <th>需求人</th>
                                    <th>计量单位</th>
                                    <th>出库数量</th>
                                    <th>出库时间</th>
    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(x,index) of outInfosMonth">
                                    <td>{{x.comdity_code}}</td>
                                    <td>{{x.comdity_name}}</td>
                                    <td>{{x.dlivry_code}}</td>
                                    <td>{{x.dlivry_batch}}</td>
                                    <td>{{x.comdity_use}}</td>
                                    <td>{{x.demand_name}}</td>
                                    <td>{{x.units}}</td>
                                    <td>{{x.number}}</td>
                                    <td>{{x.out_date}}</td>
                                </tr>
                            </tbody>
                        </table>
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

    data() {
        return {
            menus: [],
            comp_id: this.$route.params["comp_id"],
            category_id: this.$route.params["category_id"],
            comp: null,
            storeInfos: null,

            inInfos: null,
            outInfos: null,

            inInfosMonth: null,
            outInfosMonth: null,
        }

    },
    mounted() {
        this.$store.dispatch("shop_index_global").then((resp) => {
            this.comp = _.find(resp.data, { comp_id: this.comp_id })
        });
        this.$store.dispatch("shop_city_index_storegoods", { comp_id: this.comp_id }).then((resp) => {
            this.storeInfos = resp.data
        });


        let _this = this
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

            let href = e.target.href
            href = href.substring(href.lastIndexOf('/') + 1)
            console.log(href)
            switch (href) {
                case '#tab2':
                    console.log(123)
                    _this.$store.dispatch("shop_city_index_in", { comp_id: _this.comp_id }).then((resp) => {
                        _this.inInfos = resp.data
                    });
                    break;
                case '#tab3':
                    _this.$store.dispatch("shop_city_index_out", { comp_id: _this.comp_id }).then((resp) => {
                        _this.outInfos = resp.data
                    });
                    break;
                case '#tab4':
                    _this.$store.dispatch("shop_city_index_in_month", { comp_id: _this.comp_id }).then((resp) => {
                        _this.inInfosMonth = resp.data
                    });
                    break;
                case '#tab5':
                    _this.$store.dispatch("shop_city_index_out_month", { comp_id: _this.comp_id }).then((resp) => {
                        _this.outInfosMonth = resp.data
                    });
                    break;
            }
        })
    },
    methods: {
        handleCityClick(params) {

        },
        handleTRClick(params) {

        },

    },
    components: {
        Chart, MyMenu
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.nav-tabs {
    font-size: 1.2em;
    font-weight: bold;
}

.table {
    margin-top: 1em;
    td {
        max-width: 12em;
    }
}
</style>

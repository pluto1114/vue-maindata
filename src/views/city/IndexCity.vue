<template>
    <div class="index">
        <MyMenu :items="menus" back=true></MyMenu>
    
        <div class="container">
            <div class="row">
                <div class="col-md-12" style="padding:0;">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active">
                            <a href="#storegoods1" role="tab" data-toggle="tab">物资平台库存</a>
                        </li>
                        <li role="presentation">
                            <a href="#storegoods2" role="tab" data-toggle="tab">商城库存分析</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="storegoods1">
                            <div class="content">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th style="width:12em;">地域</th>
                                            <th>0-90天</th>
                                            <th>91-180天</th>
                                            <th>180天以上</th>
    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="city" @click='$router.push({name:"StoreCityIndex",params:{comp_id:city.id}})'>
                                            <td>{{city.name}}</td>
                                            <td>{{city.storegoods.lt90}}</td>
                                            <td>{{city.storegoods.lt180}}</td>
                                            <td>{{city.storegoods.gt180}}</td>
                                        </tr>
                                        <tr v-if="counties" v-for="x of counties" @click='$router.push({name:"StoreCountyIndex",params:{dept_code:x.code}})'>
                                            <td>{{x.name}}</td>
                                            <td>{{x.storegoods.lt90}}</td>
                                            <td>{{x.storegoods.lt180}}</td>
                                            <td>{{x.storegoods.gt180}}</td>
    
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="storegoods2">
                            <div class="content">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>商城子库</th>
                                            <th>库存金额</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="x of shopStock" :key="x">
                                            <td>{{x.name}}</td>
                                            <td>{{x.value|money}}</td>
                                            <td>
                                                <a @click="handleClickForStock(x)">详情</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-12 banner">
                    <div class="row">
                        <div class="title col-sm-4">在建项目分析</div>
                        <div class="total col-sm-offset-6 col-sm-2">
    
                        </div>
                    </div>
                </div>
    
                <div class="col-md-12 content">
                    <table class="table">
                        <thead>
                            <tr>
                                <th style="width:12em;">地域</th>
                                <th>库存量</th>
                                <th>使用量</th>
                                <th>损坏量</th>
                                <th>维修量</th>
    
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="city">
                                <td>{{city.name}}</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
    
                            </tr>
    
                        </tbody>
                    </table>
    
                </div>
            </div>
        </div>
    
        <div class="container">
            <div class="row">
                <div class="col-md-12" style="padding:0;">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active">
                            <a href="#modem1" role="tab" data-toggle="tab">光猫</a>
                        </li>
                        <li role="presentation">
                            <a href="#modem2" role="tab" data-toggle="tab">机顶盒</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="modem1">
                            <div class="content">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th style="width:12em;">地域</th>
                                            <th>物资平台</th>
                                            <th>商城</th>
    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="city">
                                            <td>{{city.name}}</td>
                                            <td>{{city.storegoods.lt90}}</td>
                                            <td>{{city.storegoods.lt180}}</td>
    
                                        </tr>
    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="modem2">
                            <div class="content">
                                商城数据
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="container">
            <div class="row">
                <div class="col-md-12 banner">
                    <div class="row">
                        <div class="title col-sm-4">运维物资使用情况</div>
                        <div class="total col-sm-offset-6 col-sm-2">
    
                        </div>
                    </div>
                </div>
    
                <div class="col-md-12 content">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>商城子库</th>
                                <th>库存金额</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="x of shopStockForOp">
                                <td>{{x.name}}</td>
                                <td>{{x.value|money}}</td>
                                <td>
                                    <a @click="handleClickForOp(x)">详情</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    
                </div>
            </div>
        </div>
    
        <div class="container">
            <div class="row">
                <div class="col-md-12 banner">
                    <div class="row">
                        <div class="title col-sm-4">营销物资使用情况</div>
                        <div class="total col-sm-offset-6 col-sm-2">
    
                        </div>
                    </div>
                </div>
    
                <div class="col-md-12 content">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>商城子库</th>
                                <th>库存金额</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="x of shopStockForMarket">
                                <td>{{x.name}}</td>
                                <td>{{x.value|money}}</td>
                                <td>
                                    <a @click="handleClickForMarket(x)">详情</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    
                </div>
            </div>
        </div>
    
        <div class="container">
            <div class="row">
                <div class="col-md-12" style="padding:0;">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active">
                            <a href="#resource1" role="tab" data-toggle="tab">路由导航</a>
                        </li>
                        <li role="presentation">
                            <a href="#resource2" role="tab" data-toggle="tab">电子运维资源</a>
                        </li>
                        <li role="presentation">
                            <a href="#resource3" role="tab" data-toggle="tab">号线资源</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="resource1">
                            <div class="content">
                                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div v-for="(x,index) of resource1" class="panel panel-default">
                                        <div class="panel-heading" role="tab">
                                            <h4 class="panel-title box">
                                                <a class="collapsed box-cell-1" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#'+x.code">
                                                    {{x.name}}
                                                </a>
                                                <span class="value">{{x.value}}</span>
                                            </h4>
                                        </div>
                                        <div :id="x.code" class="panel-collapse collapse" role="tabpanel">
    
                                            <ul class="menu-1">
                                                <li v-for="y of x.list1">
                                                    <h3 class="box">
                                                        <span class="box-cell-1">{{y.name}}</span>
                                                        <span class="value">{{y.value}}</span>
                                                    </h3>
                                                    <ul>
    
                                                        <li v-for="z of y.list1">
                                                            <div class="box">
                                                                <a class="box-cell-1" @click="handleClickForResc(x.code,y.code,z.code,'ZX')">{{z.name}}</a>
                                                                <span class="value">{{z.value}}</span>
                                                            </div>
                                                        </li>
    
                                                    </ul>
                                                </li>
    
                                            </ul>
    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="resource2">
                            <div class="content">
                                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div v-for="(x,index) of resource2" class="panel panel-default">
                                        <div class="panel-heading" role="tab">
                                            <h4 class="panel-title box">
                                                <a class="collapsed box-cell-1" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#'+x.code">
                                                    {{x.name}}
                                                </a>
                                                <span class="value">{{x.value}}</span>
                                            </h4>
                                        </div>
                                        <div :id="x.code" class="panel-collapse collapse" role="tabpanel">
    
                                            <ul class="menu-1">
                                                <li v-for="y of x.list1">
                                                    <h3 class="box">
                                                        <span class="box-cell-1">{{y.name}}</span>
                                                        <span class="value">{{y.value}}</span>
                                                    </h3>
                                                    <ul>
    
                                                        <li v-for="z of y.list1">
                                                            <div class="box">
                                                                <a class="box-cell-1" @click="handleClickForResc(x.code,y.code,z.code,'XDL')">{{z.name}}</a>
                                                                <span class="value">{{z.value}}</span>
                                                            </div>
                                                        </li>
    
                                                    </ul>
                                                </li>
    
                                            </ul>
    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="resource3">
                            <div class="content">
                                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div v-for="(x,index) of resource3" class="panel panel-default">
                                        <div class="panel-heading" role="tab">
                                            <h4 class="panel-title box">
                                                <a class="collapsed box-cell-1" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#'+x.code">
                                                    {{x.name}}
                                                </a>
                                                <span class="value">{{x.value}}</span>
                                            </h4>
                                        </div>
                                        <div :id="x.code" class="panel-collapse collapse" role="tabpanel">
    
                                            <ul class="dt-ul">
                                                <li v-for="y of x.list1">
                                                    <a class="box" @click="handleClickForResc(x.code,y.code,'0','DT')">
                                                        <span class="box-cell-1">{{y.name}}</span>
                                                        <span class="value">{{y.value}}</span>
                                                    </a>
    
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
        </div>
        <MyModal :option="stockModalOption" title="物资详情">
            <table class="table">
                <thead>
                    <tr>
                        <th>商品编号</th>
                        <th>商品名称</th>
    
                        <th>入库批次号</th>
                        <th>所属仓库</th>
                        <th>单位</th>
                        <th>单价</th>
                        <th>库存数量</th>
                        <th>总价</th>
                        <th>库龄</th>
                        <th>入库时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(x,index) of stockList" :key="x">
                        <td>{{x.comdity_code}}</td>
                        <td>{{x.comdity_name}}</td>
    
                        <td>{{x.storage_batch}}</td>
                        <td>{{x.storage_name}}</td>
                        <td>{{x.units}}</td>
                        <td>{{x.price}}</td>
                        <td>{{x.number}}</td>
                        <td>{{x.money}}</td>
                        <td>{{x.storage_time}}</td>
                        <td>{{x.in_date|prettyDate}}</td>
    
                    </tr>
                </tbody>
            </table>
        </MyModal>
        <MyModal :option='resourceModalOption' title="资源详情">
            <div style="height:630px;overflow-y:scroll;">
    
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width:8em;">地域</th>
                            <th style="width:6em;">资源状态</th>
                            <th style="width:6em;">资源类型</th>
                            <th style="width:10em;">所属项目</th>
                            <th>供应商</th>
                            <th>包机人</th>
                            <th>包机人电话</th>
    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of resourceList">
                            <td>{{x.address_info}}</td>
                            <td>{{x.dev_state}}</td>
                            <td>{{x.dev_little_type}}</td>
                            <td>{{x.project_name}}</td>
                            <td>{{x.vendor}}</td>
                            <td>{{x.w_name}}</td>
                            <td>{{x.w_phone}}</td>
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
            comp_id: this.$route.params["comp_id"],
            menus: [],
            counties: null,
            city: null,
            shopStock: [],
            shopStockForOp: [],
            shopStockForMarket: [],
            resource1: [],
            resource2: [],
            resource3: [],

            stockModalOption: {},
            stockList: [],

            resourceModalOption: {},
            resourceList: [],

        }
    },
    watch: {

    },
    mounted() {
        this.menus = [{ name: "采购物资跟踪", to: `/trace/month/${this.comp_id}` }];
        console.log("comp_id:" + this.$route.params["comp_id"])
        this.$store.dispatch("city_index", { comp_id: this.comp_id }).then((resp) => {
            this.counties = resp.body.itemMap.counties;
            this.city = resp.body.itemMap.city;
        });
        this.$store.dispatch("city_index_shop_stock", { comp_id: this.comp_id }).then(resp => {
            this.shopStock = resp.data
        });
        this.$store.dispatch("city_index_shop_op", { comp_id: this.comp_id }).then(resp => {
            this.shopStockForOp = resp.data
        });
        this.$store.dispatch("city_index_shop_market", { comp_id: this.comp_id }).then(resp => {
            this.shopStockForMarket = resp.data
        });


        this.$store.dispatch("city_index_resource", { source: 'ZX', comp_id: this.comp_id }).then((resp) => {
            this.resource1 = resp.data;
            setTimeout(() => {
                $('.menu-1').lazeemenu();
            }, 1000)
        });
        this.$store.dispatch("city_index_resource", { source: 'XDL', comp_id: this.comp_id }).then((resp) => {
            this.resource2 = resp.data;
            setTimeout(() => {
                $('.menu-1').lazeemenu();
            }, 1000)
        });
        this.$store.dispatch("city_index_resource", { source: 'DT', comp_id: this.comp_id }).then((resp) => {
            this.resource3 = resp.data;
        });


    },
    methods: {
        handleClickForStock(item) {
            this.stockList = []
            this.stockModalOption = { visable: true }
            this.$store.dispatch("city_index_shop_stock_dtl", { comp_id: this.comp_id, name: encodeURIComponent(item.name) }).then(resp => {
                this.stockList = resp.data
            })
        },
        handleClickForOp(item) {
            this.stockList = []
            this.stockModalOption = { visable: true }
            this.$store.dispatch("city_index_shop_op_dtl", { comp_id: this.comp_id, name: encodeURIComponent(item.name) }).then(resp => {
                this.stockList = resp.data
            })
        },
        handleClickForMarket(item) {
            this.stockList = []
            this.stockModalOption = { visable: true }
            this.$store.dispatch("city_index_shop_market_dtl", { comp_id: this.comp_id, name: encodeURIComponent(item.name) }).then(resp => {
                this.stockList = resp.data
            })
        },
        handleClickForResc(code1, code2, code3, source) {
            this.resourceList = []
            this.resourceModalOption = { visable: true }
            this.$store.dispatch("city_index_resource_detail", { comp_id: this.comp_id, code1: code1, code2: code2, code3: code3, source: source }).then((resp) => {
                this.resourceList = resp.data;
            });
        },
    },
    components: {
        Chart, MyMenu, MyModal
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.banner {
    border-bottom: 0.2em solid #CC0226;
    line-height: 2.8em;
}

.title {
    background: url(../../assets/hong.png) no-repeat; // background-size: cover;
    color: white;
}

.title,
.total {
    font-size: 1.2em;
}

.content {
    padding: 2em;
    border: 1px solid #ddd;
    margin-bottom: 2em;
}

.table {

    // td:not(:first-child),
    // th:not(:first-child) {
    //     text-align: right;
    // }
    td {
        min-width: 4em;
        padding: 0.8em 0.4em;
        &:hover {
            cursor: pointer;
        }
    }
}

[role=tab] {
    font-size: 1.2em;
}

.nav-tabs>li.active>a {
    background-color: #CC0226;
    color: white;
}

#accordion {
    a:hover,
    a:focus {
        text-decoration: none;
        outline: none;
        border-bottom: none;
    }
    .panel {
        border: none;
        border-top: 1px solid #e8e8e8;
        box-shadow: none;
        border-radius: 0;
        margin: 0;
        &:last-child {
            border-bottom: 1px solid #e8e8e8;
        }
    }
    .panel-heading {
        padding: 0 1em;
    }
    .panel-title {
        a {
            display: block;
            font-size: 16px;
            font-weight: bold;
            line-height: 24px;
            background: #fff;
            padding: 15px 20px 15px 47px;
            position: relative;
            transition: all 0.5s ease 0s;
        }
        .value {
            padding-top: 1.5em;
        }
    }
    .panel-title {

        a:before {
            content: "\f068";
            font-family: 'FontAwesome';
            display: block;
            width: 30px;
            height: 30px;
            line-height: 32px;
            border-radius: 50%;
            background: #888bc2;
            font-size: 14px;
            color: #fff;
            text-align: center;
            position: absolute;
            top: 25%;
            left: 0;
            transition: all 0.3s ease 0s;
        }
        a.collapsed:before {
            content: "\f067";
        }
    }

    .panel-body {
        font-size: 15px;
        color: #635858;
        line-height: 25px;
        border: none;
        padding: 14px 20px 14px 47px;
    }
    .dt-ul {
        li {
            padding: 0.8em 1.5em;
        }
    }
    .menu-1 {
        padding: 0.3em 0.5em;
        li {
            padding: 0.5em 0.2em;
            .value {
                padding: 0.5em;
                color: #112266;
            }
        }
    }
}
</style>

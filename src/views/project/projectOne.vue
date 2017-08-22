<template>
    <div class="index">
        <MyMenu :items="menus" back=true :step="backStep"></MyMenu>
    
        <div class="container page-info">
            <div class="row" v-if="info">
                <div class="col-sm-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">项目信息</h3>
                        </div>
                        <div class="panel-body">
                            {{project.project_name}}
                        </div>
                        <ul class="list-group project-info">
                            <li class="list-group-item">
                                <i class="fa fa-bell-o"></i>项目编号：
                                <span class="">{{project.project_number}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="fa fa-user-o"></i>项目经理：
                                <span class="my-link" @click="handleSearch(project.pm_person_name.split(',')[0])">{{project.pm_person_name.split(",")[0]}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="fa fa-star-o"></i>项目状态：
                                <span class="">{{project.pjt_status_desc}}</span>
                            </li>
                            <li class="list-group-item" v-if="project.pjt_status_desc=='已关闭'">
                                <i class="fa fa-star-o"></i>在审计台帐：
                                <span class="text-danger">{{auditDesc}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="fa fa-clock-o"></i>项目开始日期：
                                <span class="">{{project.start_date|prettyDate}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="fa fa-clock-o"></i>最后出库日期：
                                <span class="">{{info.lastOutDate|prettyDate}}</span>
                            </li>
    
                            <li class="list-group-item">
                                <i class="fa fa-money"></i>采购总金额：
                                <span class="">{{info.buyAmount|money}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="fa fa-money"></i>入库总金额：
                                <span class="">{{info.inAmount|money}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="fa fa-money"></i>出库总金额：
                                <span class="">{{info.outAmount|money}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="fa fa-money"></i>库存总金额：
                                <span class="">{{info.storeAmount|money}}</span>
                            </li>
                            <li class="list-group-item" style="padding:1em;">
                                <div class="btn btn-default btn-block" @click="handleClickCompare(info.project!=null)">交资信息查看</div>
                            </li>
    
                        </ul>
                    </div>
                </div>
                <div class="col-sm-9">
    
                    <div class="row">
                        <div class="col-sm-6" v-if="pieDataBuy.length>0">
                            <div class="p3">
                                <h4>经仓采购物资</h4>
                                <Chart width="99%" height="300px" :option="optionPieBuy" theme="macarons" loading></Chart>
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul class="list-group">
                                            <li class="list-group-item" v-for="(x,index) of pieDataBuy">
                                                <span class="pull-right">{{x.value | money}}</span>
                                                <a @click="handleClickBuy(x.code)">{{x.name}}</a>
                                            </li>
                                        </ul>
    
                                    </div>
    
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6" v-if="pieDataOut.length>0">
                            <div class="p3">
                                <h4>物资平台出库</h4>
                                <Chart width="100%" height="300px" :option="optionPieOut" theme="macarons" loading></Chart>
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul class="list-group">
                                            <li class="list-group-item" v-for="(x,index) of pieDataOut">
                                                <span class="pull-right">{{x.value | money}}</span>
                                                <a @click="handleClickOut(x.code)">{{x.name}}</a>
                                            </li>
                                        </ul>
                                    </div>
    
                                </div>
    
                            </div>
    
                        </div>
    
                        <div class="col-sm-6" v-if="pieDataBuyDirect.length>0">
                            <div class="p3">
                                <h4>直发采购物资</h4>
                                <Chart width="99%" height="300px" :option="optionPieBuyDirect" theme="macarons" loading></Chart>
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul class="list-group">
                                            <li class="list-group-item" v-for="(x,index) of pieDataBuyDirect">
                                                <span class="pull-right">{{x.value | money}}</span>
                                                <a @click="handleClickBuyDirect(parseInt(x.code))">{{x.name}}</a>
                                            </li>
                                        </ul>
    
                                    </div>
    
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6" v-if="pieDataOutERP.length>0">
                            <div class="p3">
                                <h4>ERP平台出库</h4>
                                <Chart width="100%" height="300px" :option="optionPieOutERP" theme="macarons" loading></Chart>
                                <div class="row">
                                    <div class="col-md-12">
                                        <ul class="list-group">
                                            <li class="list-group-item" v-for="(x,index) of pieDataOutERP">
                                                <span class="pull-right">{{x.value | money}}</span>
                                                <a @click="handleClickOutERP(parseInt(x.code))">{{x.name}}</a>
                                            </li>
                                        </ul>
                                    </div>
    
                                </div>
    
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
            <div id="asset">
                <router-view></router-view>
            </div>
        </div>
    
        <MyModal :option="buyModalOption" title="采购物资详情">
            <div class="row">
                <div class="col-md-12">
                    <Excel selector="#projectOneTable1" class="pull-right">
                        <button class="btn btn-default">
                            <span class="fa fa-download"></span>
                        </button>
                    </Excel>
                </div>
    
            </div>
            <div style="height:430px;overflow-y:scroll;">
    
                <table id="projectOneTable1" class="table">
                    <thead>
                        <tr>
                            <th>物资编号</th>
                            <th>物资名称</th>
                            <th>采购单号</th>
                            <th>数量</th>
                            <th>单价</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of buygoods">
                            <td>{{x.goodstype_code}}</td>
                            <td>
                                <span v-html="x.goodstype_name"></span>
                            </td>
                            <td>{{x.buyorder_code}}</td>
                            <td>{{x.buy_count}}</td>
                            <td>{{x.no_tax_price}}</td>
                            <td>
                                <a @click="handleItemClick(x.id)">使用详情</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
    
            </div>
        </MyModal>
    
        <MyModal :option="outModalOption" title="出库物资详情">
            <div class="row">
                <div class="col-md-12">
                    <Excel selector="#projectOneTable2" class="pull-right">
                        <button class="btn btn-default">
                            <span class="fa fa-download"></span>
                        </button>
                    </Excel>
                </div>
    
            </div>
            <div style="height:430px;overflow-y:scroll;">
    
                <table id="projectOneTable2" class="table">
                    <thead>
                        <tr>
                            <th>物资编号</th>
                            <th>物资名称</th>
                            <th>需求单号</th>
                            <th>数量</th>
                            <th>单价</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of outgoods">
                            <td>{{x.goodstype_code}}</td>
                            <td>
                                <span v-html="x.goodstype_name"></span>
                            </td>
                            <td>{{x.order_code}}</td>
                            <td style="padding-left:1em;">{{x.ready_out_count}}</td>
                            <td>{{x.single_price}}</td>
                            <td>
                                <a @click="handleItemClickForOut(x.qrcode_code)">详情</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
    
            </div>
        </MyModal>
        <MyModal :option="outModalOptionERP" title="ERP出库物资">
            <div class="row">
                <div class="col-md-12">
                    <Excel selector="#projectOneTable2" class="pull-right">
                        <button class="btn btn-default">
                            <span class="fa fa-download"></span>
                        </button>
                    </Excel>
                </div>
    
            </div>
            <div style="height:430px;overflow-y:scroll;">
    
                <table id="projectOneTable2" class="table">
                    <thead>
                        <tr>
                            <th>物资编号</th>
                            <th>物资名称</th>
                            <th>需求部门</th>
                            <th>数量</th>
                            <th>单价</th>
    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of outgoodsERP">
                            <td>{{x.item_code}}</td>
                            <td>
                                <span v-html="x.item_desc"></span>
                            </td>
                            <td>{{x.require_dept}}</td>
                            <td>{{x.issued_quantity}}</td>
                            <td>{{x.unit_cost}}</td>
    
                        </tr>
                    </tbody>
                </table>
    
            </div>
        </MyModal>
        <MyModal :option="buyModalOptionDirect" title="采购物资详情">
            <div class="row">
                <div class="col-md-12">
                    <Excel selector="#projectOneTable3" class="pull-right">
                        <button class="btn btn-default">
                            <span class="fa fa-download"></span>
                        </button>
                    </Excel>
                </div>
    
            </div>
            <div style="height:430px;overflow-y:scroll;">
    
                <table id="projectOneTable3" class="table">
                    <thead>
                        <tr>
                            <th>物资编号</th>
                            <th>物资名称</th>
                            <th>采购单号</th>
                            <th>数量</th>
                            <th>单价</th>
    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of buygoodsDirect">
                            <td>{{x.mate_code_cg}}</td>
                            <td>
                                <span v-html="x.mate_desc_cg"></span>
                            </td>
                            <td>{{x.order_no}}</td>
                            <td>{{x.mate_qty}}</td>
                            <td>{{x.prot_price}}</td>
    
                        </tr>
                    </tbody>
                </table>
    
            </div>
        </MyModal>
        <MyModal :option="useModalOption" title="使用物资详情" small>
            <div v-if="loading" class="row center-block">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
            <div v-if="inInfo.length==0 && !loading" class="row">
                <div class="col-md-12">
                    <div class="alert alert-danger" role="alert">此物资目前未入库</div>
                </div>
            </div>
            <div v-else class="row">
                <div v-for="x of inInfo" class="col-md-12">
                    <div class="content">
                        <article>
                            <h4>{{x.goodstype_descp}} {{x.recv_count}}{{x.unit}}</h4>
                            <br>
                            <section>
                                <span class="point-time point-red"></span>
                                <time :datetime="x.date">
                                    <span>{{x.date}}</span>
                                    <span>{{x.realname}}</span>
                                </time>
                                <aside>
                                    <p class="things">{{x.realname}}在 {{x.createtime}} 接收物资 {{x.recv_count}}{{x.unit}}</p>
                                    <p class="brief">
                                        <span class="text-red">到货信息</span>
                                    </p>
                                </aside>
                            </section>
                            <div v-for="y of x.requireInfo">
                                <section>
                                    <span class="point-time point-green"></span>
                                    <time :datetime="y.date">
                                        <span>{{y.date}}</span>
                                        <span>{{y.realname}}</span>
                                    </time>
                                    <aside>
                                        <p class="things">{{y.realname}}在 {{y.createtime}} 提出需求 {{y.ready_out_count}}{{x.unit}}</p>
                                        <p v-if="y.project_name" class="things">项目名称:{{y.project_name}}</p>
                                        <p v-if="y.follow_comp_name" class="things">施工单位:{{y.follow_comp_name}}</p>
                                        <p class="brief">
                                            <span class="text-green">需求信息</span>
                                        </p>
                                    </aside>
                                </section>
                                <section v-for="z of y.outInfo">
                                    <span class="point-time point-blue"></span>
                                    <time :datetime="z.date">
                                        <span>{{z.date}}</span>
                                        <span>{{z.realname}}</span>
                                    </time>
                                    <aside>
                                        <p class="things">{{z.realname}}在 {{z.createtime}} 发起出库单</p>
                                        <p class="things" v-if="z.order_status=='over'">{{z.storer}}在 {{z.endtime}} 扫码出库</p>
                                        <p class="brief">
                                            <span class="text-blue">物资出库</span>
                                        </p>
                                    </aside>
                                </section>
                            </div>
    
                        </article>
                    </div>
                </div>
            </div>
    
        </MyModal>
        <MyModal :option="goodsModalOption" title="物资详情">
             <TraceTable :qrcode="selqrcode" level=1 @showD="handleClickForFollow"></TraceTable>
        </MyModal>
        
        <MyModal :option="outTraceModalOption" title="物资追溯" small>
            <TraceInfo :qrcode="selqrcode" level=1></TraceInfo>
        </MyModal>
    </div>
</template>

<script>

import MyModal from '@/components/MyModal'
import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
import TraceTable from '@/components/TraceTable'
import TraceInfo from '@/components/TraceInfo'
import Excel from '@/components/Excel'

export default {

    data() {
        return {
            menus: [],
            info: null,
            project: null,
            auditDesc:"",

            pieDataBuy: {},
            optionPieBuy: {},
            buygoods: [],
            inInfo: [],
            loading: true,
            pieDataOut: {},
            optionPieOut: {},
            outgoods: [],
            pieDataBuyDirect: {},
            optionPieBuyDirect: {},
            buygoodsDirect: [],
            pieDataOutERP: {},
            optionPieOutERP: {},
            outgoodsERP: [],

            backStep: -1,
            buyModalOption: {},
            buyModalOptionDirect: {},
            outModalOption: {},
            outModalOptionERP: {},
            useModalOption: {},
            selqrcode: 0,
       
            goodsModalOption: {},
            outTraceModalOption: {},
          
        }
    },
    computed: {
        comp_id() {
            return this.$store.state.project.comp_id;
        },
        storecomp_code() {
            return this.$store.state.project.storecomp_code;
        },
        project_code() {
            return this.$store.state.project.project_code;
        },
        project_status() {
            return this.$store.state.project.status;
        },
    },
    watch: {
        'project_code': 'init',
        'pieDataBuy': 'drawPieBuy',
        'pieDataBuyDirect': 'drawPieBuyDirect',
        'pieDataOut': 'drawPieOut',
        'pieDataOutERP': 'drawPieOutERP',
    },
    mounted() {
        this.init()

    },
    methods: {
        init() {
            // console.log(this.project_code)
            this.$store.dispatch("project_info_index").then((resp) => {
                this.info = resp.body.itemMap
            });
            this.$store.dispatch("project_erp_one", { project_id: this.project_code }).then((resp) => {
                this.project = resp.data[0]
            });
            this.$store.dispatch("project_erp_one_audit", { project_id: this.project_code }).then((resp) => {
                this.auditDesc = resp.data.length>0&&resp.data[0].value=="1"?"是":"否"
            });
            this.$store.dispatch("project_info_buy", { comp_id: this.comp_id, project_code: this.project_code }).then((resp) => {
                var items = resp.body.items
                this.pieDataBuy = items;
            });
            this.$store.dispatch("project_info_out", { comp_id: this.comp_id, project_code: this.project_code }).then((resp) => {
                var items = resp.body.items
                this.pieDataOut = items;
            });
            this.$store.dispatch("project_info_buy_direct", { storecomp_code: this.storecomp_code, project_id: this.project_code }).then((resp) => {
                var items = resp.data
                this.pieDataBuyDirect = items;
            });
            this.$store.dispatch("project_info_out_erp", { storecomp_code: this.storecomp_code, project_id: this.project_code }).then((resp) => {
                var items = resp.data
                this.pieDataOutERP = items;
            });
        },
        handleClickBuy(level_one_code) {
            this.buyModalOption = { visable: true }
            this.$store.dispatch("project_info_buylist", { comp_id: this.comp_id, project_code: this.project_code, level_one_code }).then((resp) => {
                this.buygoods = resp.body.items
            });
        },
        handleClickBuyDirect(level_one_code) {
            this.buyModalOptionDirect = { visable: true }
            this.$store.dispatch("project_info_buylist_direct", { storecomp_code: this.storecomp_code, project_id: this.project_code, big_type: level_one_code }).then((resp) => {
                this.buygoodsDirect = resp.data
            });
        },
        handleItemClick(id) {
            this.useModalOption = { visable: true }
            this.loading = true
            this.$store.dispatch("trace_buyGoodsInfo", { id: id }).then(resp => {
                this.inInfo = resp.body.itemMap.inInfo
                this.loading = false;
            });

        },
        handleClickOut(level_one_code) {
            this.outModalOption = { visable: true }
            this.$store.dispatch("project_info_outlist", { comp_id: this.comp_id, project_code: this.project_code, level_one_code }).then((resp) => {
                this.outgoods = resp.body.items
            });
        },
        handleClickOutERP(level_one_code) {
            this.outModalOptionERP = { visable: true }
            this.$store.dispatch("project_info_outlist_erp", { storecomp_code: this.storecomp_code, project_id: this.project_code, big_type: level_one_code }).then((resp) => {
                this.outgoodsERP = _.sortBy(resp.data,'item_code')
            });
        },
        handleItemClickForOut(qrcode_code) {
            this.selqrcode = qrcode_code
            this.goodsModalOption={visable:true}
            
        },
        handleClickForFollow(qrcode_code){
            console.log("handle showD")
            this.selqrcode = qrcode_code
            this.outTraceModalOption = { visable: true }
        },
        handleClickCompare(linked) {
            this.backStep = -2
            this.$store.commit('setProLinked', linked)
            this.$router.push({ name: 'ProjectAsset' })
            $("body,html").animate({scrollTop: $("#asset").offset().top}, 1000)
        },
        handleSearch(text) {
            this.$store.commit("setProSearchState", true)
            this.$store.commit("setProSearchText", text)
            this.$router.push("/project")
        },
        drawPieBuy() {
            this.optionPieBuy = {
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
                        name: '物资类型',
                        type: 'pie',
                        radius: ['20%', '55%'],
                        data: this.pieDataBuy
                    }
                ]
            }
        },
        drawPieBuyDirect() {
            this.optionPieBuyDirect = {
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
                        name: '物资类型',
                        type: 'pie',
                        radius: ['20%', '55%'],
                        data: this.pieDataBuyDirect
                    }
                ]
            }
        },
        drawPieOut() {
            this.optionPieOut = {
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
                        name: '物资类型',
                        type: 'pie',
                        radius: ['20%', '55%'],
                        data: this.pieDataOut
                    }
                ]
            }
        },
        drawPieOutERP() {
            this.optionPieOutERP = {
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
                        name: '物资类型',
                        type: 'pie',
                        radius: ['20%', '55%'],
                        data: this.pieDataOutERP
                    }
                ]
            }
        },

    },
    components: {
        Chart, MyMenu, MyModal, TraceTable,TraceInfo, Excel
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../assets/timeline.css";

.project-info {
    font-size: 1.05em;
    li {
        padding: 1em 0.2em 1em 1em;

        .fa {
            margin-right: 1em;
        }
    }
}

.p3 {
    border: 1px solid #d5d5d5;
    border-radius: 1em;
    padding: 1em;
    padding-top: 0;
    margin-bottom: 1.0em;
    >h4 {
        padding: 0.3em 1em 0.8em;
        border-bottom: 1px solid #dfdfdf;
    }
}

.table {
    td {
        max-width: 14em;
    }
}
table.goods-modal{
    margin-left: 2em;
    > tr{
        height:2.4em;
        td:nth-child(1){
            width:8em;
        }
    }
}
</style>

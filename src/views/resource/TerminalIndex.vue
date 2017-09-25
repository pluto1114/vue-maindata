<template>
    <div class="index">
        <MyMenu :items="menus" back=true @click:search="searchByDate"></MyMenu>

        <div class="container">
            <div class="row">
                <div class="col-md-12 banner">
                    <div class="row">
                        <div class="title col-sm-4">固网终端分析</div>
                        <div class="total col-sm-offset-6 col-sm-2">

                        </div>
                    </div>
                </div>

                <div class="col-md-12 content">
                    <div class="form-inline">
                        <div class="form-group">

                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-search"></i>
                                </div>
                                <input type="text" class="form-control" placeholder="sn查询..." v-model="searchKey" @keyup.enter="handleSearch" style="width:20em;">
                            </div>
                        </div>
                    </div>
                    <br>
                    <h4>在库终端信息</h4>
                    <Chart width="100%" height="600px" :option="optionBar_in" :actionOption="actionOption" theme="infographic" @chartClick="handleBarClick" loading></Chart>
                    <br>
                    <h4>在网终端信息</h4>
                    <Chart width="100%" height="600px" :option="optionBar_on" :actionOption="actionOption" theme="shine" @chartClick="handleBarClick" loading></Chart>
                </div>
            </div>
        </div>

        <MyModal :option='compModalOption' :title="compModalTitle" small>
            <div style="height:630px;overflow-y:scroll;">
                <table class="table">
                    <thead>
                        <tr>

                            <th>组织编码</th>
                            <th>组织名称</th>
                            <th>数量</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of orgItems" :key="x.code">
                            <td>{{x.code}}</td>
                            <td>{{x.name}}</td>
                            <td>{{x.value}}</td>
                            <td>
                                <a @click="handleDetail(x)">详情</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MyModal>
        <MyModal :option='dtlModalOption' :title="dtlModalTitle">
            <div class="row">
                <div class="col-md-12">
                    <Excel selector="#terminalIndexDtlTable" class="pull-right">
                        <button class="btn btn-default">
                            <span class="fa fa-download"></span>
                        </button>
                    </Excel>
                </div>

            </div>
            <div style="height:630px;overflow-y:scroll;" v-if="type=='in'">
                <table id="terminalIndexDtlTable" class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>终端编码</th>
                            <th>终端名称</th>
                            <th>串码</th>
                            <th>库存名称</th>
                            <th>入库日期</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x,i) of dtlItems" :key="i">
                            <td>{{i+1}}</td>
                            <td>{{x.comdity_code}}</td>
                            <td>{{x.comdity_name}}</td>
                            <td>
                                <a @click="handleLink(x.imei)">{{x.imei}}</a>
                            </td>
                            <td>{{x.storage_name}}</td>
                            <td>{{x.first_storage_date}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="height:630px;overflow-y:scroll;" v-else>
                <table id="terminalIndexDtlTable" class="table">
                    <thead>
                        <tr>
                            <th>商品编号</th>
                            <th>商品名称</th>
                            <th>装维人</th>
                            <th>串码</th>
                            <th>终端状态</th>
                            <th>所属组织</th>
                            <th>宽带号码</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x,i) of dtlItems" :key="i">
                            <td>{{x.comdity_code}}</td>
                            <td>{{x.comdity_name}}</td>
                            <td>{{x.fix_oper_name}}</td>
                            <td>
                                <a @click="handleLink(x.sn_new_code)">{{x.sn_new_code}}</a>
                            </td>
                            <td>{{x.sale_state_name}}</td>
                            <td>{{x.organ_name}}</td>
                            <td>{{x.broadband}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MyModal>

        <MyModal :option="searchModalOption" title="终端查询" small>
            <div class="form-inline">
                <div class="form-group">
                    <mu-date-picker hintText="开始日期" v-model="startDate" autoOk/>
                </div>
                <div class="form-group">
                    <mu-date-picker hintText="截止日期" v-model="endDate" autoOk/>
                </div>
                <div class="form-group">
                <button class="btn btn-default" @click="pushDate">查询</button>
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
            optionBar_in: {},
            optionBar_on: {},
            comp_id: 2,
            goods_type: "",
            type: "in",
            orgItems: [],
            dtlItems: [],
            searchModalOption: {},
            startDate: '',
            endDate: '',
            dtlModalOption: {},
            compModalOption: {},
            actionOption: null,
            compModalTitle: "组织列表",
            dtlModalTitle: "",
            searchKey: ""
        }
    },
    watch: {

    },
    mounted() {
        this.menus = [{ name: "按时间段查询", customEvent: "click:search" }]
        this.initBar("in")
        this.initBar("on")

    },
    methods: {
        handleSearch() {
            if (this.searchKey == "") return
            this.$router.push({ name: "TerminalSearch", params: { searchKey: this.searchKey } })
        },
        handleBarClick(params) {
            console.log(params)
            this.actionOption = {
                type: 'hideTip'
            }
            this.comp_id = params.data.comp_id
            this.goods_type = params.data.code
            this.type = params.data.type
            this.orgItems = []
            this.compModalTitle = `组织列表（${params.data.name}）`
            this.compModalOption = { visable: true }
            this.$store.dispatch("terminal_index_orgs", { comp_id: this.comp_id, goods_type: this.goods_type, type: this.type }).then(resp => {
                this.orgItems = resp.data
            })
        },
        handleDetail(org) {
            this.dtlItems = []
            this.dtlModalTitle = org.name
            this.dtlModalOption = { visable: true }
            this.$store.dispatch("terminal_index_orgs_detail", { code: org.code, goods_type: this.goods_type, type: this.type }).then(resp => {
                this.dtlItems = resp.data
            })
        },
        handleLink(imei) {
            this.$root.$emit("modalHideAll")
            this.searchKey = imei
            this.handleSearch()
        },
        searchByDate() {
            this.searchModalOption = { visable: true, footer: false }
        },
        pushDate(){
            this.$root.$emit("modalHideAll")
             this.$router.push({ name: "TerminalSearchByDate", params: { startDate: this.startDate,endDate:this.endDate } })
        },
        initBar(type) {
            this.$store.dispatch("terminal_index", { type }).then((resp) => {
                let compNames = _.pluck(resp.data, "name")
                let types = _.pluck(resp.data[0].list1, "name")
                let series = []
                for (let i = 0; i < types.length; i++) {
                    series.push({
                        name: types[i],
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: _.map(resp.data, n => {
                            n.list1[i].comp_id = n.code
                            n.list1[i].type = type
                            return n.list1[i]
                        })
                    })
                }

                this["optionBar_" + type] = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: types
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: compNames,
                        nameTextStyle: {
                            fontSize: 16,
                            color: '#ff0000'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 30,
                            shadowColor: 'rgba(0, 0, 0, 0.4)'
                        }
                    },
                    series: series
                }
            })
        }
    },
    components: {
        Chart, MyMenu, MyModal, Excel
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
</style>

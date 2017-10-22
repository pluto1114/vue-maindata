<template>
    <div class="index">
        <MyMenu :items="menus" back=true></MyMenu>

        <div class="container">
            <div class="row">
                <div class="col-md-12 banner">
                    <div class="row">
                        <div class="title col-sm-4">固网终端查询</div>
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
                    <div class="panels">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">在网信息</h3>
                            </div>
                            <div class="panel-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>商品编号</th>
                                            <th>商品名称</th>
                                            <th>装维人</th>
                                            <th>盟市</th>
                                            <th>终端状态</th>
                                            <th>所属组织</th>
                                            <th>宽带号码</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="list_1.length">
                                        <tr v-for="(x,i) of list_1" :key="i">
                                            <td>{{x.comdity_code}}</td>
                                            <td>{{x.comdity_name}}</td>
                                            <td>{{x.fix_oper_name}}</td>
                                            <td>{{x.localname}}</td>
                                            <td>{{x.sale_state_name}}</td>
                                            <td>{{x.organ_name}}</td>
                                            <td>{{x.broadband}}</td>

                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="6" style="text-align:center;">目前没有相关信息</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">待装信息</h3>
                            </div>
                            <div class="panel-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>商品编号</th>
                                            <th>商品名称</th>
                                            <th>装维人</th>
                                            <th>盟市</th>
                                            <th>终端状态</th>
                                            <th>所属组织</th>
                                            <th>宽带号码</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="list_4.length">
                                        <tr v-for="(x,i) of list_4" :key="i">
                                            <td>{{x.comdity_code}}</td>
                                            <td>{{x.comdity_name}}</td>
                                            <td>{{x.fix_oper_name}}</td>
                                            <td>{{x.localname}}</td>
                                            <td>{{x.sale_state_name}}</td>
                                            <td>{{x.organ_name}}</td>
                                            <td>{{x.broadband}}</td>

                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="6" style="text-align:center;">目前没有相关信息</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">在库信息</h3>
                            </div>
                            <div class="panel-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>商品编号</th>
                                            <th>商品名称</th>
                                            <!-- <th>库存名称</th> -->
                                            <th>ESS渠道名称</th>
                                            <th>盟市</th>

                                            <th>入库时间</th>
                                            <th>更新时间</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="list_2.length">
                                        <tr v-for="(x,i) of list_2" :key="i">
                                            <td>{{x.comdity_code}}</td>
                                            <td>{{x.comdity_name}}</td>
                                            <td>{{x.ess_chanel_name}}</td>
                                            <!-- <td>{{x.storage_name}}</td> -->
                                            <td>{{x.localname}}</td>

                                            <td>{{x.first_storage_date}}</td>
                                            <td>{{x.update_date}}</td>

                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="6" style="text-align:center;">目前没有相关信息</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">业务工单</h3>
                            </div>
                            <div class="panel-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>商品编号</th>
                                            <th>商品名称</th>
                                            <th>业务类型</th>

                                            <th>盟市</th>
                                            <th>所属组织</th>

                                            <th>创建人</th>
                                            <th>创建时间</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="list_3.length">
                                        <tr v-for="(x,i) of list_3" :key="i">
                                            <td>{{x.comdity_code}}</td>
                                            <td>{{x.comdity_name}}</td>
                                            <td>{{x.business}}</td>
                                            <td>{{x.localname}}</td>
                                            <td>{{x.organ_name}}</td>

                                            <td>{{x.create_code}}</td>
                                            <td>{{x.create_date}}</td>

                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="6" style="text-align:center;">目前没有相关信息</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
            list_1: [],
            list_2: [],
            list_3: [],
            list_4: [],

            searchKey: ""
        }
    },
    watch: {

    },
    mounted() {
        this.searchKey = this.$route.params["searchKey"]
        this.search()

    },
    methods: {
        handleSearch() {
            if (this.searchKey == "") return
            this.search()
        },
        search() {
            this.$store.dispatch("terminal_index_search", { sn: this.searchKey }).then((resp) => {

                this.list_1 = _.find(resp.data, { code: "apply" }).list1
                this.list_2 = _.find(resp.data, { code: "library" }).list1
                this.list_3 = _.find(resp.data, { code: "storage" }).list1
                this.list_4 = _.find(resp.data, { code: "ready" }).list1
            })
        }
    },
    components: {
        Chart, MyMenu, MyModal
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../assets/animate.less';
.panel {
    .animated;
    .zoomInUp;
}

//定义
.shown-loop(@n, @i: 1) when (@i <=@n) {
    .panels>.panel:nth-child(@{i}) {
        animation-duration: @i*1200ms;
    }
    .shown-loop(@n, (@i + 1));
}

.shown-loop(4);
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

<template>
    <div class="row">
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title box">
                        <span class="box-cell-1">物资平台</span>
                        <Excel v-if="outgoods.length>0" :cols="{'name':'物资名称','value':'物资数量'}" :items="outgoods" filename="物资平台">
                            <i class="fa fa-download"></i>
                        </Excel>
                    </h3>
                </div>
                <div class="panel-body">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(x,index) of outgoods" :key="x">
                            <span class="badge">{{x.value|money}}{{x.unit}}</span>
                            <span v-html="x.name"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title box">
                        <span class="box-cell-1">ERP出库</span>
                        <Excel v-if="erpgoods.length>0" :cols="{'name':'物资名称','value':'物资数量'}" :items="erpgoods" filename="ERP出库">
                            <i class="fa fa-download"></i>
                        </Excel>
                    </h3>
                </div>
                <div class="panel-body">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(x,index) of erpgoods">
                            <span class="badge">{{x.value|money}}{{x.unit}}</span>
                            <span>{{x.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title box">
                        <span class="box-cell-1">ERP交资</span>
                        <Excel v-if="assetgoods.length>0" :cols="{'name':'物资名称','value':'物资数量'}" :items="assetgoods" filename="ERP交资">
                            <i class="fa fa-download"></i>
                        </Excel>
                    </h3>
                </div>
                <div class="panel-body">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(x,index) of assetgoods">
                            <span class="badge">{{x.value|money}}</span>
                            <span>{{x.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="panel-footer">
                    <div class="btn btn-default" @click="handleClickAssetX">退库调拨信息</div>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title box">
                        <span class="box-cell-1">资源管理交资</span>
                        <Excel v-if="resoucegoods.length>0" :cols="{'name':'物资名称','value':'物资数量'}" :items="resoucegoods" filename="资源管理交资">
                            <i class="fa fa-download"></i>
                        </Excel>
                    </h3>
                </div>
                <div class="panel-body">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(x,index) of resoucegoods">
                            <span class="badge">{{x.value}}</span>
                            <span>{{x.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    
        <MyModal :option="assetModalOption" title="交资补充信息">
            <div v-if="loading" class="row center-block">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </div>
            <div v-else>
                <table class="table">
                    <caption>ERP退库明细</caption>
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>名称</th>
                            <th>数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of assetgoodsExt1">
                            <td>{{x.code}}</td>
                            <td>{{x.name}}</td>
                            <td>{{x.value}}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table">
                    <caption>ERP调拨出明细</caption>
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>名称</th>
                            <th>对应项目编号</th>
                            <th>数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of assetgoodsExt2">
                            <td>{{x.name1}}</td>
                            <td>{{x.name2}}</td>
                            <td>
                                <a @click="handleClickForExt(x.name3)" class="blue-link">{{x.name3}}</a>
                            </td>
                            <td>{{x.value}}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table">
                    <caption>ERP调拨入明细</caption>
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>名称</th>
                            <th>对应项目编号</th>
                            <th>数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of assetgoodsExt3">
                            <td>{{x.name1}}</td>
                            <td>{{x.name2}}</td>
                            <td>
                                <a @click="handleClickForExt(x.name3)">{{x.name3}}</a>
                            </td>
                            <td>{{x.value}}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table">
                    <caption>ERP以工抵料</caption>
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>名称</th>
                            <th>数量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of assetgoodsExt4">
                            <td>{{x.code}}</td>
                            <td>{{x.name}}</td>
                            <td>{{x.value}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MyModal>
    </div>
</template>

<script>


import Chart from '@/components/Chart'
import MyModal from '@/components/MyModal'
import Excel from '@/components/Excel'

export default {

    data() {
        return {
            menus: [],
            info: null,
            loading: true,

            outgoods: [],
            erpgoods: [],
            assetgoods: [],
            resoucegoods: [],

            assetModalOption: {},

            assetgoodsExt1: [],
            assetgoodsExt2: [],
            assetgoodsExt3: [],
            assetgoodsExt4: [],
        }
    },
    computed: {
        comp_id() {
            return this.$store.state.project.comp_id;
        },
        project_code() {
            return this.$store.state.project.project_code;
        },
        storecomp_code() {
            return this.$store.state.project.storecomp_code;
        },
        linked() {
            return this.$store.state.project.linked;
        },
    },
    watch: {

    },
    mounted() {
        console.log('linked', this.linked)
        this.$store.dispatch("project_asset_outlist", { comp_id: this.comp_id, project_code: this.project_code }).then((resp) => {
            this.outgoods = resp.body.items

        });
        this.$store.dispatch("project_asset_erplist", { storecomp_code: this.storecomp_code, project_id: this.project_code }).then((resp) => {
            this.erpgoods = resp.data

        });
        console.log(this.storecomp_code, this.project_code)
        this.$store.dispatch("project_asset_assetlist", { storecomp_code: this.storecomp_code, project_id: this.project_code }).then((resp) => {
            let groups = _.groupBy(resp.data, 'asset_name')
            let arr = []
            _.forIn(groups, (v, k) => {
                arr.push({ name: k, value: _.sum(v, 'current_units'), unit: v[0].unit_of_measure })
            })

            this.assetgoods = arr
        });
        this.$store.dispatch("project_asset_resclist", { storecomp_code: this.storecomp_code, project_id: this.project_code }).then((resp) => {
            this.resoucegoods = resp.data
        });

    },
    methods: {

        handleClickAssetX() {
            this.assetModalOption = { visable: true }
            this.$store.dispatch("project_asset_erplist_ext_1", { storecomp_code: this.storecomp_code, project_id: this.project_code }).then((resp) => {
                this.assetgoodsExt1 = resp.data
            })
            this.$store.dispatch("project_asset_erplist_ext_2", { storecomp_code: this.storecomp_code, project_id: this.project_code }).then((resp) => {
                this.assetgoodsExt2 = resp.data
                this.loading = false
            })
            this.$store.dispatch("project_asset_erplist_ext_3", { storecomp_code: this.storecomp_code, project_id: this.project_code }).then((resp) => {
                this.assetgoodsExt3 = resp.data
            })
            this.$store.dispatch("project_asset_erplist_ext_4", { storecomp_code: this.storecomp_code, project_id: this.project_code }).then((resp) => {
                this.assetgoodsExt4 = resp.data
            })

        },
        handleClickForExt(code) {
            this.$store.commit("setProProjectCode", code)
            this.$root.$emit("modalHideAll")
            this.$router.push("/project/one")
        }

    },
    components: {
        Chart, MyModal, Excel
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../assets/animate.less';
.list-group-item {
    // cursor: pointer;
    .badge {
        margin-left: 0.5em;
    }
}

.panel {
    .animated;
    .zoomInUp;
}

//定义
.shown-loop(@n, @i: 1) when (@i <=@n) {
    .row>div:nth-child(@{i}) {
        .panel {
            animation-duration: @i*600ms;
        }
    }
    .shown-loop(@n, (@i + 1));
}

.shown-loop(4);

a.blue-link{
    color: #1f67e0;
}
</style>

<template>
    <div class="index">
        <MyMenu :items="menus" back=true></MyMenu>
    
        <div class="demo-7 js my-search">
            <svg class="hidden">
                <defs>
                    <symbol id="icon-arrow" viewBox="0 0 24 24">
                        <title>arrow</title>
                        <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 " />
                    </symbol>
                    <symbol id="icon-drop" viewBox="0 0 24 24">
                        <title>drop</title>
                        <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z" />
                        <path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z" />
                    </symbol>
                    <symbol id="icon-search" viewBox="0 0 24 24">
                        <title>search</title>
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </symbol>
                    <symbol id="icon-cross" viewBox="0 0 24 24">
                        <title>cross</title>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </symbol>
                </defs>
            </svg>
            <main class="main-wrap">
                <div class="container page-info">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    项目所属公司
                                </div>
                                <div class="panel-body">
                                    <ul class="menu-1" v-if="statusListData">
    
                                        <li v-for="(x,index) of statusListData.data" :key="x">
                                            <h3 class="box">
                                                <span class="box-cell-1">
                                                    {{x.name}}
                                                </span>
                                                <span class="value">
                                                    {{x.value}}
                                                </span>
                                            </h3>
                                            <ul>
                                                <li v-if="index==0">
                                                    <div class="box">
                                                        <a @click="handleClickForGeneral" class="box-cell-1">
                                                            概况
                                                        </a>
    
                                                    </div>
                                                </li>
                                                <li v-for="y of x.list1" :key="y">
                                                    <div class="box">
                                                        <a @click="handleStatusClick(x.code,y.code)" class="box-cell-1">
                                                            {{y.name}}
                                                        </a>
                                                        <span class="value">
                                                            {{y.value}}
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="panel panel-default" v-if="(storecomp_code && status && year) || searchState">
                                <div class="panel-heading">
                                    项目列表
                                    <i class="fa fa-search fa-lg pull-right" @click="openCtrlClick">
    
                                    </i>
                                </div>
                                <div class="panel-body">
                                    <!-- Nav tabs -->
                                    <div v-show="!searchState" class="btn-group" role="group">
                                        <button @click="freshList(x.code)" class="btn btn-default btn-lg" type="button" v-for="(x,index) of years">
                                            {{x.name}}({{x.value}})
                                        </button>
                                    </div>
                                    <!-- Tab panes -->
                                    <div class="project-list">
                                        <div v-if="loading" class="row center-block">
                                            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                                        </div>
                                        <ul class="list-group">
                                            <li @click="handleProClick(x)" class="list-group-item project-item" v-for="x of projects">
                                                <h4>
                                                    {{x.project_name}}<span v-if="x.is_one=='1'">（{{x.comp_name}}）</span>
                                                </h4>
                                                <p class="">
                                                    项目编号：{{x.project_number}}
                                                </p>
                                                <p class="">
                                                    项目经理：{{x.pm_person_name}}
                                                </p>
                                                <p class="">
                                                    开始时间：{{x.start_date|prettyDate}}
                                                </p>
                                            </li>
                                            <li class="list-group-item" v-if="projects.length==0 && !loading">
                                                <!-- 很遗憾，没有匹配项目！ -->
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default" v-else>
                                <div class="panel-heading">
                                    ERP项目分析
                                    <i class="fa fa-search fa-lg pull-right" @click="openCtrlClick">
    
                                    </i>
                                </div>
                                <div class="panel-body">
                                    <chart :option="optionBar1" height="450px" loading="" theme="macarons" width="100%">
                                    </chart>
                                    <div class="row">
                                        <div class="col-sm-5" style="padding-left:0.8em;padding-top:2em;">
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <i class="fa fa-bell-o fa-4x" aria-hidden="true"></i>
                                                </div>
                                                <div class="col-sm-9 total">
                                                    <div class="title">全区未完成项目总数</div>
                                                    <div class="number">{{summary.unfinishNum}}</div>
                                                </div>
                                            </div>
                                            
                                            <div class="row store-amount" style="margin-top:2em;">
                                                <div class="col-sm-4">项目年份</div>
                                                <div class="col-sm-4">项目数量</div>
                                                <div class="col-sm-4">项目金额</div>
                                            </div>
                                            <div v-for="(x,index) of summary.unfinishYears" class="row store-amount" v-if="summary.unfinishYears">
                                                <div class="col-sm-4">{{x.name}}</div>
                                                <div class="col-sm-4">{{x.value1}}</div>
                                                <div class="col-sm-4">￥{{(x.value2/10000).toFixed()}}万</div>
                                            </div> 
                                        </div>
                            
                                        <div class="col-sm-6">
                                            <chart :option="optionPie" height="320px" loading theme="macarons" width="100%" @chartClick="handleClickForPie"></chart>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="search-wrap">
                    <button @click="openCtrlClick" class="btn btn--search" id="btn-search" hidden>
                        <svg class="icon icon--search">
                            <use xlink:href="#icon-search">
                            </use>
                        </svg>
                    </button>
                    <button @click="closeCtrlClick" aria-label="Close search form" class="btn btn--hidden btn--search-close" id="btn-search-close">
                        <svg class="icon icon--cross">
                            <use xlink:href="#icon-cross">
                            </use>
                        </svg>
                    </button>
                </div>
                <header class="codrops-header">
    
                </header>
    
                <div class="search">
                    <div class="search__inner">
                        <form class="search__form" @submit.prevent>
                            <input class="search__input" type="search" placeholder="Search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" v-model="searchInput" @keyup.enter="searchPro" />
                            <span class="search__info">按回车键开始搜索</span>
                        </form>
                        <div class="search__related">
                            <div class="search__suggestion">
                                <h3>搜索目标项目?</h3>
                                <p>输入项目编号或项目名称中的部分内容来进行模糊查询</p>
                            </div>
                        </div>
                    </div>
                    <!-- /search__inner -->
                </div>
                <!-- /search -->
            </main>
            <!-- /main-wrap -->
        </div>

        <MyModal :option="yearModalOption" title="项目详情">
            <div class="row">
                <div class="col-sm-6 btn-ext">
                    
                </div>
                <div class="col-sm-6">
                    <div class="pull-right">
                        <input type="search" class="form-control" placeholder="搜索" v-model="searchTextPro">
                    </div>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>项目编号</th>
                        <th>项目名称</th>
                        <th>项目经理</th>
                        <th>状态</th>
                        <th>所属公司</th>
                        <th>启动时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="x of filterPro" :key="x">
                        <td><span class="project-number" @click="handleProClick(x)">{{x.project_number}}</span></td>
                        <td>{{x.project_name}}</td>
                        <td>{{x.pm_person_name.split(',')[0]}}</td>
                        <td>{{x.pjt_status_desc}}</td>
                        <td>{{x.pa_org_name|sub(17)}}</td>
                        <td>{{x.start_date|prettyDate}}</td>
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
import { mapState } from 'vuex';
export default {

    data() {
        return {
            menus: [],
            comps: [],

            years: [],
            projects: [],
            optionBar1: {},
            optionPie: {},
            summary:{},
            loading: false,

            searchInput: '',

            searchTextPro:'',
            projects:[],
            yearModalOption:{}
        }

    },
    computed: {
        ...mapState({
            statusListData: state => state.project.project_status_list_data,
            storecomp_code: state => state.project.storecomp_code,
            status: state => state.project.status,
            year: state => state.project.year,
            searchState: state => state.project.searchState,
            searchText: state => state.project.searchText,
        }),
        filterPro(){
            return filterArr(this.projects,this.searchTextPro)
        }
    },
    mounted() {

        this.$store.dispatch("project_status_list").then((resp) => {
            this.optionBar1 = {
                title: {
                    text: '全区项目分布'
                },
                tooltip: {},
                legend: {
                    data: ['数量']
                },
                xAxis: {
                    data: _.map(resp.data, item => item.name.substring(0, 2))
                },
                yAxis: {},
                itemStyle: {
                    normal: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
                series: [{
                    name: '数量',
                    type: 'bar',
                    data: resp.data
                }]
            }
            this.summary.totalNum=_.sum(resp.data,'value')
            this.$store.commit("setProStatusListData", resp)
            this.$nextTick(() => {
                $('.menu-1').lazeemenu();
            })
        })
        this.$store.dispatch("project_unfinish_year_list").then((resp) => {
            this.summary.unfinishNum=_.sum(resp.data,'value1')
            this.summary.unfinishYears=resp.data
            this.optionPie = {
                title: {
                    text: '未完成项目金额分布',
                    left: 'center'
                },
                color:["#ac2925","#f0ad4e","#5cb85c"],
                itemStyle: {
                    normal: {
                        shadowBlur: 30,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                },
                series: [
                    {
                        name: '年份',
                        type: 'pie',
                        radius: ['0%', '60%'],
                        data: _.map(resp.data, item =>{
                                return {name:item.name,value:item.value2}
                            })
                    }
                ]
            }
        })
        if (!this.searchState) {
            if (this.storecomp_code && this.status && this.year) {
                this.handleStatusClick(this.storecomp_code, this.status)
                this.freshList(this.year)
            }
        } else {
            this.searchInput = this.searchText
            this.searchPro()
        }
        document.addEventListener('keyup', ev => {
            // escape key.
            if (ev.keyCode == 27) {
                this.closeCtrlClick()
            }
        });

    },
    methods: {
        handleClickForGeneral() {
            this.$store.commit("setProStatus", null);
        },
        handleProClick(item) {
            this.$store.commit("setProCompId", item.comp_id)
            this.$store.commit("setProProjectCode", item.project_id||item.project_code||item.project_number)
            this.$store.commit("setProStoreCompCode", item.storecomp_code)
             this.$root.$emit("modalHideAll")
            this.$router.push("/project/one")
        },
        handleStatusClick(storecomp_code, status) {
            this.$store.commit("setProStoreCompCode", storecomp_code);
            this.$store.commit("setProStatus", status);

            this.$store.commit("setProSearchState", false)
            let statusList = this.statusListData.data;
            this.years = _.find(_.find(statusList, { code: this.storecomp_code })['list1'], { code: status })['list1']
            this.years = _.sortByOrder(this.years, ['code'], ['desc'])
            this.$store.commit("setProYear", this.years[0].code);
            this.freshList(this.year)
        },
        handleClickForPie(params){
            console.log(params.data)
            this.yearModalOption={visable:true}
            this.projects=[]
            this.$store.dispatch("project_unfinish_year_one", { year: params.data.name }).then((resp) => {
                this.projects = resp.data
            })
        },
        showBar() {
            let option = this.optionBar1
        },
        freshList(year) {
            this.projects = [];
            this.$store.commit("setProYear", year);
            this.$store.dispatch("project_erp_list", { storecomp_code: this.storecomp_code, state: this.status, year: this.year }).then((resp) => {
                this.projects = resp.data
            })
        },
        searchPro() {
            this.projects = []
            this.loading = true
            this.$store.commit("setProSearchState", true)
            this.$store.commit("setProSearchText", this.searchInput)
            this.$store.dispatch("project_erp_search", { condition: encodeURIComponent(this.searchInput) }).then((resp) => {
                this.projects = resp.data
                this.$nextTick(() => {
                    this.loading = false
                })
            });
            this.closeCtrlClick()
            return false
        },
        openCtrlClick() {
            var mainContainer = document.querySelector('.main-wrap'),
                openCtrl = document.getElementById('btn-search'),
                closeCtrl = document.getElementById('btn-search-close'),
                searchContainer = document.querySelector('.search'),
                inputSearch = searchContainer.querySelector('.search__input');

            mainContainer.classList.add('main-wrap--overlay');
            openCtrl.classList.add('btn--hidden');
            closeCtrl.classList.remove('btn--hidden');
            searchContainer.classList.add('search--open');
            inputSearch.focus();
        },
        closeCtrlClick() {
            var mainContainer = document.querySelector('.main-wrap'),
                openCtrl = document.getElementById('btn-search'),
                closeCtrl = document.getElementById('btn-search-close'),
                searchContainer = document.querySelector('.search'),
                inputSearch = searchContainer.querySelector('.search__input');

            mainContainer.classList.remove('main-wrap--overlay');
            openCtrl.classList.remove('btn--hidden');
            closeCtrl.classList.add('btn--hidden');
            searchContainer.classList.remove('search--open');
            inputSearch.blur();
            inputSearch.value = '';

        }
    },
    components: {
        Chart, MyMenu,MyModal
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../assets/animate.less';
@import '../../assets/search/demo.less';
@import '../../assets/search/style7.less';
.project-item {
    cursor: pointer;
    &:hover {
        // .animated; 
        // .pulse;
    }
}

.menu-1 {
    padding: 0.3em 0.5em;
    li {
        a {
            border: none;
        }
        padding: 0.5em 0.2em;
        .value {
            padding: 0.5em;
            color: #112266;
        }
    }
}


.total {
    .title {}
    .number {
        font-size: 2em;
        line-height: 1.8em;
    }
}

.store-amount {
    line-height: 2em;
    font-size: 1.2em;
}
.project-item {
    .animated;
    .fadeInRight;
}

//定义
.shown-loop(@n, @i: 1) when (@i <=@n) {
    .project-item:nth-child(@{i}) {
        animation-duration: @i*600ms;
    }
    .shown-loop(@n, (@i + 1));
}

.shown-loop(10);
.fa-search {
    margin-right: 0.2em;
}

.project-number{
    text-decoration: underline;
}
</style>

<template>
    <div class="index">
        <MyMenu :items="menus" back=true></MyMenu>

        <div class="container">
            <div class="row">
                <div class="col-md-12 banner">
                    <div class="row">
                        <div class="title col-sm-4">办公用品</div>
                        <div class="total col-sm-offset-6 col-sm-2">

                        </div>
                    </div>
                </div>

                <div class="col-md-12 content">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>名称</th>
                                <th>数量</th>
                                <th>计量单位</th>
                                <th>存放地点</th>
                                <th>资产管理员</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(x,i) of items" :key="x">
                                <td>{{i+1}}</td>
                                <td>{{x.name}}</td>
                                <td>{{x.c1}}</td>
                                <td>{{x.c2}}</td>
                                <td>{{x.c3}}</td>
                                <td>{{x.c4}}</td>
                            </tr>

                        </tbody>
                    </table>
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
            optionBar: {},
            comp_id: 2,
            dtlModalOption: {},
            compModalOption: {},

            names:['会议桌','办公桌','办公椅','办公沙发','文件柜','铁皮柜','电脑','打印机','传真机','复印机','投影仪'],
            items:[],
            searchKey: ""
        }
    },
    watch: {

    },
    mounted() {

        this.$store.dispatch("terminal_index").then((resp) => {
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
                    data: _.map(resp.data, n => n.list1[i].value)
                })
            }

            this.optionBar = {
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

                series: series
            }
        });

        this.names.forEach((n,i)=>{
            this.items.push({name:n,c1:'--',c2:'--',c3:'--',c4:'--'})
        })
    },
    methods: {
        handleSearch() {
            if (this.searchKey == "") return
            this.$router.push({ name: "TerminalSearch", params: { searchKey: this.searchKey } })
        }
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
</style>

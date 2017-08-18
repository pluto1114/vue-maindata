<template>
    <div class="index">
        <MyMenu :items="menus" back=true></MyMenu>
    
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
                                <div class="input-group-addon"><i class="fa fa-search"></i></div>
                                <input type="text" class="form-control" placeholder="sn查询..." v-model="searchKey" @keyup.enter="handleSearch" style="width:20em;">
                            </div>
                        </div>
                    </div>
                    <br>
                    <Chart width="100%" height="600px" :option="optionBar" theme="infographic" loading></Chart>
                </div>
            </div>
        </div>
    
        <MyModal :option='compModalOption' title="公司详情">
            <div style="height:630px;overflow-y:scroll;">
    
            </div>
        </MyModal>
    
        <MyModal :option='dtlModalOption' title="终端详情">
            <div style="height:630px;overflow-y:scroll;">
    
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
            optionBar: {},
            comp_id: 2,
            dtlModalOption: {},
            compModalOption: {},

            searchKey:""
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

        $('#myModal').on('hidden.bs.modal', e => {
            this.countyItems = []
        })
    },
    methods: {
        handleSearch(){
            if(this.searchKey=="") return
            this.$router.push({name:"TerminalSearch",params:{searchKey:this.searchKey}})
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

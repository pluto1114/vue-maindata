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
                        <tbody><tr>
                <td width="200" height="50"><p align="center">商品名称</p></td>
                <td width="120" height="50"><p align="center">品牌型号 </p></td>
                <td height="50"><p align="center">规 格 </p></td>
                <td width="120" height="50"><p align="center">批发价格 </p></td>
                <td width="120" height="50"><p align="center">零售价格</p></td>
              </tr>
              <tr>
                <td><p align="center">订书针 通用12#</p></td>
                <td><p align="center">齐心B3058</p></td>
                <td><p align="center">1000枚/盒 装订20页 </p></td>
                <td><p align="center"><strong>0.78</strong></p></td>
                <td><p align="center">1.5</p></td>
              </tr>
              <tr>
                <td><p align="center">回形针 防锈通用</p></td>
                <td><p align="center">齐心B3500</p></td>
                <td><p align="center">100枚/盒 29mm</p></td>
                <td><p align="center"><strong>1.1</strong>0</p></td>
                <td><p align="center">2.0</p></td>
              </tr>
              <tr>
                <td><p align="center">大头针 防锈通用</p></td>
                <td><p align="center">齐心B3536</p></td>
                <td><p align="center">50g/盒 </p></td>
                <td><p align="center"><strong>1.55</strong></p></td>
                <td><p align="center">2.0</p></td>
              </tr>
              <tr>
                <td><p align="center">图钉 防锈通用</p></td>
                <td><p align="center">得力 0020</p></td>
                <td><p align="center">1000枚/盒 </p></td>
                <td><p align="center"><strong>1.80</strong></p></td>
                <td><p align="center">3.0</p></td>
              </tr>
              <tr>
                <td><p align="center">美工刀 小型</p></td>
                <td><p align="center">齐心B2806</p></td>
                <td><p align="center">9mm</p></td>
                <td><p align="center"><strong>1.8</strong>0</p></td>
                <td><p align="center">3.0</p></td>
              </tr>
              <tr>
                <td><p align="center">美工刀 中型</p></td>
                <td><p align="center">得力 2001</p></td>
                <td><p align="center">100mm*18*0.5mm</p></td>
                <td><p align="center"><strong>1.99</strong></p></td>
                <td><p align="center">3.5</p></td>
              </tr>
              <tr>
                <td><p align="center">刀片 常规 </p></td>
                <td><p align="center">啄木鸟 </p></td>
                <td><p align="center">18mm 10片/盒 </p></td>
                <td><p align="center"><strong>2.50</strong></p></td>
                <td><p align="center">3.0</p></td>
              </tr>
              <tr>
                <td><p align="center">剪刀 中型</p></td>
                <td><p align="center">齐心B2715</p></td>
                <td><p align="center">170*60mm</p></td>
                <td><p align="center"><strong>2.90</strong></p></td>
                <td><p align="center">4.0</p></td>
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

        $('#myModal').on('hidden.bs.modal', e => {
            this.countyItems = []
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

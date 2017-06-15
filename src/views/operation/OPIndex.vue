<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    <div class="container">
    	
    	<div class="row">
            <div class="col-md-12">
                <table class="table">
                    <caption>出库运维物料2017年数据分析</caption>
                    <thead>
                        <tr>
                            <th>盟市</th>
                            <th v-for="x of erpMaterialNames">{{x}}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(x,index) of erpCompGroup">
                            <td>{{x.name}}</td>
                            <td v-for="y of x.group">{{y.value}}</td>
                            
                            <td ><a @click="handleTRClick(x)">详情</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>   
        </div>
    </div>
    
    <MyModal :option='compModalOption' title="盟市详情">
    
        <div style="height:430px;overflow-y:scroll;">
            <table class="table">
                <thead>
                    <tr>
                        <th>旗县</th>
                        <th v-for="x of erpMaterialNames">{{x}}</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(county,index) of erpCountyGroup">
                        <td>{{county.name}}</td>
                        <td v-for="(x1,index1) of erpMaterialNames"><a @click="handleNumberClick(county,x1)">{{fill(county,x1)}}</a></td>
                        
                        
                    </tr>
                </tbody>
            </table>             
        </div>
    </MyModal>

    <MyModal :option='countyModalOption' title="物资明细">
    
        <div style="height:430px;overflow-y:scroll;">
            <table class="table">
                <thead>
                    <tr>
                        <th>工单号</th>
                        <th>物料名称</th>
                        <th>领用人</th>
                        <th>时间</th>
                        <th>数量</th>
                        
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(x,index) of erpGoods">
                        <td>{{x.wo_nbr}}</td>
                        <td>{{x.name}}</td>
                        <td>{{x.staff_name}}</td>
                        <td>{{x.sts_date|prettyDate}}</td>
                        <td>{{x.amount}}</td>
                        
                        
                        
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

  data () {
    return {
        menus:[],
        cities:null,
 		optionBar1:{},
        erpCompGroup:[],
        erpMaterialNames:[],
        erpCountyGroup:[],
        erpGoods:[],
        compModalOption:{},
        countyModalOption:{}
    }
    
  },
  mounted(){

   

    this.$store.dispatch("operation_erp_index").then((resp)=>{
        let data=_.sortByAll(resp.data,['comp_name','material_name'])
        let compGroupBy=_.groupBy(data,'comp_name')
        compGroupBy=this.groupByAfter(compGroupBy)
        compGroupBy.forEach((comp,index)=>{
            let materialGroupBy=_.groupBy(comp.list,'material_name')
            materialGroupBy=this.groupByAfter(materialGroupBy,'total')
            comp.group=materialGroupBy
            comp.groupLabel=_.pluck(materialGroupBy,'name')
        })

        console.log(compGroupBy)
        this.erpCompGroup=compGroupBy;
        // this.erpMaterialNames=_.uniq(_.pluck(resp.data,'material_name'))
        this.erpMaterialNames=compGroupBy[0].groupLabel
        
    });
    
    
  },
  methods:{
  	
    handleNumberClick(county,material_name){
       
        let r=_.find(county.list,{material_name})
        if (r==null) {return}
        this.countyModalOption={visable:true}
        this.erpGoods=[]
        this.$store.dispatch("operation_erp_detail",{area_id:r.area_id,material_spec_id:r.material_spec_id}).then((resp)=>{
            this.erpGoods=resp.data          
        });
    },
    handleTRClick(comp){
        let data=_.sortByAll(comp.list,['area_name','material_name'])
        let countyGroupBy=_.groupBy(data,'area_name')
        countyGroupBy=this.groupByAfter(countyGroupBy)
        countyGroupBy.forEach((county,index)=>{
            let materialGroupBy=_.groupBy(county.list,'material_name')
            materialGroupBy=this.groupByAfter(materialGroupBy,'total')
            county.group=materialGroupBy
            county.groupLabel=_.pluck(materialGroupBy,'name')
        })
        this.erpCountyGroup=countyGroupBy
        this.compModalOption={visable:true}
    },
    groupByAfter(obj,sumField){
        let arr=[]
        _.forIn(obj,(v,k)=>{
            if (sumField) {
                let value=_.sum(v,sumField)
                arr.push({name:k,list:v,showlist:false,value})
            }else{
                arr.push({name:k,list:v,showlist:false})
            }
        })
        return arr
    },
    fill(county,material_name){
        let r=_.find(county.group,{name:material_name})
        if (r) {
            return r.value
        }else{
            return 0
        }
    }
  },
  components:{
  	Chart,MyMenu,MyModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.modal{
    td{
        max-width:8em;
    }
}

    


</style>

<template>
 
    

    <div class="row">
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">物资平台</h3>
                </div>
                <div class="panel-body">
                    <ul class="list-group">
                    <li class="list-group-item" v-for="(x,index) of outgoods">
                        <span class="badge">{{x.value}}</span>
                        <span v-html="x.name"></span>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">ERP出库</h3>
                </div>
                <div class="panel-body">
                    <ul class="list-group">
                    <li class="list-group-item" v-for="(x,index) of erpgoods">
                        <span class="badge">{{x.value}}</span>
                        <span>{{x.name}}</span>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                <h3 class="panel-title">ERP交资</h3>
                </div>
                <div class="panel-body">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(x,index) of assetgoods">
                            <span class="badge">{{x.value}}</span>
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
                    <h3 class="panel-title">资源管理交资</h3>
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
                        <th>数量</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="x of assetgoodsExt2">
                        <td>{{x.code}}</td>
                        <td>{{x.name}}</td>
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
                        <th>数量</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="x of assetgoodsExt3">
                        <td>{{x.code}}</td>
                        <td>{{x.name}}</td>
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
              
        </MyModal>  
    </div>
 
  
</template>

<script>


import Chart from '@/components/Chart'
import MyModal from '@/components/MyModal'

export default {

  data () {
    return {
        menus:[],
        info:null,
        
        outgoods:[],
        erpgoods:[],
        assetgoods:[],
        resoucegoods:[],

        assetModalOption:{},

        assetgoodsExt1:[],
        assetgoodsExt2:[],
        assetgoodsExt3:[],
        assetgoodsExt4:[],
    }    
  },
  computed:{
    comp_id(){
      return this.$store.state.project.comp_id;
    },
    project_code(){
      return this.$store.state.project.project_code;
    },
    storecomp_code(){
      return this.$store.state.project.storecomp_code;
    },
    linked(){
      return this.$store.state.project.linked;
    },
  },
  watch:{
   
  },
  mounted(){
    console.log('linked',this.linked)
    this.$store.dispatch("project_asset_outlist",{comp_id:this.comp_id,project_code:this.project_code}).then((resp)=>{
        this.outgoods=resp.body.items          
    });
    this.$store.dispatch("project_asset_erplist",{storecomp_code:this.storecomp_code,project_id:this.project_code}).then((resp)=>{
        this.erpgoods=resp.data         
    });
    console.log(this.storecomp_code,this.project_code)
    this.$store.dispatch("project_asset_assetlist",{storecomp_code:this.storecomp_code,project_id:this.project_code}).then((resp)=>{
        resp.data.forEach(item=>{
            item.value=parseFloat(item.current_units)
        })
        let groups=_.groupBy(resp.data,'asset_name')
        let arr=[]
        _.forIn(groups,(v,k)=>{
            arr.push({name:k,value:_.sum(v,'value')})
        })

        this.assetgoods=arr          
    });
   
  },
  methods:{
    handleClickAssetX(){
        this.assetModalOption={visable:true}
        this.$store.dispatch("project_asset_erplist_ext_1",{storecomp_code:this.storecomp_code,project_id:this.project_code}).then((resp)=>{
            this.assetgoodsExt1=resp.data        
        })
        this.$store.dispatch("project_asset_erplist_ext_2",{storecomp_code:this.storecomp_code,project_id:this.project_code}).then((resp)=>{
            this.assetgoodsExt2=resp.data        
        })
        this.$store.dispatch("project_asset_erplist_ext_3",{storecomp_code:this.storecomp_code,project_id:this.project_code}).then((resp)=>{
            this.assetgoodsExt3=resp.data        
        })
        this.$store.dispatch("project_asset_erplist_ext_4",{storecomp_code:this.storecomp_code,project_id:this.project_code}).then((resp)=>{
            this.assetgoodsExt4=resp.data        
        })

    },
    
    
  },
  components:{
    Chart,MyModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../assets/animate.less';
.list-group-item{
    .badge{
        margin-left: 0.5em;
    }
}
.panel{
    .animated;
    .zoomInUp;
}

//定义
.shown-loop(@n, @i:1) when (@i <= @n) {
    .row>div:nth-child(@{i}) {
        .panel{
            animation-duration: @i*600ms;
        }
    }
    .shown-loop(@n, (@i + 1));
}

.shown-loop(4);
</style>

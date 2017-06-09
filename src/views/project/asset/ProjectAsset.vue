<template>
 
    

    <div v-if="linked" class="row">
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">物资平台</h3>
                </div>
                <div class="panel-body">
                    <ul class="list-group">
                    <li class="list-group-item" v-for="(x,index) of outgoods">
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
          
    </div>

    <div v-else class="row">
        
        <div class="col-sm-4">
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
        <div class="col-sm-4">
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
            </div>
        </div>
        <div class="col-sm-4">
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
          
    </div>
 
  
</template>

<script>


import Chart from '@/components/Chart'


export default {

  data () {
    return {
        menus:[],
        info:null,
        
        outgoods:[],
        erpgoods:[],
        assetgoods:[],
        resoucegoods:[],
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
        this.assetgoods=resp.data          
    });
   
  },
  methods:{
    handleClickBuy(level_one_code){
        $('#myModalBuy').modal()
        this.$store.dispatch("project_info_buylist",{comp_id:this.comp_id,project_code:this.project_code,level_one_code}).then((resp)=>{
            this.buygoods=resp.body.items          
        });
    },
    handleClickOut(level_one_code){
        $('#myModalOut').modal()
        this.$store.dispatch("project_info_outlist",{comp_id:this.comp_id,project_code:this.project_code,level_one_code}).then((resp)=>{
            this.outgoods=resp.body.items          
        });
    },
    handleClickCompare(){

    },
    drawPieBuy(){       
        this.optionPieBuy={
            title: { 
                // text: '全区物资类型分布',
                left:'right'
            },
            tooltip:{},
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: ['20%','55%'],
                    data:this.pieDataBuy
                }
            ]
        }         
    },
    drawPieOut(){
        this.optionPieOut={
            title: { 
                // text: '全区物资类型分布',
                left:'right'
            },
            tooltip:{},
            series : [
                {
                    name: '物资类型',
                    type: 'pie',
                    radius: ['20%','55%'],
                    data:this.pieDataOut
                }
            ]
        }        
    }
    
  },
  components:{
    Chart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../../assets/animate.less';
.panel{
    .animated;
    .bounceInUp;
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

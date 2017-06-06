<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    <div class="container page-info">
    	<div class="row">
    		<div class="col-md-3">
                <div class="panel panel-default">
                    <div class="panel-heading">项目所属公司</div>
                    <div class="panel-body">
                       
                        <ul class="menu-1" v-if="statusListData">
                            <li v-for="x of statusListData.data">
                            <h3 class="box"><span class="box-cell-1">{{x.name}}</span><span class="value">{{x.value}}</span></h3>
                                <ul>
                            
                                    <li v-for="y of x.list1">
                                        <div class="box">
                                            <a class="box-cell-1" @click="handleStatusClick(x.code,y.code)">{{y.name}}</a><span class="value">{{y.value}}</span>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
              <div v-if="storecomp_code && status && year" class="panel panel-default"> 
                <div class="panel-heading">项目列表</div>
                <div class="panel-body">
                  <!-- Nav tabs -->
                  
                  <div class="btn-group" role="group" aria-label="...">
                    <button v-for="(x,index) of years" type="button" class="btn btn-default btn-lg" @click="freshList(x.code)">{{x.name}}({{x.value}})</button>
                  
                  </div>
                  <!-- Tab panes -->
                  <div class="project-list">
                    
                      <ul class="list-group">
                        <li class="list-group-item project-item" v-for="x of projects" @click="handleProClick(x.project_number,x.comp_id)">
                          <h4>{{x.project_name}}</h4>
                          <p class="">项目编号：{{x.project_number}}</p>
                          <p class="">项目经理：{{x.pm_person_name}}</p>
                          <p class="">开始时间：{{x.start_date|prettyDate}}</p>
                        </li>
                      </ul>
                    
                    
                  </div>
                    
                </div>
              </div>
              <div v-else class="panel panel-info">
                  <div class="panel-heading">ERP项目分析</div>
                  <div class="panel-body">
                      <Chart width="100%" height="600px" :option="optionBar1" theme='macarons' loading></Chart>
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
import { mapState } from 'vuex';
export default {

  data () {
    return {
        menus:[],
        comps:[],
        
        years:[],
        projects:[],
        optionBar1:{},
    }
    
  },
  computed:{
    ...mapState({
      statusListData:state=>state.project.project_status_list_data,
      storecomp_code:state=>state.project.storecomp_code,
      status:state=>state.project.status,
      year:state=>state.project.year,
    }),
  },
  mounted(){
    
    this.$store.dispatch("project_status_list").then((resp)=>{
      this.optionBar1={
          title: {
              text: '全区项目分布'
          },
          tooltip: {},
          legend: {
              data:['数量']
          },
          xAxis: {
              data: _.map(resp.data,item=>item.name.substring(0,2))
          },
          yAxis: {},
          series: [{
              name: '数量',
              type: 'bar',
              data: resp.data
          }]
      };
      this.$store.commit("setProStatusListData",resp)
      this.$nextTick(()=>{
          $('.menu-1').lazeemenu();
      })

    });
    
    
    if(this.storecomp_code && this.status && this.year){
      this.handleStatusClick(this.storecomp_code,this.status)
      this.freshList(this.year)
    }
    

    
  },
  methods:{
  
    handleProClick(project_id,comp_id){
      this.$store.commit("setProCompId",comp_id);
      this.$store.commit("setProProjectCode",project_id);
      this.$router.push("/project/one");
    },
    handleStatusClick(storecomp_code,status){
      this.$store.commit("setProStoreCompCode",storecomp_code);
      this.$store.commit("setProStatus",status);
     
      let statusList=this.statusListData.data;
      this.years=_.find(_.find(statusList,{code:this.storecomp_code})['list1'],{code:status})['list1']
      this.years=_.sortByOrder(this.years, ['code'], ['desc'])
      this.$store.commit("setProYear",this.years[0].code);
      this.freshList(this.year)
      
    },
    freshList(year){
      this.projects=[];
      this.$store.commit("setProYear",year);
      this.$store.dispatch("project_erp_list",{storecomp_code:this.storecomp_code,state:this.status,year:this.year}).then((resp)=>{
        this.projects=resp.data
      });
    }
  },
  components:{
  	Chart,MyMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../assets/animate.less';
.project-item{
  cursor:pointer;
  &:hover{
      // .animated; 
      // .pulse;
      
  }
}
    
.menu-1 {
    padding: 0.3em 0.5em;
    li{
      a{
        border: none;
      }
        padding: 0.5em 0.2em;
        .value{
            padding: 0.5em;
            color: #112266;
        }
    }
}


.project-item{
    .animated;
    .fadeInRight;
}

//定义
.shown-loop(@n, @i:1) when (@i <= @n) {
    .project-item:nth-child(@{i}) { 
      animation-duration: @i*600ms;
    }
    .shown-loop(@n, (@i + 1));
}

.shown-loop(10);

</style>

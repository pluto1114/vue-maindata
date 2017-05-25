<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    <div class="container page-info">
    	<div class="row">
    		<div class="col-md-3">
                <div class="panel panel-default">
                    <div class="panel-heading">项目所属盟市</div>
                    <div class="panel-body">
                        <ul class="list-group">
                        <li class="list-group-item" v-for="x of comps"><a @click="handleClickComp(x.id)">{{x.name}}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="panel panel-default">
                    <div class="panel-heading">项目列表</div>
                    <div class="panel-body">
                        <ul class="list-group">
                          <li class="list-group-item project-item" v-for="x of projects" @click="handleClickPro(x.code)">{{x.name}}（{{x.code}}）</li>
                        </ul>
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

export default {

  data () {
    return {
        menus:[],
        comps:[],
        projects:[]
    }
    
  },
  mounted(){
    this.$store.dispatch("project_comp_list").then((resp)=>{
        this.comps=resp.body.items
        this.handleClickComp(2)
    });
    
    

    

    
  },
  methods:{
  	handleClickComp(comp_id){
        this.$store.commit("setProCompId",comp_id);
        this.$store.dispatch("project_pro_list").then((resp)=>{
            this.projects=resp.body.items
        });
    },
    handleClickPro(project_code){
        this.$store.commit("setProProjectCode",project_code);
        this.$router.push("/project/one");
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
    &:hover{
        .animated; // Initiate animation library
        .bounce;
        cursor:pointer;
    }
}
    


</style>

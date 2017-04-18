<template>
  <div class="index">
    <div class="menu">
        <div class="container">
            <div style="float:right;">
                <div v-for="x of menus" class="menu-item">
                    <router-link :to="x.to">{{x.name}}</router-link>
                </div>
            </div>
        </div>
    </div>
    

    <div class="container">
        <div class="row">        	
            <div class="col-md-12">             
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>


export default {
  data () {
    return {
        comp_id:this.$route.params["comp_id"],
        menus:[],
        
       
        optionLine:{}
    }
    
  },
  mounted(){
    console.log(this.$route.params)

    this.$store.dispatch("trace_buyGoods",{comp_id:this.comp_id}).then((resp)=>{
        
    });

    
  },
  methods:{
  	handleClick(params){
        console.log(params)
    }
  },
  components:{
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>



.table{
    td:not(:first-child),th:not(:first-child){
        text-align: right;
    }
}   


</style>

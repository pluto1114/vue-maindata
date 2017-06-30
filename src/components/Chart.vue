<template>
  <div class="myecharts" :style="styleObject">
    
  </div>
</template>

<script>
// import json7 from '@/assets/7.json'
var myChart=null;
export default {
  name: 'echarts',
  props:['width','height','option','theme','loading','actionOption'],
  data () {
    return {
    	styleObject: {
		    width:this.width,
		    height:this.height
		  },
      myOption:{}
    }
  },
  computed:{
    // myTheme(){
    //   return this.theme?this.theme:'shine';
    // }
  },
  watch:{
    'option':'fresh',
    'actionOption':'doAction'
  },
  mounted(){
    // echarts.registerMap('7', json7);
  	this.fresh()
  },
  methods:{
    fresh(){
      // if (this.option==null || !_.has(this.option,'series')) {
      //   return
      // }
      Object.assign(this.myOption,this.option)
      if(this.theme){
        myChart = echarts.init(this.$el,this.theme);
      }else{
        myChart = echarts.init(this.$el);
      }
      
     // _.delay(()=>{
      myChart.setOption(this.myOption)
      if(this.loading!=undefined){
        // console.log("series",this.option.series)
        if(!this.option.series){
          myChart.showLoading();
        }else{
          myChart.hideLoading();
        }
      }
      myChart.on("click",this.handleClick)
      //},10)
      console.log("width",myChart.getWidth())
      
     
    },
    doAction(){
      if (myChart) {
        myChart.dispatchAction(this.actionOption);
      }
      
    },
    handleClick(params){
      // console.log(params)
      this.$emit('chartClick',params);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myecharts{
	
}
</style>

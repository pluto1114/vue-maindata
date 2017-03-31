<template>
  <div class="myecharts" :style="styleObject">
    
  </div>
</template>

<script>
var myChart;
export default {
  name: 'echarts',
  props:['width','height','option','theme','loading'],
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
    myTheme(){
      return this.theme?this.theme:'shine';
    }
  },
  watch:{
    'option':'fresh'
  },
  mounted(){
  	this.fresh()
  },
  methods:{
    fresh(){
      Object.assign(this.myOption,this.option)
      myChart = echarts.init(this.$el,this.myTheme);
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
      
    },
    handleClick(params){
      console.log(params)
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

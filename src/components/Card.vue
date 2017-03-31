<template>
    <div class="card hover" :class="type">
	  <div class="front"> 

	    <div class="media">        
	      <span class="pull-left">
	        <i class="fa media-object" :class="icon"></i>
	      </span>

	      <div class="media-body">
	        <small>{{title}}</small>
	        <h2 class="media-heading animate-number" data-value="3659" data-animation-duration="1500">0</h2>
	      </div>
	    </div> 

	    <div class="progress-list">
	      <div class="details">
	        <div class="title">This month plan %</div>
	      </div>
	      <div class="status pull-right bg-transparent-black-1">
	        <span class="animate-number" data-value="83" data-animation-duration="1500">0</span>%
	      </div>
	      <div class="clearfix"></div>
	      <div class="progress progress-little progress-transparent-black">
	        <div class="progress-bar animate-progress-bar" data-percentage="83%"></div>
	      </div>
	    </div>

	  </div>
	  <div class="back">
	    <a href="#">
	      <i class="fa fa-bar-chart-o fa-4x"></i>
	      <span>Check Summary</span>
	    </a>  
	  </div>
	</div>
</template>

<script>
export default {
  name: 'card',
  props:['type','title','icon'],
  data () {
    return {
    }
  },
  mounted(){
  	$('.card.hover').hover(function(){
    	$(this).addClass('flip');
  	},function(){
    	$(this).removeClass('flip');
  	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../../src/styles/vars.less";
.back{
	background-color: @blue50!important;
}
</style>

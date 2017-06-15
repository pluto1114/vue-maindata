<template>
<!-- Modal -->
<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" :class="[small?'':'modal-lg']" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
      </div>
      <div class="modal-body content">
      	<slot>
		    只有在没有要分发的内容时才会显示。
	  	</slot>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>  
</template>

<script>

export default {
  name: 'my-modal',
  props:{
  	option: {
      	type: Object,
      	default(){return {visable:false}},
      	required:true
    },
    title:{
    	type: String,
      	default: 'Title'
    },
    small:{
    	type:Boolean,
    	default:false
    }
  },
  data () {
    return {
    	
    }
  },
  watch:{
    'option':function (val, oldVal) {
    	console.log(val)
    	if (val.visable) {
    		this.show();
    	}

    },
  },
  mounted(){

  	$(this.$el).on('shown.bs.modal', function (e) {
		
	})
	$(this.$el).on('hidden.bs.modal', function (e) {
	  	
	})
  },
  methods:{
  	show(){
		$(this.$el).modal()
  	},
  	hide(){
  		$(this.$el).modal('hide')
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/animate.less';

</style>

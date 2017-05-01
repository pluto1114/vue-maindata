<template>
<div class="menu">
    <div class="container">
        <span v-if="back" @click="handleRetClick" class="myback"><i class="fa fa-arrow-left"></i> 返回</span>
        <div style="float:right;">
            <div v-for="x of items" class="menu-item">
                <router-link :to="x.to">{{x.name}}</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'my-menu',
  props:['items','back'],
  data () {
    return {
    }
  },
  methods:{
  	handleRetClick(){
  		console.log('ret')
  		this.$router.go(-1)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/animate.less';
.myback{
  .animated;
  &:hover{
    .flash;
    
  }
}
</style>

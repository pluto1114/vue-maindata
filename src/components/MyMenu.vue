<template>
<div class="menu">
    <div class="container">
        <a v-if="back" @click="handleRetClick" class="myback"><i class="fa fa-arrow-left"></i> 返回</a>
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
a{
  //.animated;
  color:white;
  
}
.menu{
  background:url(../assets/red-line.png);
  background-size:cover;
  line-height:3.5em;
  min-height:48px;
  color:white;
  margin-bottom:2em;
}
.menu-item{
    padding-left:20px;
    float:left;
}
.menu-item a{
  color:white;
}
.menu-item::before{
    padding-right:20px;
    content: "|";
}
</style>

<template>
  <div class="app">
    
   
      <router-view></router-view>
   
     
  </div>
</template>

<script>


export default {
  data () {
    return {}
  },
  mounted () {
    
    
  },
  methods: {
    
  }
}

function isDesktop () {
  return window.innerWidth > 993
}
</script>

<style lang="less">
.logo-img{

}
.logo-title{
  padding-left:30px;
  padding-top:30px;
  font-size:1.5em;
}
.menu{
  background:url(assets/red-line.png);
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
.footer{
  text-align: center;
  background:url(assets/bottom-line.png);
  background-size:cover;
  line-height:3em;
  color:white;
  margin-bottom:2em;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.box {
  display: flex;
}
.box-cell-1{
 flex:1;
}
</style>

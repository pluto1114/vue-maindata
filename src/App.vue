<template>
  <div class="app">
    <div class="container banner">
      <div class="row">
        <div class="col-md-1"><img src="./assets/logo.png" class="logo-img" /></div>
        <div class="col-md-11">
          <div class="logo-title">内蒙古联通全物资全生命周期信息管理平台</div>
        </div>
      </div>
    </div>
    <transition name="fade"  mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="footer">
      <div class="container">
      版权所有：联通系统集成内蒙古自治区分公司
      </div>
    </div>  
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

</style>

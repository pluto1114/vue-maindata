<template>
  <div class="main">
    <div class="container banner">
      <div class="row">
        <div class="col-md-1"><a href="/"><img src="../assets/logo.png" class="logo-img" /></a></div>
        <div class="col-md-11">
          <div class="logo-title">内蒙古联通全物资全生命周期信息管理平台</div>
        </div>
      </div>
    </div>
    <transition name="fade"  mode="out-in">
      <router-view class="main-content page-info"></router-view>
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
    const desktop = isDesktop()
    return {
      open: desktop,
      docked: desktop,
      desktop: desktop,
      title: ''
    }
  },
  mounted () {
    
  },
  methods: {
    
    
    toIndex(){
      this.$router.push("/");
    }
  },
  destroyed () {
    
  }
}

function isDesktop () {
  return window.innerWidth > 993
}
</script>

<style lang="less" scoped>

a{ 
  transition: all .1s;
  &:hover{
    padding-bottom:0.28em; 
    border-bottom: 2px solid;
    cursor:pointer;
  }
}


.box {
  display: flex;
}
.box-cell-1{
 flex:1;
}

.page-info{
  min-height:700px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(20px);
  opacity: 0;
}

.main-content{
  padding: 1.8em 0;
}
</style>
<template>
  <div class="app">
    <div class="container banner">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-11">内蒙古联通全物资全生命周期信息管理平台</div>
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
.footer{
  text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>

<template>
  <div class="main">
    <div class="container banner">
      <div class="row">
        <div class="col-md-1"><a href="/"><img src="../assets/logo.png" class="logo-img" /></a></div>
        <div class="col-md-8">
          <div class="logo-title">内蒙古联通全物资全生命周期信息管理平台</div>
        </div>
        <div class="col-md-3">
          <div class="welcome pull-right">欢迎您使用  {{loginname}}<span class="btn" @click="logout">[退出]</span></div>
        </div>
      </div>
    </div>
    <transition name="fade"  mode="out-in">
      <router-view class="main-content page-info" id="mainContent"></router-view>
    </transition>
    
    <div class="footer">
      <div class="container">
      版权所有：内蒙古联通
      </div>
    </div> 
  </div>
</template>

<script>


export default {
  data () {
    const desktop = isDesktop()
    return {
      loginname:''
    }
  },
  mounted () {
    this.$store.dispatch("user_info").then((resp)=>{
      this.loginname=resp.body.itemMap.loginname
    })
    this.$root.$on("bannerHidden",p=>{
      
      $(".banner").slideUp();
      
    })
  },
  methods: {
    
    
    toIndex(){
      this.$router.push("/");
    },
    logout(){
      window.localStorage.token=null
      window.location.href="/#/login"
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
  border:none;
}

.banner{
  margin-top: 1em;
  margin-bottom: 0.5em;
}
.logo-title{
  padding-left:30px;
  padding-top:30px;
  font-size:1.5em;
}
.welcome{
  padding-top:35px;

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
  
}
</style>
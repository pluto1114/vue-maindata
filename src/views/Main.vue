<template>
  <div class="main" :class="dark?'dark':'light'">
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
    <div class="menu"></div>
    <transition :name="slideName"  mode="out-in" @after-enter="afterEnter">
      <router-view class="main-content page-info" id="mainContent"></router-view>
    </transition>
    
    <transition name="slide-up"  mode="out-in">
    <div v-show="footerShow" class="footer">
      <div class="container">
      版权所有：内蒙古联通
      </div>
    </div> 
    </transition>
  </div>
</template>

<script>


export default {
  data () {
    const desktop = isDesktop()
    return {
      loginname:'',
      slideName:'slide-1',
      footerShow:true,
      dark:false
    }
  },
  mounted () {
    this.$store.dispatch("user_info").then((resp)=>{
      this.loginname=resp.body.itemMap.loginname
    })
    this.$root.$on("bannerHidden",p=>{
      $(".banner").slideUp();
    })
    this.$root.$on("returnLast",p=>{
      this.slideName='slide-2'
      setTimeout(()=>{
        this.slideName='slide-1'
      },2000)
    })

    this.$root.$on("dark",p=>{
      this.dark=true
    })
    $(window).on('popstate',()=>{
        console.log("back")
        var hashLocation = location.hash;
        if(hashLocation=='#/'){
          this.dark=false
        }
    })
  },
  methods: {
    
    
    toIndex(){
      this.$router.push("/");
    },
    logout(){
      window.localStorage.token=null
      window.location.href="/#/login"
    },
    afterEnter(){
      this.footerShow=true
    }
  },
  destroyed () {
    
  },
  beforeRouteEnter (to, from, next) {
    
    next(vm=>{
      // console.log('before')
      // let path = window.location.hash
      // path=path.substring(1);
      // console.log('routes',vm.$router.options.routes)
      // console.log('path',path)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.footerShow=false
    next()
  }
}

function isDesktop () {
  return window.innerWidth > 993
}
</script>

<style lang="less" scoped>
@import '../assets/animate.less';
a{
  border:none;
}

.banner{
  padding-top: 1em;
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
.menu{
  background:url(../assets/red-line.png);
  background-size:cover;
  line-height:3.5em;
  min-height:48px;
  color:white;

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
.fade-1-enter-active {
  .animated;
  .fadeInRight;
}
.fade-1-leave-active {
  .animated;
  .fadeOutLeft;
}
.fade-2-enter-active {
  .animated;
  .fadeInLeft;
}
.fade-2-leave-active {
  .animated;
  .fadeOutRight;
}
.slide-1-enter-active {
  .animated;
  .slideInRight;
}
.slide-1-leave-active {
  .animated;
  .slideOutLeft;
}
.slide-2-enter-active {
  .animated;
  .slideInLeft;
}
.slide-2-leave-active {
  .animated;
  .slideOutRight;
}
.slide-up-enter-active {
  .animated;
  .slideInUp;
}
.slide-up-leave-active {
  .animated;
  .slideOutDown;
}
/*
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(20px);
  opacity: 0;
}
*/
.main{
  transition: all 2s ease;
}

.dark{ 
  background: rgb(64, 74, 89);
  color:white;
}
.light{
  background-color: white;
  color:#333;
}
</style>
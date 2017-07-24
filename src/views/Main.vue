<template>
  <div class="main" :class="dark?'dark':'light'">
    <div class="container banner">
      <div class="row">
        <div class="col-md-1">
          <a href="/">
            <img src="../assets/logo.png" class="logo-img" />
          </a>
        </div>
        <div class="col-md-8">
          <div class="logo-title">内蒙古联通全物资全生命周期信息管理平台</div>
  
        </div>
        <div class="col-md-3">
          <div class="welcome pull-right">欢迎您使用 {{loginname}}
            <span class="btn" @click="logout">[退出]</span>
          </div>
        </div>
      </div>
    </div>
    <div class="menu"></div>
    <transition :name="slideName" mode="out-in" @after-enter="afterEnter">
      <router-view class="main-content page-info" id="mainContent"></router-view>
    </transition>
  
    <transition name="slide-up" mode="out-in">
      <div v-show="footerShow" class="footer">
        <div class="container">
          <div class="">版权所有：内蒙古联通</div>
          <!-- <div class="other-link">友情链接：<a href="http://10.197.1.60:8080" target="_blank">实物管理平台</a></div> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>


export default {
  data() {
    const desktop = isDesktop()
    return {
      loginname: '',
      slideName: 'slide-1',
      footerShow: true,

    }
  },
  computed: {
    dark() {
      return this.$store.state.main.dark
    }
  },
  mounted() {
    this.$store.dispatch("user_info").then((resp) => {
      this.loginname = resp.body.itemMap.loginname
    })
    this.$root.$on("bannerHidden", p => {
      $(".banner").slideUp();
    })
    this.$root.$on("returnLast", p => {
      this.slideName = 'slide-2'
      setTimeout(() => {
        this.slideName = 'slide-1'
      }, 2000)
    })


    $(window).on('popstate', () => {
      console.log("back")
      var hashLocation = location.hash;
      if (hashLocation == '#/') {
        this.$store.commit('setDark', false)
      }
    })
    // window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    // window.history.forward(1);

    this.showScreenInfo()

    $(".logo-title").animatext({ speed: 80, effect: 'flipInX', infinite: true, timeToRelaunch: 15000 })
  },
  methods: {


    toIndex() {
      this.$router.push("/");
    },
    logout() {
      window.localStorage.token = null
      window.location.href = "/#/login"
    },
    afterEnter() {
      this.footerShow = true
    },
    showScreenInfo() {
      var w = document.body.clientWidth;
      console.log(w);
      if (w > 1220) {
        toastr.success("恭喜您，已达到最佳显示效果！");
      } else {
        toastr.warning("您当前窗口的可用宽度为：" + w + "px，建议增加窗口宽度或使用更高分辨率，以使显示效果更佳");
      }
    }
  },
  destroyed() {

  },
  beforeRouteEnter(to, from, next) {

    next(vm => {
      // console.log('before')
      // let path = window.location.hash
      // path=path.substring(1);
      // console.log('routes',vm.$router.options.routes)
      // console.log('path',path)
    })
  },
  beforeRouteLeave(to, from, next) {
    // this.footerShow=false

    next()
  }
}

function isDesktop() {
  return window.innerWidth > 993
}
</script>

<style lang="less" scoped>
@import '../assets/animate.less';
a {
  border: none;
}

.banner {
  padding-top: 1em;
  margin-bottom: 0.5em;
}

.logo-title {
  padding-left: 30px;
  padding-top: 30px;
  font-size: 1.5em;
}

.welcome {
  padding-top: 35px;
}

.menu {
  background: url(../assets/red-line.png);
  background-size: cover;
  line-height: 3.5em;
  min-height: 48px;
  color: white;
}

.page-info {
  min-height: 700px;
}

.footer {
  text-align: center;
  background: url(../assets/bottom-line.png);
  background-size: cover;
  line-height: 3em;
  color: white;
  margin-top: 1.5em;
  padding-top: 0.2em;
  .other-link{
    font-size: 0.7em;
    a{
      color: white;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
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

.main {
  transition: all 2s ease;
}

.dark {
  background: #404A59;
  color: white;
  .logo-img {
    display: inline-block;
    padding: 0.2em 0.5em;
    border-radius: 0.5em;
    animation-name: bluePulse;
    animation-duration: 5s;
    animation-iteration-count: infinite;
  }
  .logo-title {
    margin-left: 1em;
  }
  .menu {
    background-image: none; // background-image: linear-gradient(to bottom,#617586 0,#404A59 100%);
    background-color: rgba(50, 50, 50, 0.3);
    box-shadow: inset 0 0 0 1px #617586, inset 0 0 40px 5px rgba(0, 0, 0, .3), 0 0 2px 1px rgba(0, 0, 0, .5);
  }
  .footer {
    background-image: none;
    background-color: rgba(50, 50, 50, 0.3);
    box-shadow: inset 0 0 0 1px #617586, inset 0 0 40px 5px rgba(0, 0, 0, .3), 0 0 2px 1px rgba(0, 0, 0, .5);
  }
}

.light {
  background-color: white;
  color: #333;
  .menu {
    background: url(../assets/red-line.png);
    background-size: cover;
  }
  .footer {
    background: url(../assets/bottom-line.png);
    background-size: cover;
  }
}

@keyframes bluePulse {
  from {
    background-color: rgba(250, 240, 230, 0.1);
    box-shadow: 0 0 9px #333;
  }
  50% {
    background-color: rgba(255, 250, 240, 0.3);
    ;
    box-shadow: 0 0 18px #4d7e8f;
  }
  to {
    background-color: rgba(250, 240, 230, 0.1);
    box-shadow: 0 0 9px #333;
  }
}
</style>
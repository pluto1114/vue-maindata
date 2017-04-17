Main.vue<template>
  <div class="main">
  
        <transition name="fade"  mode="out-in">
          <router-view class="main-content"></router-view>
        </transition>
    
    </div>
  </div>
</template>

<script>
import appSide from '@/components/AppSide'

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
    
  },
  components:{
    appSide
  }
}

function isDesktop () {
  return window.innerWidth > 993
}
</script>

<style lang="less">
@import "../../src/styles/import.less";




@media (min-width: 480px) {
  .example-content{
    padding: 10px;
  }
}

@media (max-width: 993px) {
  .example-appbar {
    left: 0;
  }
  .example-content{
    padding-left: 0;
  }
  .content-wrapper {
    padding: 24px 36px;
  }
  .app-right{
    margin-left: 0px;
  }
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
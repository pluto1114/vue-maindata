<template>
  <div class="main">
  
        <transition name="fade"  mode="out-in">
          <router-view class="main-content"></router-view>
        </transition>
    
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

<style lang="less">


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
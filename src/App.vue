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
@import 'assets/animate.less';
a{ 
  transition: all .1s;
  &:hover{
    padding-bottom:0.28em; 
    border-bottom: 2px solid;
    cursor:pointer;
  }
}

ul li{
  list-style: none;
}
.app{
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color:#fff;
    border-radius:2em;
    border:1px solid #ccc;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #F90;
    background-image: -webkit-linear-gradient(45deg,  rgba(255, 255, 255, .4) 25%,  transparent 25%,  transparent 50%,  rgba(255, 255, 255, .4) 50%,  rgba(255, 255, 255, .4) 75%,  transparent 75%,  transparent);
    border-radius:2em;
  }
}

.fade-enter-active,.fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.zoom-enter-active{
  .animated;
  .zoomIn;
}

.box {
  display: flex;
}
.box-cell-1{
 flex:1;
}

</style>

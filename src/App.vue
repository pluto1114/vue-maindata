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
ul li{
  list-style: none;
}
.footer{
  text-align: center;
  background:url(assets/bottom-line.png);
  background-size:cover;
  line-height:3em;
  color:white;
  margin-bottom:2em;
}
a{
  
  transition: all .1s;
  &:hover{
    padding-bottom:0.28em; 
    border-bottom: 2px solid;
  }
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

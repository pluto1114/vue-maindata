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
.footer{
  text-align: center;
  background:url(assets/bottom-line.png);
  background-size:cover;
  line-height:3em;
  color:white;
  margin-top: 1.5em;
  margin-bottom:2em;
}

.box {
  display: flex;
}
.box-cell-1{
 flex:1;
}

</style>

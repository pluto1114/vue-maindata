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
.app{
    
}
a{ 
  text-decoration: none;  
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
.modal{
    .table{
        td{
            min-width:4em;
            max-width:10em;
        }
    }
}
.btn-ext{
    .pad-15{
        padding: 15px 0;
    }
    .btn{
        color: #fff;
        text-transform: uppercase;
        border-radius: 0;
        padding-left: 60px;
        position: relative;
        transform: translateZ(0px);
        transition: all 0.5s ease 0s;
    }
    .btn:after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #fff;
        z-index: -1;
        transform: scaleX(0);
        transform-origin: 100% 50% 0;
        transition: all 0.5s ease-out 0s;
    }
    .btn:hover:after{
        transform: scaleX(1);
        transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
    }
    .btn span{
        width: 40px;
        height: 100%;
        line-height: 40px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        transition: all 0.3s linear 0s;
    }
    .btn span:after{
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        background: #fff;
        margin: auto 0;
        position: absolute;
        top: 0;
        right: -6px;
        bottom: 0;
        transform: rotate(45deg);
        transition: all 0.3s linear 0s;
    }
    .btn.btn-sm{
        padding-left: 40px;
    }
    .btn.btn-sm span{
        width: 27px;
        line-height: 27px;
    }
    .btn.btn-sm span:after{
        width: 8px;
        height: 8px;
        right: -5px;
    }
    .btn.btn-xs{
        padding-left: 30px;
    }
    .btn.btn-xs span{
        width: 20px;
        line-height: 20px;
    }
    .btn.btn-xs span:after{
        width: 7px;
        height: 7px;
        right: -4px;
    }
    .btn.red{
        border: 1px solid #fe6d6d;
        background: #fe6d6d;
    }
    .btn.red:hover,
    .btn.red span{
        color: #fe6d6d;
    }
    .btn.red:hover span,
    .btn.red:hover span:after{
        background: #fe6d6d;
    }
    .btn.blue{
        border: 1px solid #3bb4e5;
        background: #3bb4e5;
    }
    .btn.blue:hover,
    .btn.blue span{
        color: #3bb4e5;
    }
    .btn.blue:hover span,
    .btn.blue:hover span:after{
        background: #3bb4e5;
    }
    .btn.orange{
        border: 1px solid #ee955b;
        background: #ee955b;
    }
    .btn.orange:hover,
    .btn.orange span{
        color: #ee955b;
    }
    .btn.orange:hover span,
    .btn.orange:hover span:after{
        background: #ee955b;
    }
    .btn.green{
        border: 1px solid #34D6B6;
        background: #1ABC9C;
    }
    .btn.green:hover,
    .btn.green span{
        color: #1ABC9C;
    }
    .btn.green:hover span,
    .btn.green:hover span:after{
        background: #1ABC9C;
    }
  
    .btn:hover span{
        color: #fff;
    }
    @media only screen and (max-width: 767px){
        .btn{ margin-bottom: 20px; }
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
.zoom-leave-active{
  .animated;
  .zoomOut;
}

.box {
  display: flex;
}
.box-cell-1{
 flex:1;
}
.my-link{
    cursor:pointer;
    transition: all 0.5s ease;
    text-decoration:underline; 
    &:hover{
        opacity: 0.6;
        
    }
}


.my-item{
	opacity: 0;
    animation-name: animationStyle1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    cursor: pointer;
}
.shown-loop(@n, @i:1) when (@i <= @n) {
    .my-item:nth-child(@{i}) {    	
        animation-duration: @i*200ms;
    }
    .shown-loop(@n, (@i + 1));
}
.shown-loop(14);
@keyframes animationStyle1 {
    0% {
        opacity: 0;
        transform: rotateY(-90deg) translate3d(0, 30px, 0);
    }
    100% {
        opacity: 1;
        transform: rotate(0deg) translate3d(0, 0, 0);
    }
}
</style>

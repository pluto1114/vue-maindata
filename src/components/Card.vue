<template>
    <div class="card hover" :class="type">
	  <div class="front"> 

	    <div class="media">        
	      <span class="pull-left">
	        <i class="fa media-object" :class="icon"></i>
	      </span>

	      <div class="media-body">
	        <small>{{title}}</small>
	        <h2 class="media-heading animate-number" data-value="3659" data-animation-duration="1500">0</h2>
	      </div>
	    </div> 

	    <div class="progress-list">
	      <div class="details">
	        <div class="title">This month plan %</div>
	      </div>
	      
	      <div class="clearfix"></div>
	     
	    </div>
		
	  </div>
	  <div class="back">
	    <a href="#">
	      <i class="fa fa-bar-chart-o fa-4x"></i>
	      <span>Check Summary</span>
	    </a>  
	  </div>
	</div>
</template>

<script>
export default {
  name: 'card',
  props:['type','title','icon'],
  data () {
    return {
    }
  },
  mounted(){
  	$('.card.hover').hover(function(){
    	$(this).addClass('flip');
  	},function(){
    	$(this).removeClass('flip');
  	});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

.card-container {
    position: relative;
    min-height: 80px;
    margin-bottom: 20px;
}

.card-container .card {
    height: 100%;
    position: relative;
    -webkit-perspective: 600px;
    -moz-perspective: 600px;
    perspective: 600px;
    width: 100%;
    cursor: pointer;
}

.card-container .card .front {
    height: 100%;
    position: relative;
    width: 100%;
    background-color: #f2f2f2;
    padding: 15px;
    min-height: 115px;
    top: 0;
    left: 0;
    z-index: 900;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.05);
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.05);
    -webkit-transform: rotateX(0deg) rotateY(0deg);
    -moz-transform: rotateX(0deg) rotateY(0deg);
    -ms-transform: rotateX(0deg) rotateY(0deg);
    -o-transform: rotateX(0deg) rotateY(0deg);
    transform: rotateX(0deg) rotateY(0deg);
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
}

.card-container .card .front .media {
    margin-bottom: 10px;
}

.card-container .card .front .media .media-object {
    font-size: 48px;
    margin-top: 5px;
}

.card-container .card .front .media .media-body small {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    font-weight: 300;
}

.card-container .card .front .media .media-body h2 {
    font-family: "Roboto", "Arial", sans-serif;
    font-weight: 400;
}

.card-container .card .front .progress-list .details .title {
    font-weight: 400;
    font-size: 11px;
    line-height: normal;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
}

.card-container .card .front .progress-list .status {
    font-size: 9px;
    padding: 3px 6px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
    border-radius: 2px;
}

.card-container .card .front .progress-list .clearfix {
    height: 20px;
}

.card-container .card .front .progress-list .progress {
    margin-bottom: 0;
}

.card-container .card.flip .front {
    z-index: 900;
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.card-container .card.flip .back {
    z-index: 1000;
    -webkit-transform: rotateX(0deg) rotateY(0deg);
    -moz-transform: rotateX(0deg) rotateY(0deg);
    -ms-transform: rotateX(0deg) rotateY(0deg);
    -o-transform: rotateX(0deg) rotateY(0deg);
    transform: rotateX(0deg) rotateY(0deg);
}

.card-container .card .back {
    position: absolute;
    top: 0;
    border: 0;
    color: black;
    padding: 15px 15px 5px 15px;
    text-align: center;
    height: auto;
    width: 100%;
    min-height: 123px;
    left: 0;
    z-index: 800;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -ms-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.05);
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.05);
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-179deg);
    transform: rotateY(-179deg);
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
}

.card-container .card .back>a {
    display: block;
    color: #717171;
    font-size: 18px;
    font-weight: 300;
    line-height: 30px;
}

.card-container .card .back>a:hover {
    text-decoration: none;
    color: #418bca;
}

.card-container .card .back>a>i {
    display: block;
}

.card-container .card.card-red .front {
    color: white;
    background-color: #ff4a43;
}

.card-container .card.card-red .back p {
    color: #ff4a43;
}

.card-container .card.card-cyan .front {
    color: white;
    background-color: #22beef;
}

.card-container .card.card-cyan .back p {
    color: #22beef;
}

.card-container .card.card-green .front {
    color: white;
    background-color: #a2d200;
}

.card-container .card.card-green .back p {
    color: #a2d200;
}

.card-container .card.card-orange .front {
    color: white;
    background-color: #ffc100;
}

.card-container .card.card-orange .back p {
    color: #ffc100;
}

.card-container .card.card-amethyst .front {
    color: white;
    background-color: #cd97eb;
}

.card-container .card.card-amethyst .back p {
    color: #cd97eb;
}

.card-container .card.card-greensea .front {
    color: white;
    background-color: #16a085;
}

.card-container .card.card-greensea .back p {
    color: #16a085;
}

.card-container .card.card-drank .front {
    color: white;
    background-color: #a40778;
}

.card-container .card.card-drank .back p {
    color: #a40778;
}

.card-container .card.card-dutch .front {
    color: white;
    background-color: #1693a5;
}

.card-container .card.card-dutch .back p {
    color: #1693a5;
}

.card-container .card.card-hotpink .front {
    color: white;
    background-color: #ff0066;
}

.card-container .card.card-hotpink .back p {
    color: #ff0066;
}

.card-container .card.card-redbrown .front {
    color: white;
    background-color: #d9544f;
}

.card-container .card.card-redbrown .back p {
    color: #d9544f;
}

.card-container .card.card-slategray .front {
    color: white;
    background-color: #3f4e62;
}

.card-container .card.card-slategray .back p {
    color: #3f4e62;
}

.card-container .card.card-blue .front {
    color: white;
    background-color: #418bca;
}

.card-container .card.card-blue .back p {
    color: #418bca;
}


.card-container .card .front .progress-list .details .title {
    font-weight: 400;
    font-size: 11px;
    line-height: normal;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
}

.card-container .card .front .progress-list .status {
    font-size: 9px;
    padding: 3px 6px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
    border-radius: 2px;
}

.card-container .card .front .progress-list .clearfix {
    height: 20px;
}

.card-container .card .front .progress-list .progress {
    margin-bottom: 0;
}

.card-container .card.flip .front {
    z-index: 900;
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

</style>

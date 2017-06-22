<template>
<div>
    <MyMenu :items="menus" back=true></MyMenu>
    <div class="container">
        <div class="row">
            <div class="col-md-9">
            	<transition name="zoom"  mode="out-in">
            		<template v-if="showMap">
                	<Chart width="100%" height="550px" :option="optionMap" theme='dark' @chartClick="handleMapClick" loading></Chart>
                	</template>
            	</transition>
                <div class="row city-one" v-if="selCity">
            		<div class="col-sm-6">
				    	<ul v-if="cityStoresL1.length>0">
				    		<li class="list-group-item box" v-for="x of cityStoresL1" @click="handleClickForStoreL1(x.id)">
				    			<div class="box-cell-1">{{x.name}}</div>
				    			<div class="">￥{{x.amount|money}}</div>
				    		</li>
				    	</ul>					  
            		</div>
            		<div class="col-sm-6">
				    	<ul>
				    		<li class="list-group-item box" v-for="x of cityStoresL2" @click="handleClickForStoreL2(x.id)">
				    			<div class="box-cell-1">{{x.name}}</div>
				    			<div class="">￥{{x.amount|money}}</div>
				    		</li>
				    	</ul>
						   
            		</div>
            	</div>
            </div>
            
            <div class="col-md-3 cities" style="padding-top:1em;">
            	<ul class="list-group" v-if="cities.length>0">
            	  <li class="list-group-item" @click="handleClickForIndex()">
					<div class="title">内蒙分公司</div>
            	  </li>
				  <li class="list-group-item" v-for="x of cities" @click="handleClickForCity(x.id)">
				  	<div class="title pull-left">{{x.name}}</div>
				  	<div class="descp pull-right box">
				  		<div class="l1"><i class="fa fa-tree" title="一级库"></i>{{x.l1_num}}个</div>
				  		<div class="l2"><i class="fa fa-tags" title="二级库"></i>{{x.l2_num}}个</div>
				  	</div>
				  	<div class="clearfix"></div>
				  </li>
				</ul>  
            </div>
        </div>

        <div class="row">
        	<div class="col-md-9">
            	        	
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
	 <MyModal :option="modalOption" title="仓库物资详情" small>
	 	<div>
	 		<Chart width="550px" height="400px" :option="optionPie" theme='dark' loading></Chart>
	 	</div>
        <ul class="list-group">
            <li class="list-group-item" v-for="x of optionPie.series[0].data">
                <span class="pull-right">{{x.value|money}}</span>
                <span>{{x.name}}</span>
            </li>
        </ul>
	 </MyModal>
</div>
</template>
<script>
import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
import MyModal from '@/components/MyModal'

export default {
  name: 'storeMap',
  data(){
    return {
      menus:[],
      storesL1:[],
      storesL2:[],
      cities:[],
      selCity:null,
      selStore:null,
      optionMap:{},
      showMap:false,
      optionPie:{},
      cityStoresL1:{},
      cityStoresL2:{},
      modalOption:{}
    }
  },
  watch:{
    
  },
  mounted(){
    this.index()
    
    // this.$root.$emit("bannerHidden")
  },
  methods:{
    handleMapClick(){
      
    },
    handleClickForIndex(){
    	this.index()
    },
    handleClickForCity(id){
    	this.selCity=_.find(this.cities,{id})
    	this.showMap=false
    	this.cityStoresL1=[]
    	this.cityStoresL2=[]
    	this.cityStoresL1=_.where(this.storesL1,{comp_id:id})
    	this.cityStoresL2=_.where(this.storesL2,{comp_id:id})
    	
    	console.log(id,_.where(this.storesL1,{comp_id:id}))
    	let linesData=[]
    	this.cityStoresL2.forEach(item=>{
    		linesData.push({coords:[
    				[this.cityStoresL1[0].lng,this.cityStoresL1[0].lat],
    				[item.lng,item.lat]
    			]
    		})
    	})

    	var color = ['#a6c84c', '#ffa022', '#46bee9']
    	this.optionMap = {
        	backgroundColor: '#404a59',
            title: {
                text: this.selCity.name+'仓库分布情况',
                subtext: '累计金额 一级库￥'+money(_.sum(this.cityStoresL1,'amount'))+'，'+'二级库￥'+money(_.sum(this.cityStoresL2,'amount')),
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params, ticket, callback) {
                    return this.toHTMLForCity(params);
                }.bind(this)
            },
            geo: {
		        map: id,
		        label:{
			        emphasis:{
			        	textStyle:{
			        		color:'#ccc',
			        	}
			        },
		        },
                itemStyle: {
		            normal: {         	
		                areaColor: '#323c48',
		                borderColor: '#111'
		            },
		            emphasis: {
		                areaColor: '#2a333d'
		            }
		        },
		    },
            series: [
            	{
		            name: '二级库',
		            type: 'scatter',
		            coordinateSystem: 'geo',
		            data: this.cityStoresL2,
		            symbolSize: function (val) {
		                return val[2]/(3000+val[2]*0.08);
		            },
		            
		            itemStyle: {
		                normal: {
		                    color: '#ddb926'
		                }
		            }
		        },
                {
		            name: '一级库',
		            type: 'effectScatter',
		            coordinateSystem: 'geo',
		            data: this.cityStoresL1,
		            symbolSize: function (val) {
		                return val[2]/(50000+val[2]*0.08);
		            },
		            showEffectOn: 'render',
		            rippleEffect: {
		                brushType: 'stroke'
		            },
		            hoverAnimation: true,
		            label: {
		                normal: {
		                    formatter: '{b}',
		                    position: 'right',
		                    show: false
		                },
		                emphasis: {
		                    show: true
		                }
		            },
		            itemStyle: {
		                normal: {
		                    color: '#f4e925',
		                    shadowBlur: 10,
		                    shadowColor: '#333'
		                }
		            },
		            zlevel: 1
		        },
                {
		            name: '线路',
		            type: 'lines',
		            // symbol: ['none', 'arrow'],
			        zlevel: 1,
			        effect: {
			            show: true,
			            period: 3,
			            // trailLength: 0.7,
			            color: color[2],
			            symbolSize: 3
			        },
			        lineStyle: {
			            normal: {
			                color: color[0],
			                width: 1,
                			opacity: 0.6,
                			curveness: 0.2
			            }
			        },
			        data:linesData
		        }
            ]
        };

        this.$nextTick(()=>{
	        this.showMap=true
	    })
    },
    handleClickForStoreL1(id){
    	this.selStore=_.find(this.cityStoresL1,{id})
    	if (this.selStore.amount==0) {
    		bootbox.alert(this.selStore.name+'目前没有库存物资')
    	}else{
    		this.modalOption={visable:true}
    		this.storeInfo(id,1)
    	}
    },
    handleClickForStoreL2(id){
    	this.selStore=_.find(this.cityStoresL2,{id})
    	if (this.selStore.amount==0) {
    		bootbox.alert(this.selStore.name+'目前无法计算库存物资价值')
    	}else{
    		this.modalOption={visable:true}
    		this.storeInfo(id,2)
    	}
    },
    index(){
    	this.selCity=null
    	this.$store.dispatch("store_map_index").then((resp)=>{
    		this.$store.commit('setMapIndexInfo',resp)
	    	let storesL1=resp.body.itemMap.storesL1
	    	let storesL2=resp.body.itemMap.storesL2
	    	let cities=resp.body.itemMap.cities
	    	_.map(storesL1,item=>{
	    		item.value=[item.lng,item.lat,item.amount]
	    	})
	    	_.map(storesL2,item=>{
	    		item.value=[item.lng,item.lat,item.amount]
	    	})
	    	_.map(cities,item=>{
	    		item.l1_num=_.where(storesL1,{comp_id:item.id}).length
	    		item.l2_num=_.where(storesL2,{comp_id:item.id}).length
	    	})
	    	this.storesL1=storesL1;
	      	this.storesL2=storesL2;
	      	
	      	this.cities=cities

	        this.optionMap = {
	        	backgroundColor: 'transparent',
	            title: {
	                text: '全区物资分布情况',
	                //subtext: '纯属虚构',
	                left: 'center'
	            },
	            tooltip: {
	                trigger: 'item',
	                formatter: function (params, ticket, callback) {
	                    return this.toHTML(params);
	                }.bind(this)
	            },
	            geo: {
			        map: '内蒙古',
	                zoom:1.26,
	                label: {
		            	emphasis: {
			                show: false
			            }
			        },
			        roam: true,
	                itemStyle: {
			            normal: {
			            	color:'#999',
			                areaColor: '#323c48',
			                borderColor: '#111'
			            },
			            emphasis: {
			                areaColor: '#2a333d'
			            }
			        },
			    },
	            series: [
	            	{
			            name: 'l2',
			            type: 'scatter',
			            coordinateSystem: 'geo',
			            data: storesL2,
			            symbolSize: function (val) {
			                return val[2]/(20000+val[2]*0.08);
			            },
			            label: {
			                normal: {
			                    formatter: '{b}',
			                    position: 'right',
			                    show: false
			                },
			                emphasis: {
			                    show: true
			                }
			            },
			            itemStyle: {
			                normal: {
			                    color: '#ddb926'
			                }
			            }
			        },
	                {
			            name: 'l1',
			            type: 'effectScatter',
			            coordinateSystem: 'geo',
			            data: storesL1,
			            symbolSize: function (val) {
			                return val[2]/(80000+val[2]*0.088);
			            },
			            showEffectOn: 'render',
			            rippleEffect: {
			                brushType: 'stroke'
			            },
			            hoverAnimation: true,
			            
			            itemStyle: {
			                normal: {
			                    color: '#f4e925',
			                    shadowBlur: 10,
			                    shadowColor: '#333'
			                }
			            },
			            zlevel: 1
			        },
	                
	            ]
	        };

	        this.$nextTick(()=>{
	        	this.showMap=true
	        })
	    })
    },
    storeInfo(id,level){
    	this.$store.dispatch("store_map_goodstype",{id,level}).then((resp)=>{
	    	this.optionPie={
	            title: { 
	                text: '全区物资类型分布(万元)',
	                left:'right'
	            },
	            tooltip: {
	                trigger: 'item',
	                formatter: "{a} <br/>{b}: {c} ({d}%)"
	            },
	            itemStyle: {
	                normal: {
	                    shadowBlur: 30,
	                    shadowColor: 'rgba(0, 0, 0, 0.4)'
	                }
	            },
	            series : [
	                {
	                    name: '物资类型',
	                    type: 'pie',
	                    radius: ['20%','55%'],
	                    data:resp.body.items
	                }
	            ]
	        } 
        })      
    },
    toHTMLForCity(params){
    	if(params.seriesType=='lines'){
    		return ''
    	}
    	return `${params.name}<br>
				位置：[${params.value[0]},${params.value[1]}]<br>`
				+'库存：'+money(params.value[2])
    	
    },
    toHTML(params){
    	return `${params.name}<br>
				位置：[${params.data.lng},${params.data.lat}]<br>`
				+'库存：'+money(params.data.amount)
    }
  },
  components:{
    Chart,MyMenu,MyModal
  }
}
</script>

<style lang="less" scoped>

.container{min-height:775px;}
.panel-default{
	background-color: transparent;
	border-color: #999;
	.panel-heading{
		background-color: transparent;
		color: white;
		border-color: #999;
	}
}
.list-group-item{
	background-color: rgba(0, 0, 0, 0.2);
}

.cities{
	ul{
		.list-group-item{
			padding-left: 2em;
			margin-top: 0.5em;
			border: none;
			line-height: 2em;
			
			box-shadow:inset 0 0 0 1px #617586,inset 0 0 40px 5px rgba(0,0,0,.3),0 0 2px 1px rgba(0,0,0,.5);
		
			.title{
								
			}
			.descp{
				//font-size: 0.9em;
				color: darken(#eee, 10%);
				i{
					padding-right: 0.5em;
				}
				.l1,.l2{
					width:4em;
				}
			}
		}
	}

	

    .shown-loop(13);
}
.list-group-item{
	opacity: 0;
    animation-name: animationStyle1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    cursor: pointer;
}
.shown-loop(@n, @i:1) when (@i <= @n) {
    .list-group-item:nth-child(@{i}) {    	
        animation-duration: @i*200ms;
    }
    .shown-loop(@n, (@i + 1));
}
.city-one{
	> h4{
		margin-bottom: 1.5em;
	}
	ul{
		li{
			border-color: #777;
		}
	}
	.shown-loop(13);
}
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

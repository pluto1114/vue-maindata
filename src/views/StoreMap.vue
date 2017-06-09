<template>
<div>
  <MyMenu :items="menus" back=true></MyMenu>
  <div class="container">
      <div class="row">
        <mu-radio label="一级库" name="group" nativeValue="L1" v-model="value" class="demo-radio"/> 
        <mu-radio label="二级库" name="group" nativeValue="L2" v-model="value"  class="demo-radio"/> 
      </div>
  </div>
  <br />
  <br />
  <div class="container">
      <div class="row">
        <div id="container" class="col-md-12"></div> 
      </div>
  </div>
</div>
</template>
<script>
import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'
export default {
  name: 'storeMap',
  data(){
    return {
      menus:[],
      map:{},
      storesL1:[],
      storesL2:[],
      value:"L1"
    }
  },
  watch:{
    value(val, oldVal){
      switch(val){
        case "L1":
        this.showMarkers(this.storesL1)
        break;
        case "L2":
        this.showMarkers(this.storesL2)
        break;
      }
    }
  },
  mounted(){
    this.map = new BMap.Map("container");          // 创建地图实例  
    var point = new BMap.Point(111.689483,40.815138);  // 创建点坐标  
    this.map.centerAndZoom(point, 7);                 // 初始化地图，设置中心点坐标和地图级别  
    this.map.enableScrollWheelZoom();
    // window.setTimeout(function(){  
    //     map.panTo(new BMap.Point(116.409, 39.918));    
    // }, 2000);

    this.$store.dispatch('store_map_index').then(resp=>{
      this.storesL1=resp.body.itemMap.storesL1;
      this.storesL2=resp.body.itemMap.storesL2;
      
      this.showMarkers(this.storesL1)
    });
  },
  methods:{
    showMarkers(stores){
      this.map.clearOverlays(); 
      for (var i = stores.length - 1; i >= 0; i--) {
        var point = new BMap.Point(stores[i].lng, stores[i].lat);
 
        var marker = new BMap.Marker(point);  // 创建标注
        this.map.addOverlay(marker);               // 将标注添加到地图中
        marker.setTitle(stores[i].name);
        marker.addEventListener("click",(e)=>{
          console.log(e.point.lng,e.point.lat)
        })
        // var label = new BMap.Label(this.storesL1[i].name,{offset:new BMap.Size(20,-10)});
        // marker.setLabel(label);
        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
      }
    }
  },
  components:{
    Chart,MyMenu
  }
}
</script>

<style scoped>
#container{height:650px;}
.mu-radio{
    min-width:180px;

    .mu-radio-label{
        font-size: 12px;
    }
}

</style>

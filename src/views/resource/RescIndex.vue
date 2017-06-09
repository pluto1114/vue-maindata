<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
    	
    	
        <div class="row"> 
            <div class="col-md-4">
                <div class="p3">
                    <h4>路由导航</h4>             
                    <Chart width="100%" height="300px" :option="optionPieZX" theme="macarons" loading></Chart>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel-group" id="accordion" role="tablist">
                                <div v-for="(x,index) of pieDataZX" class="panel panel-default">
                                    <div class="panel-heading" role="tab">
                                        <h4 class="panel-title box">
                                            <a class="collapsed box-cell-1" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#'+x.code">
                                                {{x.name}}
                                            </a>
                                            <span class="value">{{x.value}}</span>
                                        </h4>
                                    </div>
                                    <div :id="x.code" class="panel-collapse collapse" role="tabpanel">
                                        
                                        <ul class="menu-1">
                                            <li v-for="y of x.list1">
                                            <h3 class="box"><span class="box-cell-1">{{y.name}}</span><span class="value">{{y.value}}</span></h3>
                                                <ul>
                                            
                                                    <li v-for="z of y.list1">
                                                        <div class="box">
                                                            <a class="box-cell-1" @click="handleTrClick(x.code,y.code,z.code,'ZX')">{{z.name}}</a><span class="value">{{z.value}}</span>
                                                        </div>
                                                    </li>
                                                   
                                                </ul>
                                            </li>
                                           
                                        </ul>
                                       
                                    </div>
                                </div>
                  
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>     	
            <div class="col-md-4">
                <div class="p3">
                    <h4>电子运维资源</h4>             
                    <Chart width="100%" height="300px" :option="optionPieXDL" theme="macarons" loading></Chart>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                <div v-for="(x,index) of pieDataXDL" class="panel panel-default">
                                    <div class="panel-heading" role="tab">
                                        <h4 class="panel-title box">
                                            <a class="collapsed box-cell-1" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#'+x.code">
                                                {{x.name}}
                                            </a>
                                            <span class="value">{{x.value}}</span>
                                        </h4>
                                    </div>
                                    <div :id="x.code" class="panel-collapse collapse" role="tabpanel">
                                        
                                        <ul class="menu-1">
                                            <li v-for="y of x.list1">
                                            <h3 class="box"><span class="box-cell-1">{{y.name}}</span><span class="value">{{y.value}}</span></h3>
                                                <ul>
                                            
                                                    <li v-for="z of y.list1">
                                                        <div class="box">
                                                            <a class="box-cell-1" @click="handleTrClick(x.code,y.code,z.code,'XDL')">{{z.name}}</a><span class="value">{{z.value}}</span>
                                                        </div>
                                                    </li>
                                                   
                                                </ul>
                                            </li>
                                           
                                        </ul>
                                       
                                    </div>
                                </div>
                  
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="p3">
                    <h4>号线资源</h4>             
                    <Chart width="100%" height="300px" :option="optionPieDT" theme="macarons" loading></Chart>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                <div v-for="(x,index) of pieDataDT" class="panel panel-default">
                                    <div class="panel-heading" role="tab">
                                        <h4 class="panel-title box">
                                            <a class="collapsed box-cell-1" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#'+x.code">
                                                {{x.name}}
                                            </a>
                                            <span class="value">{{x.value}}</span>
                                        </h4>
                                    </div>
                                    <div :id="x.code" class="panel-collapse collapse" role="tabpanel">
                                        
                                        <ul class="dt-ul">
                                            <li v-for="y of x.list1">
                                            <a class="box" @click="handleTrClick(x.code,y.code,'0','DT')"><span class="box-cell-1">{{y.name}}</span><span class="value">{{y.value}}</span></a>
                                                
                                            </li>
                                           
                                        </ul>
                                       
                                    </div>
                                </div>             
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">资源详情</h4>
          </div>
          <div class="modal-body content">
            <div style="height:630px;overflow-y:scroll;">
                      
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width:8em;">地域</th>
                            <th style="width:6em;">资源状态</th>
                            <th style="width:6em;">资源类型</th>
                            <th style="width:10em;">所属项目</th>
                            <th>供应商</th>
                            <th>包机人</th>
                            <th>包机人电话</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="x of dtlItems">
                            <td>{{x.address_info}}</td>
                            <td>{{x.dev_state}}</td>
                            <td>{{x.dev_little_type}}</td>
                            <td>{{x.project_name}}</td>
                            <td>{{x.vendor}}</td>
                            <td>{{x.w_name}}</td>                         
                            <td>{{x.w_phone}}</td>                         
                        </tr>
                    </tbody>
                </table>
           
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
    
    
  </div>
</template>

<script>

import MyMenu from '@/components/MyMenu'
import Chart from '@/components/Chart'

export default {

  data () {
    return {
        menus:[],
        optionPieXDL:{},
        optionSubPieXDL:{},
        pieDataXDL:[],
        subPieDataXDL:[],
        statusNameXDL:"",
        optionPieDT:{},
        optionSubPieDT:{},
        pieDataDT:[],
        subPieDataDT:[],
        statusNameDT:"",
        optionPieZX:{},
        optionSubPieZX:{},
        pieDataZX:[],
        subPieDataZX:[],
        statusNameZX:"",
        dtlItems:[]
    }   
  },
  watch:{
  	'pieDataXDL':'drawPieXDL',
  	'pieDataDT':'drawPieDT',
  	'pieDataZX':'drawPieZX',

  },
  mounted(){

  	
  	
    this.$store.dispatch("resource_status_pro",{source:"XDL"}).then((resp)=>{
    	var items=resp.data
    	for (var i = items.length - 1; i >= 0; i--) {
    	    items[i].selected=false;
    	}    
        this.pieDataXDL=items;        

        setTimeout(()=>{
        	$('.menu-1').lazeemenu();
        },1000)    
    });

    this.$store.dispatch("resource_status_pro",{source:"DT"}).then((resp)=>{
    	var items=resp.data
    	for (var i = items.length - 1; i >= 0; i--) {
    	    items[i].selected=false;
    	}    
        this.pieDataDT=items;        

          
    });
    this.$store.dispatch("resource_status_pro",{source:"ZX"}).then((resp)=>{
    	var items=resp.data
    	items.forEach((item,i)=>{
            if(item.name==""){
                items.splice(i,1)
            }
        }) 
        this.pieDataZX=items;        

        setTimeout(()=>{
            $('.menu-1').lazeemenu();
        },1000)    
    });

    
  },
  methods:{
  	handleTrClick(code1,code2,code3,source){
        $('#myModal').modal()
        this.$store.dispatch("resource_status_pro_detail",{code1:code1,code2:code2,code3:code3,source:source}).then((resp)=>{ 
            this.dtlItems=resp.data; 
        });
    },
    drawPieXDL(){    	
        this.optionPieXDL={
            title: { 
                // text: '全区物资类型分布',
                left:'right'
            },
            tooltip:{},
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
                    radius: '55%',
                    data:this.pieDataXDL
                }
            ]
        }         
    },
    
    drawPieDT(){    	
        this.optionPieDT={
            title: { 
                // text: '全区物资类型分布',
                left:'right'
            },
            tooltip:{},
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
                    radius: '55%',
                    data:this.pieDataDT
                }
            ]
        }         
    },
    
    drawPieZX(){    	
        this.optionPieZX={
            title: { 
                // text: '全区物资类型分布',
                left:'right'
            },
            tooltip:{},
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
                    radius: '55%',
                    data:this.pieDataZX
                }
            ]
        }         
    }

  },
  components:{
  	Chart,MyMenu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

.banner{
    border-bottom: 0.2em solid #CC0226;   
    line-height:2.8em;
}
.title{
    background:url(../../assets/hong.png) no-repeat;
    // background-size: cover;
    color:white;
}
.title,.total{
    font-size: 1.2em;
}
.content{
    padding: 2em;
    border: 1px solid #ddd;
    margin-top: 1em;
    margin-bottom: 2em;
}

    
a:hover,a:focus{
    text-decoration: none;
    outline: none;
}
#accordion {
    .panel{
        border: none;
        border-top: 1px solid #e8e8e8;
        box-shadow: none;
        border-radius: 0;
        margin: 0;
        &:last-child{
            border-bottom: 1px solid #e8e8e8;
        }
    }
    .panel-heading{
        padding: 0 1em;
    }
    .panel-title{
        a{
            display: block;
            font-size: 16px;
            font-weight: bold;
            line-height: 24px;
            background: #fff;
            padding: 15px 20px 15px 47px;
            position: relative;
            transition: all 0.5s ease 0s;
        }
        .value{
            padding-top: 1.5em;
        }
    }
    .panel-title{

        a:before{
            content: "\f068";
            font-family: 'FontAwesome';
            display: block;
            width: 30px;
            height: 30px;
            line-height: 32px;
            border-radius: 50%;
            background: #888bc2;
            font-size: 14px;
            color: #fff;
            text-align: center;
            position: absolute;
            top: 25%;
            left: 0;
            transition: all 0.3s ease 0s;
        }
        a.collapsed:before{
            content: "\f067";
        }
    }

    .panel-body{
        font-size: 15px;
        color: #635858;
        line-height: 25px;
        border: none;
        padding: 14px 20px 14px 47px;
    } 
}





   

.p3{
    border: 1px solid #d5d5d5;
    border-radius: 1em;
    > h4{
        padding: 0.3em 1em 0.8em;
        border-bottom: 1px solid #dfdfdf;
    }
}
.menu-1 {
    padding: 0.3em 0.5em;
    li{
        padding: 0.5em 0.2em;
        .value{
            padding: 0.5em;
            color: #112266;
        }
    }
}
.dt-ul{
    li{
        padding:0.8em 1.5em;
    } 
}
a{
    color: #327fc7;
}
</style>

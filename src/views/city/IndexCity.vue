<template>
  <div class="index">
    <MyMenu :items="menus" back=true></MyMenu>
    
    <div class="container">
        <div class="row">
        	<div class="col-md-12" style="padding:0;">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#storegoods1" role="tab" data-toggle="tab">物资平台库存</a></li>
                    <li role="presentation"><a href="#storegoods2" role="tab" data-toggle="tab">商城库存分析</a></li> 
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="storegoods1">
                        <div class="content">             
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style="width:12em;">地域</th>
                                        <th>0-90天</th>
                                        <th>91-180天</th>
                                        <th>180天以上</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="city" @click='$router.push({name:"StoreCityIndex",params:{comp_id:city.id}})'>
                                        <td>{{city.name}}</td>
                                        <td>{{city.storegoods.lt90}}</td>
                                        <td>{{city.storegoods.lt180}}</td>
                                        <td>{{city.storegoods.gt180}}</td>
                                    </tr>
                                    <tr v-if="counties" v-for="x of counties">
                                        <td>{{x.name}}</td>
                                        <td>{{x.storegoods.lt90}}</td>
                                        <td>{{x.storegoods.lt180}}</td>
                                        <td>{{x.storegoods.gt180}}</td>
                                       
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="storegoods2">
                        <div class="content">             
                           商城数据 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
        	<div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-4">在建项目分析</div>
                    <div class="total col-sm-offset-6 col-sm-2">
                            
                    </div>
                </div>
            </div>
        	
            <div class="col-md-12 content">            
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width:12em;">地域</th>
                            <th>库存量</th>
                            <th>使用量</th>
                            <th>损坏量</th>
                            <th>维修量</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="city">
                            <td>{{city.name}}</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                          
                        </tr>
                        
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12" style="padding:0;">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#modem1" role="tab" data-toggle="tab">光猫</a></li>
                    <li role="presentation"><a href="#modem2" role="tab" data-toggle="tab">机顶盒</a></li> 
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="modem1">
                        <div class="content">             
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style="width:12em;">地域</th>
                                        <th>物资平台</th>
                                        <th>商城</th>
                                       
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="city">
                                        <td>{{city.name}}</td>
                                        <td>{{city.storegoods.lt90}}</td>
                                        <td>{{city.storegoods.lt180}}</td>
                                      
                                    </tr>
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="modem2">
                        <div class="content">             
                           商城数据 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-4">运维物资使用情况</div>
                    <div class="total col-sm-offset-6 col-sm-2">
                            
                    </div>
                </div>
            </div>
            
            <div class="col-md-12 content">            
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width:12em;">地域</th>
                            <th>物资平台</th>
                            <th>商城</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="city">
                            <td>{{city.name}}</td>
                            <td>0</td>
                            <td>0</td>
                          
                        </tr>
                        
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12 banner">
                <div class="row">
                    <div class="title col-sm-4">营销物资使用情况</div>
                    <div class="total col-sm-offset-6 col-sm-2">
                            
                    </div>
                </div>
            </div>
            
            <div class="col-md-12 content">            
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width:12em;">地域</th>
                            <th>物资平台</th>
                            <th>商城</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="city">
                            <td>{{city.name}}</td>
                            <td>0</td>
                            <td>0</td>
                          
                        </tr>
                        
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12" style="padding:0;">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#resource1" role="tab" data-toggle="tab">路由导航</a></li>
                    <li role="presentation"><a href="#resource2" role="tab" data-toggle="tab">电子运维资源</a></li> 
                    <li role="presentation"><a href="#resource3" role="tab" data-toggle="tab">号线资源</a></li> 
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="resource1">
                        <div class="content">             
                            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                <div v-for="(x,index) of resource1" class="panel panel-default">
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
                    <div role="tabpanel" class="tab-pane" id="resource2">
                        <div class="content">             
                           <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                <div v-for="(x,index) of resource2" class="panel panel-default">
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
                    <div role="tabpanel" class="tab-pane" id="resource3">
                        <div class="content">             
                           <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                <div v-for="(x,index) of resource3" class="panel panel-default">
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
                                            <a class="box"><span class="box-cell-1">{{y.name}}</span><span class="value">{{y.value}}</span></a>
                                                
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
  </div>
</template>

<script>

import Chart from '@/components/Chart'
import MyMenu from '@/components/MyMenu'

export default {

  data () {
    return {
        comp_id:this.$route.params["comp_id"],
        menus:[],
        counties:null,
        city:null,
        resource1:[],
        resource2:[],
        resource3:[],
    }    
  },
  watch:{
   
  },
  mounted(){
    this.menus=[{name:"终端设备分析",to:`/third/${this.comp_id}`},{name:"线上资源分析",to:"/third"},{name:"采购物资跟踪",to:`/trace/month/${this.comp_id}`}];
    console.log("comp_id:"+this.$route.params["comp_id"])
    this.$store.dispatch("city_index",{comp_id:this.comp_id}).then((resp)=>{
        this.counties=resp.body.itemMap.counties;    
        this.city=resp.body.itemMap.city;    
    });
    this.$store.dispatch("city_index_resource",{source:'ZX',comp_id:this.comp_id}).then((resp)=>{
         this.resource1=resp.data;
         setTimeout(()=>{
            $('.menu-1').lazeemenu();
        },1000) 
    });
    this.$store.dispatch("city_index_resource",{source:'XDL',comp_id:this.comp_id}).then((resp)=>{
         this.resource2=resp.data;
         setTimeout(()=>{
            $('.menu-1').lazeemenu();
        },1000) 
    });
    this.$store.dispatch("city_index_resource",{source:'DT',comp_id:this.comp_id}).then((resp)=>{
         this.resource3=resp.data;
    });


  },
  methods:{
  	
    
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
    margin-bottom: 2em;
}

.table{

    td:not(:first-child),th:not(:first-child){
        text-align: right; 
    }
    td{
         padding: 0.8em 0.4em;
    }
}   

[role=tab]{
    font-size: 1.2em;
}

.nav-tabs > li.active > a{
     background-color: #CC0226;
     color: white;
}

#accordion {
    a:hover,a:focus{
        text-decoration: none;
        outline: none;
        border-bottom: none;
    }
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
    .dt-ul{
        li{
            padding:0.8em 1.5em;
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
}

</style>

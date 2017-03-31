
import Vue from 'vue'
import VueResource from 'vue-resource'
var querystring = require('querystring');

Vue.use(VueResource)


var debug=true;
var showStr=false;

export function api(url,options) {
    var p={};
    if(!url) url='/api'
    var defaultOptions ={
        'type':'get',
        'params':{}
    };
    
    var opt = Object.assign(defaultOptions, options);
    // console.log("opt",opt)
    if(opt.type==="get"){
    	p=Vue.http.get(url+"?"+querystring.stringify(opt.params));
	}else if(opt.type==="post"){
		p=Vue.http.post(url,opt.params);
	}
    p.then(resp=>{
    	if(debug){
    		console.log(`resp.data from ${url}`,resp.body);
    	}
    	if(showStr){
    		console.log(JSON.stringify(resp));
    	}
    },resp=>{
      console.log("request error");
    });
    return p;
}

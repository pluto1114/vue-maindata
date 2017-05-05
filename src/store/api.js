
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
    // window.location.href="http://www.baidu.com"
    var opt = Object.assign(defaultOptions, options);
    // console.log("opt",opt)

    if(url.indexOf('http')==-1){
        if(window.localStorage.token){
            Vue.http.headers.common['auth'] = window.localStorage.token;
        }
    }
    if(opt.type==="get"){
        if (options && options.params){
    	    p=Vue.http.get(url+"?"+querystring.stringify(opt.params));
        }else{
            p=Vue.http.get(url);
        }
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
        if (resp.status=='401') {
            window.location.href="/#/login"
        }
      console.log("request error");
    });
    return p;
}

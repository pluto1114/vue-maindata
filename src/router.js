import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/404.vue'

import Index from '@/views/Index.vue'
import StoreGoods from '@/views/dash/onstore/StoreGoods.vue'
import BuyGoods from '@/views/dash/onstore/BuyGoods.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/login',
        component: Login
    },{
        path: '/',
        component: Main,
        description: '首页',
        auth: true,
        children: [
	      	{
	        	path: '',
	        	component: Index,
	        	name: 'Index',
                description: '首页'
	      	}
	    ]
    },{
        path: '/onstore',
        component: Main,
        auth: true,
        children: [
            {
                path: 'storeGoods',
                component: StoreGoods,
                name: 'storeGoods',
                description: '当前库存统计'
            },
            {
                path: 'buyGoods',
                component: BuyGoods,
                name: 'buyGoods',
                description: '采购物资统计'
            }
        ]
    },
    { path: '*', redirect: '/' }
  ]
})

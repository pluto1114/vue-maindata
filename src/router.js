import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/404.vue'

import Index from '@/views/Index.vue'
import Second from '@/views/Second.vue'
import Third from '@/views/Third.vue'

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
            },{
                path: 'second',
                component: Second,
                name: 'Second',
                description: '二级'
            },{
                path: 'third',
                component: Third,
                name: 'Third',
                description: '三级'
            }
        ]
    },
    { path: '*', redirect: '/' }
  ]
})
import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/404.vue'

import Index from '@/views/Index.vue'
import Second from '@/views/Second.vue'
import Third from '@/views/Third.vue'

import TraceMonth from '@/views/trace/TraceMonth.vue'
import TraceTimeLine from '@/views/trace/TraceTimeLine.vue'

import RescIndex from '@/views/resource/RescIndex.vue'

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
                path: 'second/:comp_id',
                component: Second,
                name: 'Second',
                description: '二级'
            },{
                path: 'third/:comp_id',
                component: Third,
                name: 'Third',
                description: '三级'
            }
        ]
    },{
        path: '/trace',
        component: Main,
        description: '跟踪',
        auth: true,
        children: [
            {
                path: 'month/:comp_id',
                component: TraceMonth,
                name: 'TraceMonth',
                description: '跟踪月份'
            },{
                path: 'traceTimeLine/:buygoods_id',
                component: TraceTimeLine,
                name: 'TraceTimeLine',
                description: '二级'
            }
        ]
    },{
        path: '/resource',
        component: Main,
        description: '资源',
        auth: true,
        children: [
            {
                path: '',
                component: RescIndex,
                name: 'RescIndex',
                description: '资源'
            }
        ]
    },
    { path: '*', redirect: '/' }
  ]
})
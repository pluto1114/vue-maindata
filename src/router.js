import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/404.vue'

import Index from '@/views/Index.vue'
import IndexCity from '@/views/city/IndexCity.vue'
import Third from '@/views/Third.vue'

import TraceMonth from '@/views/trace/TraceMonth.vue'
import TraceTimeLine from '@/views/trace/TraceTimeLine.vue'

import StoreIndex from '@/views/store/StoreIndex.vue'
import StoreCityIndex from '@/views/store/StoreCityIndex.vue'

import RescIndex from '@/views/resource/RescIndex.vue'
import TerminalIndex from '@/views/resource/TerminalIndex.vue'

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
                path: 'city/:comp_id',
                component: IndexCity,
                name: 'IndexCity',
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
        path: '/store',
        component: Main,
        description: '库存',
        auth: true,
        children: [
            {
                path: '',
                component: StoreIndex,
                name: 'StoreIndex',
                description: '库存'
            },{
                path: 'city/:comp_id',
                component: StoreCityIndex,
                name: 'StoreCityIndex',
                description: '库存'
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
            },{
                path: 'terminalIndex',
                component: TerminalIndex,
                name: 'TerminalIndex',
                description: '资源'
            }
        ]
    },
    { path: '*', redirect: '/' }
  ]
})
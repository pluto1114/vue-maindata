import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/404.vue'

import Index from '@/views/Index.vue'
import IndexCity from '@/views/city/IndexCity.vue'
import Third from '@/views/Third.vue'
import StoreMap from '@/views/StoreMap.vue'

import TraceMonth from '@/views/trace/TraceMonth.vue'
import TraceTimeLine from '@/views/trace/TraceTimeLine.vue'

import StoreIndex from '@/views/store/StoreIndex.vue'
import StoreCityIndex from '@/views/store/StoreCityIndex.vue'
import StoreCountyIndex from '@/views/store/StoreCountyIndex.vue'

import ProjectIndex from '@/views/project/ProjectIndex.vue'
import ProjectOne from '@/views/project/ProjectOne.vue'
import ProjectAsset from '@/views/project/asset/ProjectAsset.vue'

import RescIndex from '@/views/resource/RescIndex.vue'
import TerminalIndex from '@/views/resource/TerminalIndex.vue'

import OPIndex from '@/views/operation/OPIndex.vue'

import ShopIndex from '@/views/shop/ShopIndex.vue'
import ShopCityIndex from '@/views/shop/ShopCityIndex.vue'

import MapIndex from '@/views/dataMap/MapIndex.vue'

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
            },{
                path: 'county/:dept_code',
                component: StoreCountyIndex,
                name: 'StoreCountyIndex',
                description: '库存'
            }

        ]
    },{
        path: '/project',
        component: Main,
        description: '项目',
        auth: true,
        children: [
            {
                path: '',
                component: ProjectIndex,
                name: 'ProjectIndex',
                description: '项目'
            },{
                path: 'one',
                component: ProjectOne,
                name: 'ProjectOne',
                description: '项目',
                children:[
                    {
                        path: 'asset',
                        component: ProjectAsset,
                        name: 'ProjectAsset',
                        description: '项目'
                    }
                ]
            },

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
    },{
        path: '/operation',
        component: Main,
        description: '运维',
        auth: true,
        children: [
            {
                path: '',
                component: OPIndex,
                name: 'OPIndex',
                description: '运维'
            }
        ]
    },{
        path: '/shop',
        component: Main,
        description: '商城',
        auth: true,
        children: [
            {
                path: '',
                component: ShopIndex,
                name: 'ShopIndex',
                description: '商城'
            },{
                path: 'city/:comp_id/:category_id',
                component: ShopCityIndex,
                name: 'ShopCityIndex',
                description: '商城'
            },
        ]
    },{
        path: '/dataMap',
        component: Main,
        description: '数据地图',
        auth: true,
        children: [
            {
                path: '',
                component: MapIndex,
                name: 'MapIndex',
                description: '数据地图'
            }
        ]
    },
    { path: '*', redirect: '/' }
  ]
})
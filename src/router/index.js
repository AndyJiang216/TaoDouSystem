import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:"history",
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/home',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/MovieIndex.vue'),
                    meta: { title: '影视广场' }
                },
                {
                    path: '/market',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Market.vue'),
                    meta: { title: '周边商城' }
                },
                {
                    path: '/commodity/:id',
                    name: 'commodity',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Note.vue'),
                    meta: { title: '商品详情' }
                },
                {
                    path: '/person',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Personal.vue'),
                    meta: { title: '个人中心' }
                },
                {
                    path: '/personalSetting',
                    component: () => import('../components/page/PersonalSetting.vue'),
                    meta: { title: '用户设置'}
                },
                {
                    path:'/commoditySquare',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/CommoditySquare.vue'),
                    meta: { title: '商品列表'}
                },
                {
                    path:'/movie/:id',
                    name:'movie',
                    component:() => import(/* webpackChunkName: "dashboard" */ '../components/page/MovieIntroduction.vue'),
                    meta:{ title:'电影详情' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

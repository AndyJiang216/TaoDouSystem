import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

import store from './store'
import Vuex from 'vuex'
Vue.use(Vuex)

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//Vant UI引入
import Vant from 'vant'
import {Lazyload} from 'vant';
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(Lazyload)

//Vue-Cookie引入
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import {getCookie} from '@/utils/cookies.js'

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Your Exclusive Movie Center`;
    console.log(Vue.$cookies.get('KoaSessionID'))
    if (!Vue.$cookies.get('KoaSessionID') && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        next()
    }
});

new Vue({
    router,
    i18n,
    render: h => h(App),
    store,
}).$mount('#app');

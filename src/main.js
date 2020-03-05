import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import router from './router/index.js'
import store from './store/index.js'
//用fastClick阻止事件300ms的延迟
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
//引入全局样式
import '@/style/commonStyle.less';
//引用vant-Ui组件库
import '@/plugins/vant.js'
//引入rem配置
import  '@/config/rem.js'

//引入过滤器
import  '@/config/formatFilter.js'
//引入moment时间
import '@/config/momentConfig.js'
import animated from 'animate.css'
Vue.use(animated);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');




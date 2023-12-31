import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@/styles/index.less'
import { Toast } from 'vant';
import 'vant/es/toast/style';  // 全局引入toast样式
import 'vant/es/dialog/style'
import { Notify } from 'vant';
import 'vant/es/notify'
import router from './router'
import stores from '@/store/index'
import '@/auth'
import { Lazyload } from 'vant';

createApp(App)
    .use(router)
    .use(stores)
    .use(Toast)
    .use(Notify)
    .use(Lazyload)
    .mount('#app')

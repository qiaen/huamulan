import { createApp } from 'vue'
import store from './store/'
import router from './router/'
import App from './App.vue'
// 样式文件 
import './assets/css/base.less'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// axios请求相关前置，拦截，超时等预处理 
import './configs/axios'
// 全局公用组件 
// import './components/'
import drawer from './components/drawer.vue'
import sline from './components/index'
const app = createApp(App)
app.use(ElementPlus).use(store).use(router).use(drawer).use(sline)
app.mount('#app')

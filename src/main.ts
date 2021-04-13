import { createApp } from 'vue'
import store from './store/'
import router from './router/'
import App from './App.vue'
import ElementPlus from 'element-plus'
// 已经在index.html内引入样式，这里不再引入
// import 'element-plus/lib/theme-chalk/index.css'
// 样式文件，包括重置element样式，flex布局类，空间布局类，颜色等
import './assets/css/base.less'
// axios请求相关前置，拦截，超时等预处理 
import './configs/axios'
// 安装自定义组件
import components from './components/'
// 安装自定义指令
import directives from './directives/'
const app = createApp(App)
app.use(ElementPlus).use(store).use(router).use(components).use(directives)
app.mount('#app')

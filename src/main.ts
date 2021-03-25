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
// 自定义组件
import components from './components/'
// 自定义指令
import directives from './directives/'
const app = createApp(App)
app.use(ElementPlus).use(store).use(router).use(components).use(directives)
app.mount('#app')

import { createApp } from 'vue'
import store from './store/index.ts'
import router from './router/'
import App from './App.vue'
// 样式文件 
import './assets/css/base.less'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
const app = createApp(App)
app.use(ElementPlus).use(store).use(router)
app.mount('#app')

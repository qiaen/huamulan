import { App } from "vue"
import Sline from "./sline.vue"
import Drawer from "./drawer.vue"
/** 自定义组件，已安装：sline, drawer */
export default {
  install: (app: App) => {
    app.component(Sline.name, Sline)
    app.component(Drawer.name, Drawer)
  }
}

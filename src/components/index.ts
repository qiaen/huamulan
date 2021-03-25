import { App } from "vue"
import Sline from "./sline.vue"
import Drawer from "./drawer.vue"
export default {
  install: (app: App): void => {
    app.component(Sline.name, Sline)
    app.component(Drawer.name, Drawer)
  }
}

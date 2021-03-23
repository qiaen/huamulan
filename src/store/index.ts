import { createStore } from "vuex";
import layout from "./modules/layout";
import getters from "./getter";
const store = createStore({
  modules: {
    layout,
  },
  getters
});

export default store;

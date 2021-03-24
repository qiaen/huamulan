import { createStore } from "vuex";
import layout from "./modules/layout";
import api from "./modules/api";
import getters from "./getter";
const store = createStore({
  modules: {
    layout,
    api
  },
  getters
});

export default store;

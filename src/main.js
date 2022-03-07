import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import router from "@/router";
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/element";
// 导入API所有的API接口
import * as API from "@/api";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount("#app");

import Vue from "vue";
import Vuex from "vuex";

import Moment from "./Moment";
import Likes from "./Likes";
import userApi from "../api/user";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations: {
    userInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    async getInfo({commit}) {
      let token = localStorage.getItem("login_token");
      if (token) {
        const result = await userApi.getUserInfo();
        commit("userInfo", result.data);
      }
    },
  },
  modules: {
    Moment,
    Likes,
  },
});

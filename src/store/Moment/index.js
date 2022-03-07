import {
  reqGetMomentList,
  reqDayList,
  reqWeekList,
  reqMonthList,
} from "../../api/index";
import moment from "moment";

const state = {
  momentList: [],
  isadd: true,
};

const mutations = {
  GETMOMENTLIST(state, data) {
    //格式化时间
    data.forEach((item) => {
      var date = new Date(item.createTime);
      var datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");
      item.createTime = datetime;
    });
    state.isadd = data.length == 10 ? true : false;
    state.momentList = data;
  },
  //追加数据
  ADDMOMENTLIST(state, data) {
    //格式化时间
    data.forEach((item) => {
      var date = new Date(item.createTime);
      var datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");
      item.createTime = datetime;
    });
    //如果本次获取到的数据长度小于10,则不需要进行下次请求
    state.isadd = data.length == 10 ? true : false;
    state.momentList.push(...data);
  },
};

const actions = {
  async getMomentList({commit}, offset) {
    let result = await reqGetMomentList(offset, 10);
    if (result.data.code === 200) {
      if (offset == 0) {
        commit("GETMOMENTLIST", result.data.data);
      } else {
        commit("ADDMOMENTLIST", result.data.data);
      }
    }
  },
  async getDayList({commit}, offset) {
    let result = await reqDayList(offset, 10);
    if (result.data.code === 200) {
      if (offset == 0) {
        commit("GETMOMENTLIST", result.data.data);
      } else {
        commit("ADDMOMENTLIST", result.data.data);
      }
    }
  },
  async getWeekList({commit}, offset) {
    let result = await reqWeekList(offset, 10);
    if (result.data.code === 200) {
      if (offset == 0) {
        commit("GETMOMENTLIST", result.data.data);
      } else {
        commit("ADDMOMENTLIST", result.data.data);
      }
    }
  },
  async getMonthList({commit}, offset) {
    let result = await reqMonthList(offset, 10);
    if (result.data.code === 200) {
      if (offset == 0) {
        commit("GETMOMENTLIST", result.data.data);
      } else {
        commit("ADDMOMENTLIST", result.data.data);
      }
    }
  },
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};

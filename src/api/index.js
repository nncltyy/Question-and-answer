import requests from "./request";

export const test = () => {
  return requests({
    url: "",
    method: "GET",
  });
};
//注册请求
export const reqRegister = (data) => {
  console.log(data);
  return requests({url: "/user", method: "post", data});
};
// 登录请求
export const reqLogin = (data) => {
  console.log(data);
  return requests({url: "/login", method: "post", data});
};
// 点赞请求
export const reqMomentLike = (data) => {
  console.log(data);
  return requests({url: `/likes/addLike`, method: "post", data: data});
};
// 评论发表接口
export const reqPushComment = (data) => {
  console.log(data);
  return requests({url: "/comment", method: "post", data: data});
};
// 获取回答列表接口
export const reqAnswerList = (momentId) => {
  // console.log("momentId",momentId);
  return requests({url: `/comment?momentId=${momentId}`, method: "get"});
};
// 获取用户的点赞信息
export const reqUserLikeMoment = (momentId) => {
  return requests({url: `/likes/getisLike/${momentId}`, method: "get"});
};
// 取消点赞
export const reqCancelLike = (data) => {
  return requests({url: "/likes/removeLike", method: "delete", data});
};
// 获取问题列表
export function reqGetMomentList(offset, size) {
  return requests({
    url: `/moment?offset=${offset}&&size=${size}`,
    method: "GET",
  });
}
//获取今日问题
export function reqDayList(offset, size) {
  return requests({
    url: `/moment/day?offset=${offset}&&size=${size}`,
    method: "GET",
  });
}

//获取本周问题
export function reqWeekList(offset, size) {
  return requests({
    url: `/moment/week?offset=${offset}&&size=${size}`,
    method: "GET",
  });
}

//获取本月问题
export function reqMonthList(offset, size) {
  return requests({
    url: `/moment/month?offset=${offset}&&size=${size}`,
    method: "GET",
  });
}

// 问题点赞
export function reqPostlikes(data) {
  return requests({
    url: `/likes/addLike`,
    method: "POST",
    data,
  });
}
// 头部获取用户信息
export function reqHeadUserInfo() {
  return requests({
    url: "/user",
    method: "get",
  });
}

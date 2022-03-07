import request from "./request";

const getUserInfo = () => {
  return request({
    url: "/user/info",
    method: "get",
  });
};

const getQuestions = () => {
  return request({
    url: "/user/questions?offset=0&&size=10",
    method: "get",
  });
};
const uploadAvatar = (data) => {
  return request({
    url: "/upload/avatar",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};

export default {
  getUserInfo,
  getQuestions,
  uploadAvatar,
};

import requests from "./request";
//发布问题
export function pushlishQue(title, content) {
  return requests({
    url: "/moment",
    method: "POST",
    data: {title, content},
  });
}

//给问题添加标签
export function addTags(momentId, labels) {
  return requests({
    url: `moment/${momentId}/labels`,
    method: "POST",
    data: {labels},
  });
}

//上传图片
export function imgAdd(formdata) {
  return requests({
    url: "/upload/picture",
    method: "post",
    data: formdata,
    headers: {"Content-Type": "multipart/form-data"},
  });
}

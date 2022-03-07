import requests from "./request";

//请求问题详情
export function getQuestionDetail(momentId) {
  return requests({
    url: `/moment/${momentId}`,
    method: "GET",
  });
}



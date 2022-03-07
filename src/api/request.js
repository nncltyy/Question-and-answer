import axios from "axios";

axios.defaults.baseURL = "http://39.105.207.193:8000";

let requests = axios.create({
  timeout: 5000,
});

requests.interceptors.request.use((config) => {
  let loginToken = localStorage.getItem("login_token");
  if (loginToken) {
    config.headers.authorization = loginToken;
  }
  return config;
});

requests.interceptors.response.use((response) => {
  return response;
});

export default requests;

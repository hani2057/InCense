import { defaultInstance } from ".";

// const BASE_URL = "https://j8a804.p.ssafy.io/api";
const USERS = "/member";
const TEST = "/test";
const PERFUMES = "/perfume";
const SHARE = "/deal";
const IMG = "/display";
const ALARM = "/alarm";

const api = {
  user: {
    login: (type, params) => defaultInstance.get(`/auth/login/${type}`, params),
    resister: () => USERS + "/resister",
  },
  share: {
    getList: () => defaultInstance.get("/deal"),
  },
};

export default api;

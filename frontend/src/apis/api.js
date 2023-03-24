// const BASE_URL = "https://j8a804.p.ssafy.io/api";
const USERS = "/member";
const TEST = "/test";
const PERFUMES = "/perfume";
const SHARE = "/deal";
const IMG = "/display";
const ALARM = "/alarm";

const api = {
  user: {
    login: (type) => `/auth/login/${type}`,
    resister: () => USERS + "/resister",
  },
};

export default api;

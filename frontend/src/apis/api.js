import { defaultInstance } from ".";

const USERS = "/member";
const TEST = "/test";
const PERFUMES = "/perfume";
const SHARE = "/deal";
const IMG = "/display";
const ALARM = "/alarm";

const api = {
  user: {
    login: (type, params) => defaultInstance.get(`/auth/login/${type}`, params),
    register: (data) => defaultInstance.post(`${USERS}/register`, data),
  },
  share: {
    getList: () => defaultInstance.get("/deal"),
  },
};

export default api;

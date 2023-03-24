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
    resister: (data) => defaultInstance.post(`/${USERS}/resister`, data),
  },
  share: {
    getList: () => defaultInstance.get("/deal"),
  },
};

export default api;

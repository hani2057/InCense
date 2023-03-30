import { defaultInstance, authInstance } from ".";

const USERS = "/member";
const TEST = "/test";
const PERFUMES = "/perfume";
const SHARE = "/deal";
const IMG = "/display";
const ALARM = "/alarm";

const api = {
  user: {
    login: (type, code) =>
      defaultInstance.get(`/auth/login/${type}`, { params: { code: code } }),
    register: (data) => defaultInstance.post(`${USERS}/register`, data),
    checkName: (name) =>
      defaultInstance.get(`${USERS}/nickname/check`, {
        params: { nickname: name },
      }),
    getUserInfo: () => authInstance.get(`${USERS}/info`),
  },
  // share: {
  //   getList: () => defaultInstance.get("/deal"),
  // },
  share: {
    getArticle: (id) => SHARE + `/${id}`,
    register: () => SHARE + "register",
  },
  list: {
    getList: (page) => defaultInstance.get(`${PERFUMES}?page=${page}`),
    getDetail: (detailId) => defaultInstance.get(`${PERFUMES}/${detailId}`),
  },
  image: {
    getImage: (fileName) => defaultInstance.get(`${IMG}?filename=${fileName}`),
  },
};

export default api;

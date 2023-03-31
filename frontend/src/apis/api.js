import { defaultInstance, authInstance } from ".";

const USERS = "/member";
const TEST = "/test";
const PERFUMES = "/perfume";
const SHARE = "/deal";
const PROFILE = "/mypage";
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
  share: {
    getArticle: (articleId) =>
      defaultInstance.get(`${SHARE}`, { params: { articleId: articleId } }),
    getList: (page) =>
      defaultInstance.get(`${SHARE}`, { params: { page: page } }),
    register: (article) =>
      authInstance.post(`${SHARE}`, article, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    update: (articleId, article) =>
      authInstance.put(`${SHARE}/${articleId}`, article),
    delete: (articleId) => authInstance.delete(`${SHARE}/${articleId}`),
  },
  list: {
    getList: (page) => defaultInstance.get(`${PERFUMES}?page=${page}`),
    getDetail: (detailId) => defaultInstance.get(`${PERFUMES}/${detailId}`),
  },
  profile: {
    getPerfumeList: (type) =>
      authInstance.get(`${PROFILE}/perfume`, { params: { type: type } }),
    postPerfumeToCategory: (data) =>
      authInstance.post(`${PROFILE}/perfume`, data),
    putPerfumeToCategory: (data) =>
      authInstance.put(`${PROFILE}/perfume`, data),
    searchPerfume: (query) =>
      defaultInstance.get(`${PERFUMES}`, { params: { search: query } }),
  },
  image: {
    getImage: (fileName) => defaultInstance.get(`${IMG}?filename=${fileName}`),
  },
  review: {
    postReview: (reviewArticle) =>
      authInstance.post(`/mypage/perfume`, reviewArticle),
  },
  alarm: {
    setAlarm: (perfumeId) => authInstance.post(`${ALARM}/${perfumeId}`),
  },
};

export default api;

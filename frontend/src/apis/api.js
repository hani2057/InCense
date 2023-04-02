import axios from "axios";
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
    getInfo: () => authInstance.get(`${USERS}/info`),
  },
  // share: {
  //   getList: () => defaultInstance.get("/deal"),
  // },
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
    getList: (page) => {
      return defaultInstance.get(`${PERFUMES}`, {
        params: {
          page: page,
          brand: [],
          scent: [],
          concentration: [],
        },
        paramsSerializer: {
          indexes: null, // by default: false
        },
      });
    },
    getFilteredList: (page, checklist1, checklist2, checklist3) => {
      return defaultInstance.get(`${PERFUMES}`, {
        params: {
          page: page,
          brand: checklist1,
          scent: checklist2,
          concentration: checklist3,
        },
        paramsSerializer: {
          indexes: null, // by default: false
        },
      });
    },
    getDetail: (detailId) => defaultInstance.get(`${PERFUMES}/${detailId}`),
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
    getAlarmSend: () => authInstance.get(`${ALARM}/send`),
  },
};

export default api;

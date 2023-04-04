import axios from "axios";
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
    getInfo: () => authInstance.get(`${USERS}/info`),
  },
  share: {
    getArticle: (articleId) =>
      defaultInstance.get(`${SHARE}/${articleId}`),
    getList: (page) =>
      defaultInstance.get(`${SHARE}`, { params: { page: page } }),
    getFilteredList: (pageNumber,pageSize,type,checklist1, checklist2, checklist3,checklist4) => {
      return defaultInstance.get(`${SHARE}`, {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          close: checklist1,
          transaction: checklist2,
          brands: checklist3,
          scents: checklist4
        },
        paramsSerializer: {
          indexes: null, // by default: false
        },
      })
    },
    register: (article) =>
      authInstance.post(`${SHARE}`, article, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    update: (articleId, article) =>
      authInstance.put(`${SHARE}/${articleId}`, article),
    delete: (articleId) => authInstance.delete(`${SHARE}/${articleId}`),
  },
  comment: {
    getComment: (articleId) => defaultInstance.get(`${SHARE}/comment/${articleId}`),
    register: (articleId, comment) => authInstance.post(`${SHARE}/comment/${articleId}`, comment),
    update: (commentId, comment) => authInstance.put(`${SHARE}/comment/${commentId}`, comment),
    delete: (commentId) => authInstance.delete((`${SHARE}/comment/${commentId}`)),

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
  profile: {
    getPerfumeList: (type) =>
      authInstance.get(`${PROFILE}/perfume`, { params: { type: type } }),
    postPerfumeToCategory: (data) =>
      authInstance.post(`${PROFILE}/perfume`, data),
    putPerfumeToCategory: (data) =>
      authInstance.put(`${PROFILE}/perfume`, data),
    deletePerfumeFromCategory: (myPerfumeId) =>
      authInstance.delete(`${PROFILE}/perfume`, {
        data: { myPerfumeId: myPerfumeId },
      }),
    searchPerfume: (query) =>
      defaultInstance.get(`${PERFUMES}`, { params: { search: query } }),
    // defaultInstance.post(`${PERFUMES}/in`, { search: query }),
    getUserReviews: () => authInstance.get(`${PROFILE}/review`),
    putUserReview: (data) => authInstance.put(`${PROFILE}/review`, data),
    getUserArticles: () => authInstance.get(`${PROFILE}/deal`),
    getUserBookmarks: () => authInstance.get(`${PROFILE}/bookmark`),
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
    resetAlarm: (perfumeId) => authInstance.delete(`${ALARM}/${perfumeId}`),
    getAlarmSend: () => authInstance.get(`${ALARM}/send`),
    deleteAlarmSend: (sendId) => authInstance.delete(`${ALARM}/send/${sendId}`),
    readAlarmSend: (sendId) => authInstance.put(`${ALARM}/send/${sendId}`)

  },
};

export default api;

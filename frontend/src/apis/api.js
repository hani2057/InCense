import { defaultInstance, authInstance } from ".";

const USERS = "/member";
const PERFUMES = "/perfume";
const SHARE = "/deal";
const PROFILE = "/mypage";
const IMG = "/display";
const ALARM = "/alarm";
const ANALYSIS = "/analysis";

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
    putUserInfo: (data) => authInstance.put(`${USERS}/modify/info`, data),
    putUserProfileImg: (data) =>
      authInstance.put(`${USERS}/modify/profile`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  },
  share: {
    getArticle: (articleId) => defaultInstance.get(`${SHARE}/${articleId}`),
    getList: (page) =>
      defaultInstance.get(`${SHARE}`, { params: { page: page } }),
    getFilteredList: (
      page,
      gubun,
      checklist1,
      checklist2,
      checklist3,
      checklist4
    ) => {
      return defaultInstance.get(`${SHARE}`, {
        params: {
          page: page,
          gubun: gubun,
          close: checklist1,
          transaction: checklist2,
          brands: checklist3,
          scents: checklist4,
        },
        paramsSerializer: {
          indexes: null, // by default: false
        },
      });
    },
    register: (article) =>
      authInstance.post(`${SHARE}`, article, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    update: (articleId, article) =>
      authInstance.put(`${SHARE}/${articleId}`, article, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    delete: (articleId) => authInstance.delete(`${SHARE}/${articleId}`),
    bookmark: (articleId) => authInstance.put(`${SHARE}/bookmark/${articleId}`),
    check: (articleId) => authInstance.get(`${SHARE}/bookmark/${articleId}`),
    close: (articleId) => authInstance.put(`${SHARE}/close/${articleId}`),
  },
  comment: {
    getComment: (articleId) =>
      defaultInstance.get(`${SHARE}/comment/${articleId}`),
    register: (articleId, comment) =>
      authInstance.post(`${SHARE}/comment/${articleId}`, comment),
    update: (commentId, comment) =>
      authInstance.put(`${SHARE}/comment/${commentId}`, comment),
    delete: (commentId, type) =>
      authInstance.delete(`${SHARE}/comment/${commentId}`, { data: type }),
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
    getCategory: (detailId) =>
      authInstance.get(`${PERFUMES}/category/${detailId}`),
    getSimilarList: (detailId) =>
      defaultInstance.get(`${PERFUMES}/similar/list/${detailId}`),
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
  analysis: {
    postTestResult: (data) => authInstance.post(`/test`, data),
    getUpdateTaste: () => authInstance.get(`${ANALYSIS}/update`),
    getWordCloud: () => authInstance.get(`${ANALYSIS}/word-cloud`),
    getNoteGraph: () => authInstance.get(`${ANALYSIS}/note-graph`),
    getWantPerfumePredict: () =>
      authInstance.get(`${ANALYSIS}/want/similarity`),
    getRecommandList: () => authInstance.get(`${ANALYSIS}/all/similarity`),
    getSimilarity: (detailId) =>
      authInstance.get(`${PERFUMES}/similarity/${detailId}`),
  },
  image: {
    getImage: (fileName) => defaultInstance.get(`${IMG}?filename=${fileName}`),
  },
  review: {
    postReview: (reviewArticle) =>
      authInstance.post(`${PROFILE}/perfume`, reviewArticle),
    getReview: (perfumeId, page) =>
      defaultInstance.get(`${PERFUMES}/${perfumeId}/review?page=${page}`),
  },
  alarm: {
    getAlarm: (perfumeId) => authInstance.get(`${ALARM}/${perfumeId}`),
    setAlarm: (perfumeId) => authInstance.post(`${ALARM}/${perfumeId}`),
    resetAlarm: (perfumeId) => authInstance.delete(`${ALARM}/${perfumeId}`),
    getAlarmSend: () => authInstance.get(`${ALARM}/send`),
    deleteAlarmSend: (sendId) => authInstance.delete(`${ALARM}/send/${sendId}`),
    readAlarmSend: (sendId) => authInstance.put(`${ALARM}/send/${sendId}`),
    readAlarmSendAll: () => authInstance.put(`${ALARM}/send`),
    deleteAlarm: (perfumeId) => authInstance.delete(`${ALARM}/${perfumeId}`),
  },
};

export default api;

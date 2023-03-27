import axios from "axios";

const BASE_URL = 'http://localhost:8080/api'
// const BASE_URL = "https://j8a804.p.ssafy.io/api";

const accessToken = "test";

// accessToken이 필요 없는 요청시
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });

  // 성공시 콘솔에 response.data 출력
  // 에러시 콘솔에 에러 출력
  instance.interceptors.response.use(
    (response) => {
      console.log(response.data);

      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );

  return instance;
};

const axiosAuthApi = (url, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: accessToken },
    ...options,
  });

  return instance;

  // instance.interceptors.request.use(
  //   function (config) {
  //     const accessToken = localStorage.getItem("accessToken");
  //     if (accessToken) {
  //       config.headers["Authorization"] = accessToken;
  //     }
  //     return config;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);

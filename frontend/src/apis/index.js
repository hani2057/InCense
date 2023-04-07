import axios from "axios";

// const BASE_URL = "http://localhost:8080/api";
const BASE_URL = "https://j8a804.p.ssafy.io/api";

// accessToken이 필요 없는 요청시
const axiosApi = (url, options) => {
  // console.log("axiosAPI", url);
  const instance = axios.create({ baseURL: url, ...options });

  // 성공시 콘솔에 response.data 출력, 에러시 콘솔에 에러 출력
  instance.interceptors.response.use(
    (response) => {
      // console.log(response.data);

      return response.data;
    },
    (error) => {
      // console.error(error);
      return Promise.reject(error);
    }
  );

  return instance;
};

// accessToken이 필요한 요청시

const axiosAuthApi = (url, options) => {
  const instance = axios.create({
    baseURL: url,
    ...options,
  });

  // request handling
  // 세션스토리지에서 토큰 가져와 헤더에 적용
  instance.interceptors.request.use(
    (request) => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        request.headers["Authorization"] = `Bearer ${accessToken}`;
        request.withCredentials = true;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response handling
  // 성공시 콘솔에 response.data 출력, 에러시 콘솔에 에러 출력
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);

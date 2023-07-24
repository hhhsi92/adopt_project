import axios, { AxiosError, AxiosRequestConfig } from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { STR_ACCESS_TOKEN, STR_REFRESH_TOKEN } from "@/common/property/PropertyAuth";
import { getCookie } from "@/common/cookie";
import QueryString from "qs";
import { toast } from "react-toastify";
import { apiKey } from "@/config";

interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  retryCount: number;
}

const MAX_RETRY_COUNT = 3;
let baseURL = "http://apis.data.go.kr/";

export const Axios = axios;

const api = axios.create({
  baseURL: baseURL,
  paramsSerializer: {
    indexes: null, // by default: false
  },
  withCredentials: true,
  params: {
    serviceKey: apiKey,
    _type: "json",
  }
});

// api.interceptors.request.use(
//   async (config) => {
//     if (config.url.trim() === "/v1/adm/login") {
//       return config;
//     }
    
//     const accessToken = getCookie(STR_ACCESS_TOKEN) || "";
//     if (accessToken !== "") {
//       config.headers!.Authorization = `Bearer ${accessToken}`;
//     }

//     if (config.method === "get") {
//       config.timeout = 60000;
//     }

//     console.log("💚", config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// let isTokenRefreshing = false;
// let refreshSubscribers: Function[] = [];

// interface responseData {
//   data: any;
//   message: string;
//   status: number;
//   timestamp: string;
// }

// api.interceptors.response.use(undefined, async (error: AxiosError) => {
//   const config = error.config as AxiosCustomRequestConfig;
//   const status = error.response?.status;
//   const responseData = error.response?.data as responseData;

//   if (status == null || status === undefined) {
//     toast.error("인터넷 연결 상태를 확인해주세요.");
//     return Promise.reject(error);
//   }

//   if (error.response?.status) {
//     switch (error.response.status) {
//       case 401 | 403:
//         if (isTokenRefreshing) {
//           console.log("⏰ isTokenRefreshing");
//           // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
//           const retryOriginalRequest = new Promise((resolve) => {
//             const runOriginalRequest = (accessToken: string) => {
//               error.config.headers!.Authorization = `Bearer ${accessToken}`;
//               console.log("🏃🏻‍♀️ run callback", error.config);
//               resolve(api(error.config));
//             };
//             refreshSubscribers.push(runOriginalRequest);
//           });

//           return retryOriginalRequest;
//         }

//         // token refresh 요청
//         console.log("✅ set isTokenRefreshing true");
//         isTokenRefreshing = true;

//         let refreshedToken = await checkTokenAndRefresh();
//         console.log("refreshed Token", refreshedToken);

//         if (refreshedToken.accessToken) {
//           refreshSubscribers.forEach((callback) => {
//             callback(refreshedToken.accessToken);
//           });
//         } else {
//           console.log("❌ set isTokenRefreshing false");
//           isTokenRefreshing = false;
//           refreshSubscribers = [];
//         }

//         isTokenRefreshing = false;
//         refreshSubscribers = [];

//         break;
//       case 408:
//         config.retryCount = config.retryCount ?? 0;
//         console.log("RETRY COUNT:", config.retryCount);
//         const shouldRetry = config.retryCount < MAX_RETRY_COUNT;
//         if (shouldRetry) {
//           config.retryCount += 1;
//           return api.request(config);
//         }
//         break;
//       default:
//         console.log("🚨", error.response);
//         if (error.config.headers?.disuseToast === "true") {
//           break;
//         }
//         if (responseData.message) {
//           // toast.error(responseData.message);
//           console.log(responseData.message);
//           break;
//         }
//         toast.error("잠시 후 다시 시도해주세요.");
//         break;
//     }
//   }

//   return Promise.reject(error);
// });

export default api;

// const isAxiosError = (error: any): error is AxiosError => {
//   return error && (error as AxiosError).isAxiosError;
// };

// const checkTokenExpired = (token: string) => {
//   const decodedToken: JwtPayload = jwt_decode(token);
//   try {
//     if (decodedToken.exp) {
//       const expireDate = new Date(decodedToken.exp * 1000);
//       if (expireDate > new Date()) {
//         return false;
//       }
//     }
//     return true;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const checkTokenAndRefresh = async () => {
//   console.log("checkTokenAndRefresh");
//   let _accessToken: string | null = null;
//   let _refreshToken: string | null = null;
//   const accessToken = getCookie(STR_ACCESS_TOKEN) || "";
//   const refreshToken = localStorage.getItem(STR_REFRESH_TOKEN) || "";

//   if (accessToken == null || refreshToken == null) {
//     return {
//       accessToken: null,
//       refreshToken: null,
//     };
//   }

//   if (!checkTokenExpired(accessToken)) {
//     return {
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//     };
//   }

//   try {
//     const frm = new FormData();
//     frm.append("accessToken", accessToken);
//     frm.append("refreshToken", refreshToken);

//     const restoreResult = await axios.post(`${baseURL}/v1/token/refresh`, frm);

//     if (restoreResult) {
//       _accessToken = restoreResult.data.data.accessToken;
//       _refreshToken = restoreResult.data.data.refreshToken;
//     }
//   } catch (err) {
//     console.log("⛔️ refresh error: ", err);
//     _accessToken = null;
//     _refreshToken = null;
//   }

//   return {
//     accessToken: _accessToken,
//     refreshToken: _refreshToken,
//   };
// };

// const tryRefreshToken = async (success: Function, fail: Function) => {
//   const refreshedToken = await checkTokenAndRefresh();
//   if (refreshedToken.accessToken) {
//     success();
//   } else {
//     fail();
//   }
// };

// export { isAxiosError, checkTokenAndRefresh, tryRefreshToken, baseURL };

// export type ErrorResponseData = {
//   data: any;
//   message: string;
//   status: number;
//   timestamp: string;
// };

import Axios from 'axios';
import { useUpdateAuth } from '../jotai/auth';
import Swal from 'sweetalert2';

// 맥북
const BASE_URL = 'http://192.168.79.239:8080';
// 싸피
// const BASE_URL = 'http://70.12.247.95:8080';

const common = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

const auth = Axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

auth.interceptors.request.use(
  function (config) {
    const access = sessionStorage.getItem('accessToken');
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    } else {
      const response = useUpdateAuth();

      if (response) {
        config.headers.Authorization = `Bearer ${access}`;
      } else {
        Swal.fire('이런!', '로그인이 필요합니다', 'info');
      }
    }
    config.withCredentials = false;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// // 응답 인터셉터 추가
// auth.interceptors.response.use(
//   function (response) {
//     // 응답 데이터를 가공
//     // ...
//     return response;
//   },
//   function (error) {
//     // 오류 응답을 처리
//     // ...
//     return Promise.reject(error);
//   });

export { auth, common };
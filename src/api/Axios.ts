import axios from "axios";

export let axiosInstance = null;

export function getInstance() {
  if (axiosInstance != null) {
    return axiosInstance;
  }
  axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  //hook interceptor cài ở đây
  axiosInstance.interceptors.request.use(
    config => {
      const userData = localStorage.getItem("userData");
      const token = userData ? JSON.parse(userData).token : null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  let isRefreshing = false;
  let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void }> = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(promise => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token);
      }
    });
    failedQueue = [];
  };

  axiosInstance.interceptors.response.use(
    response => {
      return response.data;
    },
    async (error) => {
      const originalRequest = error.config;

      // Nếu lỗi là 401 và không phải là yêu cầu làm mới token
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function(resolve, reject) {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            // Giả định có một endpoint để làm mới token
            // TODO: Thay thế bằng endpoint làm mới token thực tế của bạn
            const refreshToken = localStorage.getItem("refreshToken"); // Lấy refresh token từ localStorage
            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`, {
              refreshToken: refreshToken
            });

            const { accessToken, newRefreshToken } = response.data;

            // Cập nhật token trong localStorage
            const userData = JSON.parse(localStorage.getItem("userData") || '{}');
            userData.token = accessToken;
            userData.refreshToken = newRefreshToken; // Cập nhật refresh token mới nếu có
            localStorage.setItem("userData", JSON.stringify(userData));

            // Cập nhật token cho các yêu cầu đang chờ
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
            processQueue(null, accessToken);
            
            // Thử lại yêu cầu ban đầu với token mới
            originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
            resolve(axiosInstance(originalRequest));
          } catch (err) {
            processQueue(err, null);
            // Nếu làm mới token thất bại, đăng xuất người dùng
            localStorage.removeItem("userData");
            window.location.href = "/login";
            reject(err);
          } finally {
            isRefreshing = false;
          }
        });
      }
      // Nếu không phải lỗi 401 hoặc đã thử lại, hoặc lỗi khác, trả về lỗi
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}

function get(endpointApiUrl, payload = {}, config = {}) {
  return getInstance().get(endpointApiUrl, {
    params: payload,
    ...config,
  });
}

function post(endpointApiUrl, payload = {}, config = {}) {
  return getInstance().post(endpointApiUrl, payload, config);
}

function put(endpointApiUrl, payload = {}, config = {}) {
  return getInstance().put(endpointApiUrl, payload, config);
}

function del(endpointApiUrl, payload = {}, config = {}) {
  return getInstance().delete(endpointApiUrl, payload, config);
}

function patch(endpointApiUrl, payload = {}, config = {}) {
  return getInstance().patch(endpointApiUrl, payload, config);
}

export const Axios = {
  axiosInstance,
  get,
  post,
  put,
  del,
  patch,
};

import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_MOVIE_API_BASE_URL ||
  "https://movienew.cybersoft.edu.vn/api";

const TOKEN_CYBERSOFT = import.meta.env.VITE_CYBERSOFT_TOKEN;

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return accessToken;
  }

  const userLocal = localStorage.getItem("user");

  if (!userLocal) {
    return null;
  }

  try {
    const user = JSON.parse(userLocal);
    return user?.accessToken || null;
  } catch {
    return null;
  }
};

const customerClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

customerClient.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    if (TOKEN_CYBERSOFT) {
      config.headers.TokenCybersoft = TOKEN_CYBERSOFT;
    }

    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

customerClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.content ||
      error?.response?.data?.message ||
      error?.message ||
      "Có lỗi xảy ra khi gọi API.";

    return Promise.reject({
      ...error,
      message,
    });
  },
);

// export kiểu default để các file mới dùng
export default customerClient;

// export thêm tên customerApi để tránh lỗi nếu file cũ còn import { customerApi }
export const customerApi = customerClient;
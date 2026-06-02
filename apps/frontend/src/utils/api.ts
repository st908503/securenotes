import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

   const isAuthRoute =
  originalRequest.url?.includes("/auth/login") ||
  originalRequest.url?.includes("/auth/register") ||
  originalRequest.url?.includes("/auth/refresh-token");

if (
  error.response?.status === 401 &&
  !originalRequest._retry &&
  !isAuthRoute
) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );

      const newAccessToken = response.data.data.accessToken;

if (newAccessToken) {
  localStorage.setItem(
    "accessToken",
    newAccessToken
  );
}

      

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");

       localStorage.removeItem("accessToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

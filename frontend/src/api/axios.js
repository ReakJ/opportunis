import axios from "axios";
import auth from "../auth"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async(config) => {
    const user = auth.currentUser;

    if (user) {
      const idToken = await user.getIdToken();

      config.headers.Authorization = `Bearer ${idToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
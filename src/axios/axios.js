import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://ritiassociation.or.ke/v1/api/",
});
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
  config.headers["Content-Type"] = "application/json";
  config.headers["ngrok-skip-browser-warning"] = "69420";
  return config;
});

export default axiosClient;

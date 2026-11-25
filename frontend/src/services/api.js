import axios from "axios";

const api = axios.create({
  baseURL: "/api/accounts/",
});

export default api;
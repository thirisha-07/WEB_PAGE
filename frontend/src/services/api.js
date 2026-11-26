
import axios from "axios";

const api = axios.create({
  baseURL: "https://web-page-backend-35w0.onrender.com/api/accounts/",
});

export default api;

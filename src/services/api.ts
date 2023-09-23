import axios from "axios";

const api = axios.create({
  baseURL: "https://products-api-rxd3.onrender.com",
});

export default api;

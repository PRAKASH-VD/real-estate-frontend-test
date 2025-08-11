import axios from "axios";

const api = axios.create({
  baseURL: "https://real-estate-backend-m26k.onrender.com/api",
});

export default api;

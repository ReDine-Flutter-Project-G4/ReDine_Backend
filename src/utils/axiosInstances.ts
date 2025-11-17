import axios from "axios";
import 'dotenv/config';

const axiosInstance = axios.create({
  baseURL: process.env.AI_SERVER_URL,
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;

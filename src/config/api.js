import axios from "axios";

// Thay đổi IP này thành IP máy tính của bạn
// Không dùng localhost vì điện thoại không hiểu localhost là máy tính của bạn
const BASE_URL = "http://192.168.100.167:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

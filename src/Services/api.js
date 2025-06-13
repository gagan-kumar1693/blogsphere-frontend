import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Add this function below
export const createBlog = (blogData) => {
  return API.post("/blogs", blogData);
};

export const loginUser = (credentials) => {
  return API.post("/users/login", credentials);
};


export default API;

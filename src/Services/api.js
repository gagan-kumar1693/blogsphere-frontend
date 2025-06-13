import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // replace with your backend URL when deployed
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- Auth APIs ---
export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (credentials) => API.post("/users/login", credentials);

// --- Blog APIs ---
export const createBlog = (blogData) => API.post("/blogs", blogData);
export const getAllBlogs = () => API.get("/blogs");
export const getBlogById = (id) => API.get(`/blogs/${id}`);
export const updateBlog = (id, updatedData) => API.put(`/blogs/${id}`, updatedData);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

export default API;

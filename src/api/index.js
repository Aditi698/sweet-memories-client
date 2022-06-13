import axios from "axios";

const API = axios.create({
  baseURL: "https://sweet-memories-node-v1.herokuapp.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const fetchPosts = () => API.get("/posts/getposts");
export const createPost = (newPost) => API.post("/posts/createpost", newPost);
export const updatePost = (id, updatedPost) =>
  API.post(`/posts/updatepost/${id}`, updatedPost);
export const deletepost = (id) => API.delete(`/posts/deletepost/${id}`);
export const likePost = (id) => API.post(`/posts/likepost/${id}`);

import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";
const responseBody = (response: AxiosResponse) => response.data;
const reqests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Posts = {
  list: () => reqests.get("/posts"),
  details: (id: string) => reqests.get(`/posts/${id}`),
  create: (post: {}) => reqests.post("/posts", post),
  update: (id: string, post: {}) => reqests.put(`/posts/${id}`, post),
  delete: (id: string) => reqests.delete(`/posts/${id}`),
};

const agent = {
  Posts,
};

export default agent;

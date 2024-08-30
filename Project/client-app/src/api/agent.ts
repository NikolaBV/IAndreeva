import axios, { AxiosResponse } from "axios";
import { CreatePostModel, EditPostModel, PostModel } from "./models";

axios.defaults.baseURL = "http://localhost:5000/api";
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const reqests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Posts = {
  list: () => reqests.get<PostModel[]>("/posts"),
  details: (id: string) => reqests.get<PostModel>(`/posts/${id}`),
  create: (post: CreatePostModel) => reqests.post<string>("/posts", post),
  edit: (id: string, post: {}) =>
    reqests.put<EditPostModel>(`/posts/${id}`, post),
  delete: (id: string) => reqests.delete<PostModel>(`/posts/${id}`),
};

const agent = {
  Posts,
};

export default agent;

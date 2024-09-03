import axios, { AxiosError, AxiosResponse } from "axios";
import { CreatePostModel, EditPostModel, PostModel } from "./models";
import { message } from "antd";

axios.defaults.baseURL = "http://localhost:5000/api";
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { status } = error.response!;
    switch (status) {
      case 400:
        message.error("Bad request");
        break;
      case 401:
        message.error("Unauthorized");
        break;
      case 404:
        message.error("Not found");
        break;
      case 500:
        message.error("Server error");
        break;
    }
    return Promise.reject(error);
  }
);

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

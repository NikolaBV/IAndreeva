import axios, { AxiosError, AxiosResponse } from "axios";
import {
  CreatePostModel,
  EditPostModel,
  LoginModel,
  PaginatedResult,
  PostModel,
  RegisterModel,
  User,
} from "./models";
import { message } from "antd";
import { getToken } from "../utils/tokenUtils";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
    }
    return response as AxiosResponse<PaginatedResult<unknown>>;
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
  list: (pageNumber: number, pageSize: number) =>
    reqests.get<PaginatedResult<PostModel[]>>(
      `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`
    ),
  details: (id: string) => reqests.get<PostModel>(`/posts/${id}`),
  create: (post: CreatePostModel) => reqests.post<string>("/posts", post),
  edit: (id: string, post: {}) =>
    reqests.put<EditPostModel>(`/posts/${id}`, post),
  delete: (id: string) => reqests.delete<PostModel>(`/posts/${id}`),
};

const Account = {
  current: () => reqests.get<User>("/account"),
  login: (user: LoginModel) => reqests.post<User>("/account/login", user),
  register: (user: RegisterModel) =>
    reqests.post<User>("/account/register", user),
};

const agent = {
  Posts,
  Account,
};

export default agent;

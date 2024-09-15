export interface PostModel {
  id: string;
  title: string;
  description: string;
  htmlContent: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostModel {
  title: string;
  description: string;
  htmlContent: string;
}

export interface DeletePostModel {
  id: string;
}
export interface EditPostModel {
  id: string;
  title: string;
  description: string;
  htmlContent: string;
}
export interface User {
  username: string;
  displayName: string;
  token: string;
  image?: string;
}
export interface LoginModel {
  email: string;
  password: string;
}
export interface RegisterModel {
  email: string;
  password: string;
  displayName: string;
  userName: string;
}

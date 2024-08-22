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

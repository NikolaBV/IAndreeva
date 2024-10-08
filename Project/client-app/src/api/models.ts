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
  updatedAt: Date;
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

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  data: T;
  pagination: Pagination;

  constructor(data: T, pagination: Pagination) {
    this.data = data;
    this.pagination = pagination;
  }
}

export class PagingParams {
  pageNumber;
  pageSize;

  constructor(pageNumber = 1, pageSize = 2) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}

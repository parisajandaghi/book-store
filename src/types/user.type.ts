export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "user" | "ADMIN";
  created_at: string;
  orders_count?: number;
}

export type DBUser = User & {
  password?: string;
};

export interface UsersApiResponse {
  data: User[];
  total: number;
  page: number;
  totalPages: number;
}

export interface UseUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  phone?: string | null;
  role?: "user" | "ADMIN";
}

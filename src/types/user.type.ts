export interface User {
  id: number;
  name: string;
  email: string;
}

export interface DBUser extends User {
  password?: string;
  role?: string;
}

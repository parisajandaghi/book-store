export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  created_at: string;
}

export interface DBUser extends User {
  password: string;
}

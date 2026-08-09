export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
}

export interface DBUser extends User {
  password: string;
}

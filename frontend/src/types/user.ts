export interface User {
  id: number;
  username: string;
  email: string;
  roles: { id: number; name: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  id?: number;
  username: string;
  email: string;
  password?: string;
  confirm?: string;
  roleIds?: number[];
}
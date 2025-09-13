export interface User {
  id: number;
  username: string;
  email: string;
  roles: { id: number; name: string }[];
  createdAt: Date;
  updatedAt: Date;
  readonly roleIds?: number[];
}
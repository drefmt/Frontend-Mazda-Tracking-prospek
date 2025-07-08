export interface User {
  id: string;
  username: string;
  email: string;
  level: "admin" | "sales" | "svp";
  createdAt: string;
}

export interface UserListResponse {
  count: number;
  data: User[];
}

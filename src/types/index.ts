export type UserRole = "user" | "owner";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  provider: "google" | "github" | "local";
  providerId?: string | null;
  role: UserRole;
  setup_complete:boolean,
  createdAt: Date;
  updatedAt: Date;
}

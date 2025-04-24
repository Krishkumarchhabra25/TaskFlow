import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  googleOAuthLogin,
  githubOAuthLogin,
  setupAccount,
} from "@/lib/api/auth";
import { useAuthContext } from "@/components/providers/AuthContext";
import { User } from "@/types";

export const useAuth = () => {
  const { setAuth, clearAuth, token, user } = useAuthContext();

  const login = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      loginUser(data.email, data.password),
    onSuccess: ({ user, token }) => setAuth(user, token),
  });

  const register = useMutation({
    mutationFn: (data: {
      username: string;
      email: string;
      password: string;
    }) => registerUser(data),
    onSuccess: ({ user, token }) => setAuth(user, token),
  });

  const googleLogin = useMutation({
    mutationFn: (code: string) => googleOAuthLogin(code),
    onSuccess: ({ user, token }) => setAuth(user, token),
  });

  const githubLogin = useMutation({
    mutationFn: (code: string) => githubOAuthLogin(code),
    onSuccess: ({ user, token }) => setAuth(user, token),
  });

  const setup = useMutation({
    mutationFn: (data: {
      choice: "personal" | "organization";
      organizationName?: string;
    }) => setupAccount(data, token!),
    onSuccess: ({ organization }, variables) => {
      const updatedUser: User = {
        ...user!,
        role: variables.choice === "organization" ? "owner" : "user",
        setup_complete: variables.choice === "personal", // ← only true if "personal"
      };
      setAuth(updatedUser, token!);
    },
  });
  

  const logout = () => clearAuth();

  return {
    login,
    register,
    googleLogin,
    githubLogin,
    logout,
    setup,
  };
};

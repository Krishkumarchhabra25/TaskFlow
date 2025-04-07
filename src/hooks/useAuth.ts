import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  googleOAuthLogin,
  githubOAuthLogin,
} from "@/lib/api/auth";
import { useAuthStore } from "@/stores/useAuthStores";

export const useAuth = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

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

  const logout = () => clearAuth();

  return {
    login,
    register,
    googleLogin,
    githubLogin,
    logout,
  };
};

"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { googleOAuthLogin } from "@/lib/api/auth";

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const code = searchParams.get("code");

  const googleLogin = useMutation({
    mutationFn: googleOAuthLogin,
  });

  useEffect(() => {
    const handleLogin = async () => {
      if (!code) return;

      try {
        setLoading(true);
        await googleLogin.mutateAsync(code);
        toast.success("Signed in with Google!");
        router.push("/account-setup");
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Google login failed");
      } finally {
        setLoading(false);
      }
    };

    handleLogin();
  }, [code]);

  return <div>{loading ? "Logging you in..." : "Redirecting..."}</div>;
}

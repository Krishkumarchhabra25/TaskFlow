"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { googleOAuthLogin } from "@/lib/api/auth";
import OAuthRedirectUI from "@/components/OAuthRedirectUI";
import { useAuthContext } from "@/components/providers/AuthContext";

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [authStep, setAuthStep] = useState<"authenticating" | "success">("authenticating");

  const code = searchParams.get("code");
  const { setAuth } = useAuthContext();
  const googleLogin = useMutation({
    mutationFn: googleOAuthLogin,
  });

  useEffect(() => {
    const handleLogin = async () => {
      if (!code) return;

      try {
       const res =  await googleLogin.mutateAsync(code);
       setAuth(res.user ,res.token)
        toast.success("Signed in with Google!" , {id:"google-login"});
        setAuthStep("success");
        setTimeout(() => router.push("/account-setup"), 1500);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Google login failed" , {id:"google-login-error"});
        
      }
    };

    handleLogin();
  }, [code]);

  return <OAuthRedirectUI authStep={authStep} />;
}
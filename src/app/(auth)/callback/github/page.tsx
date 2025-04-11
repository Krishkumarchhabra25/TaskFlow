"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { githubOAuthLogin } from "@/lib/api/auth";
import OAuthRedirectUI from "@/components/OAuthRedirectUI";

export default function GithubCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [authStep, setAuthStep] = useState<"authenticating" | "success">("authenticating");
  
    const code = searchParams.get("code");
  
    const githubLogin = useMutation({
      mutationFn: githubOAuthLogin,
    });
  
    useEffect(() => {
      const handleLogin = async () => {
        if (!code) return;
  
        try {
          await githubLogin.mutateAsync(code);
          toast.success("Signed in with GitHub!" , {id:"github-login"});
          setAuthStep("success");
          setTimeout(() => router.push("/account-setup"), 1500);
        } catch (err: any) {
          toast.error(err?.response?.data?.message || "GitHub login failed" , {id:"github-login-error"});
        }
      };
  
      handleLogin();
    }, [code]);
  
    return <OAuthRedirectUI authStep={authStep} />;
  }
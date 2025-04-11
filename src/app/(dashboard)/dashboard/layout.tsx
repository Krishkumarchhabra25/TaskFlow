"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {


  const { user, token , loading } = useAuthContext();
  const router = useRouter();
console.log("tokennn..." , token)
console.log("tokennn..." , user)
  useEffect(() => {
    if (loading) return;
    if (!token) {
      router.push("/sign-in");
    } else if (user && !user.setup_complete) {
      router.push("/account-setup");
    }
  }, [token, user,loading, router]);

  if (loading || !token || !user?.setup_complete) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return <>{children}</>;
}
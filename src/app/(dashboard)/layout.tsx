"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { token } = useAuth();
    const router = useRouter();
  
    useEffect (() => {
      if (!token) {
        router.push("/sign-in");
      }
    }, [token, router]);
  
    if (!token) {
      return null; // or loading spinner
    }
  
    return <>{children}</>;
  }
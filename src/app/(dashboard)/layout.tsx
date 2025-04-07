"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStores";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token); // ✅ from Zustand
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/sign-in");
    }
  }, [token, router]);

  if (!token) {
    return null; // Or <LoadingSpinner /> if you have one
  }

  return <>{children}</>;
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthContext";

export default function AuthPageLayout({ children }: { children: React.ReactNode }) {
  const { user, token, loading } = useAuthContext();
  const router = useRouter();

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (token && user?.setup_complete) {
        router.replace("/dashboard");
      } else {
        setShouldRender(true); // ✅ Now it will show sign-in content
      }
    }
  }, [loading, token, user, router]);

  if (loading || !shouldRender) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return <>{children}</>;
}

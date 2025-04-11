"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthContext";

export default function AuthPageLayout({ children }: { children: React.ReactNode }) {
  const { user, token, loading } = useAuthContext();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (token  && user?.setup_complete) {
      router.replace("/");
    } else {
      setShowContent(true);
    }
  }, [token, user, loading, router]);

  if (loading || !showContent) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return <>{children}</>;
}

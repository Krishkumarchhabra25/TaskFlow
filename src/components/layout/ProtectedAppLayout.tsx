"use client";

import { useAuthContext } from "@/components/providers/AuthContext";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/common/Sidebar";
import { Header } from "@/components/common/Header";

const publicRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

export default function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  console.log("tokennn.."  , token)

  useEffect(() => {
    if (loading) return;

    if (!token ) {
      router.push("/sign-in");
    } else if (token && user && !user.setup_complete ) {
      router.push("/account-setup");
    }
  }, [loading, token, user, router, pathname]);

  if (loading || (!token) || (!user?.setup_complete )) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }



  // Protected layout with Sidebar + Header
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-visible">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

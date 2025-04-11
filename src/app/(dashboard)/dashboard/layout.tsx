"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/components/providers/AuthContext";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/common/Sidebar";
import { Header } from "@/components/common/Header";

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

  return <>
 <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {/* ← changed overflow-hidden → overflow-visible */}
      <div className="flex-1 flex flex-col overflow-visible">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  </>;
}
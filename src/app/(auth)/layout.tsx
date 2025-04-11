import AuthPageLayout from "@/components/layout/AuthPageLayout";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthPageLayout>{children}</AuthPageLayout>;
}

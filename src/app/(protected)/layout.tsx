import ProtectedAppLayout from "@/components/layout/ProtectedAppLayout";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedAppLayout>{children}</ProtectedAppLayout>;
}
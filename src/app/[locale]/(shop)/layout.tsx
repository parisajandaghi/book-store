import AppShellLayout from "@/components/layouts/appshell";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShellLayout>{children}</AppShellLayout>;
}

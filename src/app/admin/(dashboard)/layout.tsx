import React from "react";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export const metadata = {
  title: "Admin Portal | Handvance Technologies",
  description: "Internal back-office administration panel for Handvance Technologies",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication verification
  const admin = await getCurrentAdmin();

  if (!admin || !admin.isActive) {
    redirect("/admin/login/");
  }

  return (
    <AdminLayoutShell
      adminUser={{
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: admin.role,
        avatarUrl: admin.avatarUrl,
      }}
    >
      {children}
    </AdminLayoutShell>
  );
}

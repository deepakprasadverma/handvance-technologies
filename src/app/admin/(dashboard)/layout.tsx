import React from "react";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopNav } from "@/components/admin/AdminTopNav";

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
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-gray-900 font-sans antialiased">
      {/* Sidebar Navigation */}
      <AdminSidebar
        adminUser={{
          id: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          avatarUrl: admin.avatarUrl,
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <AdminTopNav
          adminUser={{
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            role: admin.role,
          }}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

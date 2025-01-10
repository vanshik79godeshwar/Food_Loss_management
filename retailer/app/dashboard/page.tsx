// app/dashboard/page.tsx
"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProductDashboard from "../(components)/dashboard/ProductDashboard";
import Sidebar from "../(components)/Sidebar";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to home page if not authenticated
    }
  }, [status, router]);

  // Show a loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Render dashboard only if user is authenticated
  if (session) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-6 ml-16 md:ml-64">
          <ProductDashboard />
        </div>
      </div>
    );
  }

  return null; // Safety fallback if redirection doesn't happen in time
}


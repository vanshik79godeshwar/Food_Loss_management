// app/dashboard/page.tsx
import ProductDashboard from '../(components)/dashboard/ProductDashboard';
import React from 'react';
import Sidebar from '../(components)/Sidebar';

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 md:ml-64">
        <ProductDashboard />
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import AppSidebar from '@/app/components/AppSidebar';

export default function IntegrationLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="ml-16 lg:ml-64 flex-1">{children}</main>
    </div>
  );
}
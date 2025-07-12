'use client';

import React, { useState } from 'react';
import AppSidebar from '@/app/components/AppSidebar'; // seu componente de sidebar
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={cn(
          'transition-all duration-300 p-6 w-full bg-primary-darker',
          collapsed ? 'ml-16' : 'ml-64' // adapta o conteúdo conforme a sidebar
        )}
      >
        {children}
      </main>
    </div>
  );
}
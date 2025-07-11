import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  GitMerge, 
  Link as LinkIcon, 
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AppSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  collapsed: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, collapsed }: SidebarItemProps) => {
  const location = usePathname();
  const isActive = location === path;

  return (
    <Link
      href={path}
      className={cn(
        "flex items-center px-4 py-3 mb-1 rounded-md transition-colors relative group",
        isActive 
          ? "bg-purple/20 text-white" 
          : "text-gray-400 hover:text-white hover:bg-white/5",
        collapsed && "justify-center px-0"
      )}
    >
      <Icon size={20} className={cn(isActive && "text-purple")} />
      {!collapsed && <span className="ml-4">{label}</span>}
      {collapsed && (
        <div className="absolute left-14 px-3 py-1 bg-darkbg-lighter rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap">
          {label}
        </div>
      )}
      {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-purple rounded-l-md" />}
    </Link>
  );
};

const AppSidebar = ({ collapsed, setCollapsed }: AppSidebarProps) => {
  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 h-full bg-primary-100 border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white">AIFlow</h1>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <span className="text-xl font-bold text-purple">A</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/5"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <div className="flex flex-col flex-1 pt-4 px-2 overflow-y-auto scrollbar-hide">
        <SidebarItem icon={LayoutDashboard} label="Visão Geral" path="/dashboard" collapsed={collapsed} />
        <SidebarItem icon={Users} label="Clientes" path="/clients" collapsed={collapsed} />
        <SidebarItem icon={GitMerge} label="Fluxos" path="/flows" collapsed={collapsed} />
        <SidebarItem icon={LinkIcon} label="Integrações" path="/integrations" collapsed={collapsed} />
        <SidebarItem icon={MessageSquare} label="Mensagens" path="/messages" collapsed={collapsed} />
      </div>
      
      <div className="border-t border-gray-800 p-2 mt-auto">
        <SidebarItem icon={Settings} label="Configurações" path="/settings" collapsed={collapsed} />
      </div>
    </aside>
  );
};

export default AppSidebar;
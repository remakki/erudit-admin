'use client';

import * as React from 'react';
import { IconCalendar, IconHomeBolt, IconListDetails } from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import { User } from '@/types/auth';

const data = {
  navMain: [
    {
      title: 'Домашняя страница',
      url: '/',
      icon: IconHomeBolt,
    },
    {
      title: 'События',
      url: '/events',
      icon: IconCalendar,
    },
    {
      title: 'Запросы',
      url: '/requests',
      icon: IconListDetails,
    },
  ],
};

export function AppSidebar({
  currentUser,
  ...props
}: React.ComponentProps<typeof Sidebar> & { currentUser: User }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="bg-violet-600 p-2 rounded-2xl">
          <img
            src="/logo-full.webp"
            alt="Эрудит пати лого"
            width={200}
            height={200}
            className="pointer-events-none select-none"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {currentUser && (
        <SidebarFooter className="px-4 py-4 border-gray-200">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
            <img
              src="/profile.jpg"
              alt="Profile"
              width={45}
              height={45}
              className="rounded-lg border"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.username}</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <Button
              variant="ghost"
              className="text-gray-500 hover:text-red-500"
              onClick={logoutAction}
            >
              <LogOut className="h-6 w-6" />
            </Button>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import React from 'react';

export function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-base">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {parts.map((part, idx) => {
          const href = '/' + parts.slice(0, idx + 1).join('/');
          const isLast = idx === parts.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize text-base">{part}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="capitalize text-base">
                    {part}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

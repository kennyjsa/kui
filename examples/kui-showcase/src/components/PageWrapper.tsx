"use client";

import { ReactNode } from "react";
import { cn } from "@kui-framework/ui";

interface PageWrapperProps {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function PageWrapper({
  children,
  title,
  description,
  className
}: PageWrapperProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

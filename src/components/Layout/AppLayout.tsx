"use client";

import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  preview?: ReactNode;
}

export default function AppLayout({ children, sidebar, preview }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {sidebar && (
        <aside className="w-80 border-r border-border bg-card flex flex-col">
          {sidebar}
        </aside>
      )}
      
      {/* Main content area */}
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>
      
      {/* Preview panel */}
      {preview && (
        <aside className="w-96 border-l border-border bg-card flex flex-col">
          {preview}
        </aside>
      )}
    </div>
  );
}
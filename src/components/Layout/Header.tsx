"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface HeaderProps {
  onNewChat: () => void;
}

export default function Header({ onNewChat }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-6">
        {/* Logo and branding */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AI</span>
            </div>
            <h1 className="text-xl font-bold">Component Builder</h1>
          </div>
        </div>

        {/* Center actions */}
        <div className="flex items-center space-x-2">
          <Button
            onClick={onNewChat}
            size="sm"
            className="gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2">
          {mounted && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0"
            >
              {theme === "dark" ? (
                <SunIcon className="w-4 h-4" />
              ) : (
                <MoonIcon className="w-4 h-4" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0"
          >
            <SettingsIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
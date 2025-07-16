"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { V0Chat } from "@/features/v0chat/types";
import { 
  ExternalLinkIcon, 
  CodeIcon, 
  SmartphoneIcon, 
  TabletIcon, 
  MonitorIcon,
  DownloadIcon,
  ShareIcon
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PreviewPanelProps {
  chat: V0Chat | null;
}

type ViewportSize = "mobile" | "tablet" | "desktop";

export default function PreviewPanel({ chat }: PreviewPanelProps) {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const [showCode, setShowCode] = useState(false);

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <MonitorIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            Select a chat to preview
          </p>
        </div>
      </div>
    );
  }

  const getViewportClass = () => {
    switch (viewportSize) {
      case "mobile":
        return "max-w-sm";
      case "tablet":
        return "max-w-md";
      case "desktop":
        return "w-full";
      default:
        return "w-full";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Preview Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <ShareIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <DownloadIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Viewport Controls */}
        <div className="flex items-center space-x-1 mb-4">
          <Button
            variant={viewportSize === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewportSize("mobile")}
            className="h-8 w-8 p-0"
          >
            <SmartphoneIcon className="w-4 h-4" />
          </Button>
          <Button
            variant={viewportSize === "tablet" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewportSize("tablet")}
            className="h-8 w-8 p-0"
          >
            <TabletIcon className="w-4 h-4" />
          </Button>
          <Button
            variant={viewportSize === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewportSize("desktop")}
            className="h-8 w-8 p-0"
          >
            <MonitorIcon className="w-4 h-4" />
          </Button>
          <div className="ml-2 h-4 w-px bg-border" />
          <Button
            variant={showCode ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className="h-8 px-3"
          >
            <CodeIcon className="w-4 h-4 mr-1" />
            Code
          </Button>
        </div>

        {/* Links */}
        <div className="flex items-center space-x-4 text-sm">
          <a
            href={chat.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          >
            <ExternalLinkIcon className="w-3 h-3" />
            <span>View in v0</span>
          </a>
          {chat.demo && (
            <a
              href={chat.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-green-600 hover:text-green-800"
            >
              <ExternalLinkIcon className="w-3 h-3" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Preview Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {showCode ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Generated Code</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
                  <code>
                    {`// Generated React Component
import React from 'react';

export default function Component() {
  return (
    <div>
      {/* Component code will appear here */}
    </div>
  );
}`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          ) : (
            <div className="flex justify-center">
              <div className={cn(
                "transition-all duration-300 border rounded-lg bg-background",
                getViewportClass()
              )}>
                {chat.demo ? (
                  <iframe
                    src={chat.demo}
                    className="w-full h-96 border-0 rounded-lg"
                    title="Component Preview"
                  />
                ) : (
                  <div className="h-96 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <MonitorIcon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">No preview available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
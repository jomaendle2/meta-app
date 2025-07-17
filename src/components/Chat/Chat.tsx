"use client";

import AppSidebar from "@/components/Layout/AppSidebar";
import Header from "@/components/Layout/Header";
import PreviewPanel from "@/components/Layout/PreviewPanel";
import { Alert } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useV0Chat } from "@/features/v0chat/useV0Chat";
import { useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import ChatMessages from "./ChatMessages";
import EnhancedChatInput from "./EnhancedChatInput";

export default function Chat() {
  const {
    chat,
    chats,
    loading,
    error,
    sendMessage,
    loadChats,
    selectChat,
    newChat,
  } = useV0Chat();

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  return (
    <SidebarProvider>
      <div className="h-screen flex w-full">
        <AppSidebar
          chats={chats}
          currentChat={chat}
          onSelectChat={selectChat}
          onNewChat={newChat}
          loading={loading}
        />
        <SidebarInset className="flex flex-col h-full">
          <Header onNewChat={newChat} />
          <div className="flex-1 flex overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              {/* Main chat area */}
              <ResizablePanel defaultSize={60} minSize={30}>
                <main className="flex flex-col h-full flex-1">
                  {/* Chat messages */}
                  <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div className="p-6">
                        {chat ? (
                          <ChatMessages chat={chat} isLoading={loading} />
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <div className="text-center max-w-md">
                              <div className="mb-8">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                  <span className="text-2xl">🎨</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-2">
                                  Create React Components
                                </h2>
                                <p className="text-muted-foreground">
                                  Describe the component you want to build, and
                                  I&apos;ll create it for you using modern React
                                  patterns and Tailwind CSS.
                                </p>
                              </div>
                              <div className="text-left space-y-2">
                                <div className="bg-muted/50 rounded-lg p-3">
                                  <p className="text-sm font-medium">
                                    💡 Try asking:
                                  </p>
                                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                                    <li>
                                      • &quot;Create a pricing card
                                      component&quot;
                                    </li>
                                    <li>
                                      • &quot;Build a modern login form&quot;
                                    </li>
                                    <li>
                                      • &quot;Design a dashboard sidebar&quot;
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Error display */}
                  {error && (
                    <div className="p-4 border-t">
                      <Alert variant="destructive">{error}</Alert>
                    </div>
                  )}

                  {/* Chat input */}
                  <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="p-4">
                      <EnhancedChatInput
                        onSend={sendMessage}
                        loading={loading}
                      />
                    </div>
                  </div>
                </main>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Preview panel */}
              <ResizablePanel defaultSize={40} minSize={20}>
                <aside className="size-full border-l border-border bg-card flex flex-col">
                  <PreviewPanel chat={chat} />
                </aside>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

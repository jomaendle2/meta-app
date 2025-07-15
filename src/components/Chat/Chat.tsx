"use client";
import { useV0Chat } from "@/features/v0chat/useV0Chat";
import { useEffect } from "react";

import { Alert } from "../ui/alert";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatPreview from "./ChatPreview";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex max-w-4xl mx-auto mt-10 gap-6">
      {/* Sidebar for previous chats */}
      <aside className="w-64 border-r pr-4 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg">Previous Chats</h3>
          <button
            className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded"
            onClick={newChat}
            title="Start a new chat"
          >
            + New
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 && (
            <div className="text-muted-foreground text-sm">
              No previous chats
            </div>
          )}
          <ul>
            {chats.map((c) => (
              <li key={c.id}>
                <button
                  className={`w-full text-left px-2 py-1 rounded hover:bg-muted ${
                    chat && chat.id === c.id ? "bg-muted font-bold" : ""
                  }`}
                  onClick={() => selectChat(c.id)}
                  disabled={loading}
                >
                  {c.title || c.id}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Main chat area */}
      <Card className="flex-1">
        <CardHeader>
          <h2 className="text-xl font-bold">
            v0 Chat: Create React Components
          </h2>
        </CardHeader>
        <CardContent>
          {chat ? (
            <ChatMessages chat={chat} isLoading={loading} />
          ) : (
            <Skeleton className="h-96 w-full" />
          )}
          {error && <Alert variant="destructive">{error}</Alert>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <ChatInput onSend={sendMessage} loading={loading} />
          <ChatPreview chat={chat} />
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import { V0Chat, V0ChatMessage } from "@/features/v0chat/types";
import { Avatar } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import AIResponse from "../ui/kibo-ui/ai/response";

export default function ChatMessages({
  chat,
  isLoading,
}: {
  chat: V0Chat | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    // Show a loading skeleton
    return (
      <ScrollArea className="h-96 pr-2">
        <div className="flex items-start gap-2 mb-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="bg-muted rounded-lg px-3 py-2 w-2/3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </div>
        </div>
      </ScrollArea>
    );
  }

  if (!chat) return null;

  // Use chat.messages if present, otherwise show nothing
  const messages: V0ChatMessage[] = Array.isArray(chat.messages)
    ? chat.messages
    : [];

  return (
    <ScrollArea className="h-96 pr-2">
      {messages.map((msg) => (
        <div key={msg.id} className="flex items-start gap-2 mb-4">
          <Avatar />
          <div className="bg-muted rounded-lg px-3 py-2">
            <AIResponse>{msg.content}</AIResponse>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}

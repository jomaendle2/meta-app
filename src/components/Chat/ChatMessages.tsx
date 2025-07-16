"use client";

import { V0Chat, V0ChatMessage } from "@/features/v0chat/types";
import { Skeleton } from "../ui/skeleton";
import StreamingMessage from "./StreamingMessage";
import { useEffect, useRef } from "react";

export default function ChatMessages({
  chat,
  isLoading,
}: {
  chat: V0Chat | null;
  isLoading: boolean;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  if (isLoading && !chat) {
    // Show a loading skeleton only when initially loading
    return (
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
          <div className="flex-1 max-w-3xl">
            <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!chat) return null;

  // Use chat.messages if present, otherwise show nothing
  const messages: V0ChatMessage[] = Array.isArray(chat.messages)
    ? chat.messages.filter(msg => msg && typeof msg.content === 'string')
    : [];

  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <StreamingMessage
          key={msg.id}
          content={msg.content || ""}
          isUser={msg.type === "user"}
          isStreaming={index === messages.length - 1 && isLoading}
          onCopy={() => {
            // Handle copy action
          }}
          onRegenerate={() => {
            // Handle regenerate action
          }}
          onFeedback={(type) => {
            // Handle feedback action
            console.log(`Feedback: ${type}`);
          }}
        />
      ))}
      
      {/* Loading indicator for new messages */}
      {isLoading && messages.length > 0 && (
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm">AI</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}

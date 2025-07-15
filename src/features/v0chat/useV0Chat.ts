"use client";
import { useState } from "react";
import { V0Chat, V0ChatResponse } from "./types";

export function useV0Chat() {
  const [chat, setChat] = useState<V0Chat | null>(null);
  const [chats, setChats] = useState<V0Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all previous chats (from API)
  const loadChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v0chats");
      if (res.ok) {
        const data = await res.json();
        setChats(data.chats);
      } else {
        const data = await res.json();
        setError(data.error || "Error");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setLoading(false);
  };

  // Select a chat by id (from API)
  const selectChat = async (chatId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/v0chats?id=${encodeURIComponent(chatId)}`);
      if (res.ok) {
        const data = await res.json();
        setChat(data.chat);
      } else {
        const data = await res.json();
        setError(data.error || "Error");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setLoading(false);
  };

  // Start a new chat (clear current chat)
  const newChat = () => {
    setChat(null);
  };

  const sendMessage = async (message: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v0chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        const data: V0ChatResponse = await res.json();
        setChat(data.chat);
        // Optionally reload chats list
        loadChats();
      } else {
        const data: { error: string } = await res.json();
        setError(data.error || "Error");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setLoading(false);
  };

  return {
    chat,
    chats,
    loading,
    error,
    sendMessage,
    loadChats,
    selectChat,
    newChat,
  };
}

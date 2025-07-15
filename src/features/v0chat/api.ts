import { v0 } from "v0-sdk";
import { V0Chat } from "./types";

// Type for possible message objects in v0 response
interface V0SdkMessage {
  id: string;
  object: string;
  content: string;
  createdAt: string;
  type: string;
}

function hasMessages(obj: unknown): obj is { messages: V0SdkMessage[] } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "messages" in obj &&
    Array.isArray((obj as { messages?: unknown }).messages)
  );
}

export async function createV0Chat(
  message: string,
  system?: string
): Promise<V0Chat> {
  const res = await v0.chats.create({
    message,
    system: system || "You are an expert React developer",
  });

  const chat: V0Chat = {
    id: res.id,
    object: res.object,
    url: res.url,
    demo: res.demo,
    shareable: true,
    privacy: undefined,
    title: undefined,
    updatedAt: undefined,
    favorite: false,
    authorId: "",
    latestVersion: undefined,
    messages: [],
  };

  if (hasMessages(res) && res.messages.length > 0) {
    chat.messages = res.messages.map((m) => ({
      id: m.id,
      object: "message", // force to 'message' for type safety
      content: m.content,
      createdAt: m.createdAt,
      type: m.type,
    }));
  } else if (res.text) {
    chat.messages = [
      {
        id: res.id + "-text",
        object: "message",
        content: res.text,
        createdAt: new Date().toISOString(),
        type: "assistant",
      },
    ];
  }

  return chat;
}

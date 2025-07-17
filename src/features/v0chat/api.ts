import { v0 } from "v0-sdk";

export async function createV0Chat(message: string, system?: string) {
  return await v0.chats.create({
    message,
    system: system || "You are an expert React developer",
  });
}

import type { NextApiRequest, NextApiResponse } from "next";
import { v0 } from "v0-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      if (id && typeof id === "string") {
        // Return a single chat by id
        const chat = await v0.chats.getById({ chatId: id });
        return res.status(200).json({ chat });
      } else {
        // Return all chats (full details)
        const chats = await v0.chats.find();

        return res.status(200).json({ chats: chats.data });
      }
    } catch (error: any) {
      console.error("/api/v0chats error:", error);
      return res.status(500).json({ error: error.message || "Unknown error" });
    }
  }
  return res.status(405).end();
}

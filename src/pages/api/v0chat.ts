import { createV0Chat } from "@/features/v0chat/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { message, system } = req.body;
  try {
    const chat = await createV0Chat(message, system);
    res.status(200).json({ chat });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Unknown error" });
  }
}

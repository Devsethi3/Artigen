// pages/api/ai-results.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { AiResult } from "@/lib/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const results = await db
        .select()
        .from(AiResult)
        .orderBy(AiResult.createdAt);
      res.status(200).json(results);
    } catch (error) {
      console.error("Database query error:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
